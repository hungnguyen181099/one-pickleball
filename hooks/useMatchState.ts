import { useCallback, useMemo, useRef, useState } from 'react';

import { endMatchAPI, syncEventsToServer } from '@/features/referee/api/referee.api';
import {
  MATCH_DATA,
  MAX_EVENT_LOG_LENGTH,
  MAX_HISTORY_LENGTH,
  SYNC_THRESHOLD,
  TIMEOUTS_PER_GAME,
  TIMEOUT_DURATION,
  TOAST_DURATION,
  WIN_SCORE,
} from '@/features/referee/constants';

import {
  EventLogItem,
  GameMode,
  GameScore,
  HistoryItem,
  MatchData,
  MatchEvent,
  MatchStatus,
  Player,
  Serving,
  TeamSide,
  Teams,
  TimeoutState,
  ToastState,
} from '../types';

interface UseMatchStateReturn {
  // State
  gameMode: GameMode;
  status: MatchStatus;
  currentGame: number;
  totalGames: number;
  teams: Teams;
  serving: Serving;
  history: HistoryItem[];
  eventLog: EventLogItem[];
  gameScores: GameScore[];
  timeout: TimeoutState;
  toast: ToastState;
  isMatchCompleted: boolean;
  hasSwitchedSidesInDecidingGame: boolean;
  matchData: MatchData;

  // Computed
  scoreCall: string;
  servingCourtSide: 'left' | 'right';
  matchWinnerName: string;
  isDecidingGame: boolean;
  statusText: string;

  // Methods
  setStatus: (status: MatchStatus) => void;
  rallyWon: (winningTeam: TeamSide) => void;
  adjustScore: (team: TeamSide, delta: number) => void;
  undo: () => void;
  recordFault: () => void;
  manualSwitchServer: () => void;
  switchSides: () => void;
  startMatch: (serverIndex: number) => void;
  pauseMatch: () => void;
  endGame: () => void;
  startTimeout: (team: TeamSide) => void;
  endTimeout: () => void;
  addEvent: (message: string) => void;
  clearEventLog: () => void;
  showToast: (icon: string, message: string) => void;
  hideToast: () => void;
  setSelectedServerIndex: (index: number) => void;
  performSideSwitch: () => void;
  resetScores: () => void;
}

function buildPlayersArray(athlete: { name: string; partnerName?: string }, isDoubles: boolean): Player[] {
  if (isDoubles && athlete.partnerName) {
    return [
      { name: athlete.name || 'TBD', courtSide: 'right' },
      { name: athlete.partnerName, courtSide: 'left' },
    ];
  }
  return [{ name: athlete.name || 'TBD', courtSide: 'right' }];
}

export function useMatchState(timer: number, startTimer: () => void, stopTimer: () => void): UseMatchStateReturn {
  // Initial state from MATCH_DATA
  const [gameMode] = useState<GameMode>(MATCH_DATA.gameMode);
  const [status, setStatus] = useState<MatchStatus>(
    MATCH_DATA.isCompleted ? 'finished' : MATCH_DATA.status === 'in_progress' ? 'paused' : 'waiting'
  );
  const [currentGame, setCurrentGame] = useState(MATCH_DATA.currentGame || 1);
  const [totalGames] = useState(MATCH_DATA.bestOf || 3);

  const [teams, setTeams] = useState<Teams>({
    left: {
      name: MATCH_DATA.athlete1.pairName || MATCH_DATA.athlete1.name || 'TBD',
      athleteId: MATCH_DATA.athlete1.id,
      score: 0,
      gamesWon: MATCH_DATA.gamesWonAthlete1 || 0,
      players: buildPlayersArray(MATCH_DATA.athlete1, MATCH_DATA.gameMode === 'doubles'),
    },
    right: {
      name: MATCH_DATA.athlete2.pairName || MATCH_DATA.athlete2.name || 'TBD',
      athleteId: MATCH_DATA.athlete2.id,
      score: 0,
      gamesWon: MATCH_DATA.gamesWonAthlete2 || 0,
      players: buildPlayersArray(MATCH_DATA.athlete2, MATCH_DATA.gameMode === 'doubles'),
    },
  });

  const [serving, setServing] = useState<Serving>({
    team: MATCH_DATA.servingTeam === 'athlete2' ? 'right' : 'left',
    serverIndex: 0,
    serverNumber: MATCH_DATA.serverNumber || 2,
    isFirstServeOfGame: true,
  });

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [eventLog, setEventLog] = useState<EventLogItem[]>([]);
  const [gameScores, setGameScores] = useState<GameScore[]>(MATCH_DATA.gameScores || []);
  const [hasSwitchedSidesInDecidingGame, setHasSwitchedSidesInDecidingGame] = useState(false);

  const pendingEventsRef = useRef<MatchEvent[]>([]);

  const [timeout, setTimeout] = useState<TimeoutState>({
    active: false,
    team: null,
    remaining: TIMEOUT_DURATION,
    leftRemaining: TIMEOUTS_PER_GAME,
    rightRemaining: TIMEOUTS_PER_GAME,
  });

  const [toast, setToast] = useState<ToastState>({
    show: false,
    icon: '',
    message: '',
  });
  const toastTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Computed values
  const isMatchCompleted = useMemo(() => MATCH_DATA.isCompleted || status === 'finished', [status]);

  const matchWinnerName = useMemo(() => {
    if (!MATCH_DATA.isCompleted) return '';
    const firstGameWinner = MATCH_DATA.setScores?.[0];
    if (!firstGameWinner) return '';
    const winnerId =
      firstGameWinner.athlete1 > firstGameWinner.athlete2 ? MATCH_DATA.athlete1.id : MATCH_DATA.athlete2.id;
    return winnerId === MATCH_DATA.athlete1.id
      ? MATCH_DATA.athlete1.pairName || MATCH_DATA.athlete1.name
      : MATCH_DATA.athlete2.pairName || MATCH_DATA.athlete2.name;
  }, []);

  const scoreCall = useMemo(() => {
    const serverScore = teams[serving.team].score;
    const receiverTeam = serving.team === 'left' ? 'right' : 'left';
    const receiverScore = teams[receiverTeam].score;

    if (gameMode === 'singles') {
      return `${serverScore} - ${receiverScore}`;
    }
    return `${serverScore} - ${receiverScore} - ${serving.serverNumber}`;
  }, [teams, serving, gameMode]);

  const servingCourtSide = useMemo(() => {
    const score = teams[serving.team].score;
    return score % 2 === 0 ? 'right' : 'left';
  }, [teams, serving.team]);

  const isDecidingGame = useMemo(() => {
    const winsNeeded = Math.ceil(totalGames / 2);
    return (
      currentGame === totalGames &&
      teams.left.gamesWon === teams.right.gamesWon &&
      teams.left.gamesWon === winsNeeded - 1
    );
  }, [currentGame, totalGames, teams.left.gamesWon, teams.right.gamesWon]);

  const statusText = useMemo(() => {
    const statusMap: Record<MatchStatus, string> = {
      waiting: 'Chờ bắt đầu',
      playing: 'Đang thi đấu',
      paused: 'Tạm dừng',
      finished: 'Kết thúc',
    };
    return statusMap[status];
  }, [status]);

  // Helper functions
  const showToast = useCallback((icon: string, message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, icon, message });
    toastTimeoutRef.current = globalThis.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, TOAST_DURATION);
  }, []);

  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const addEvent = useCallback(
    (message: string) => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      setEventLog((prev) => {
        const newEvent: EventLogItem = {
          time: timeStr,
          message,
          score: `${teams.left.score} - ${teams.right.score}`,
        };
        const updated = [newEvent, ...prev];
        if (updated.length > MAX_EVENT_LOG_LENGTH) {
          updated.pop();
        }
        return updated;
      });
    },
    [timer, teams.left.score, teams.right.score]
  );

  const clearEventLog = useCallback(() => {
    setEventLog([]);
    showToast('', 'Da xoa lich su');
  }, [showToast]);

  const recordEvent = useCallback(
    (type: string, team: TeamSide | null, data: Record<string, unknown> = {}) => {
      const event: MatchEvent = {
        type,
        team,
        data: {
          ...data,
          leftScore: teams.left.score,
          rightScore: teams.right.score,
          gameNumber: currentGame,
        },
        timer_seconds: timer,
        created_at: new Date().toISOString(),
      };
      pendingEventsRef.current.push(event);

      if (pendingEventsRef.current.length >= SYNC_THRESHOLD) {
        const eventsToSync = [...pendingEventsRef.current];
        pendingEventsRef.current = [];
        syncEventsToServer(eventsToSync, {
          currentGame,
          gamesWonAthlete1: teams.left.gamesWon,
          gamesWonAthlete2: teams.right.gamesWon,
          gameScores,
          servingTeam: serving.team === 'left' ? 'athlete1' : 'athlete2',
          serverNumber: serving.serverNumber,
          timerSeconds: timer,
        });
      }
    },
    [teams, currentGame, timer, gameScores, serving]
  );

  const saveHistory = useCallback(() => {
    setHistory((prev) => {
      const newItem: HistoryItem = {
        leftScore: teams.left.score,
        rightScore: teams.right.score,
        servingTeam: serving.team,
        serverIndex: serving.serverIndex,
        serverNumber: serving.serverNumber,
        isFirstServeOfGame: serving.isFirstServeOfGame,
        leftPlayers: JSON.parse(JSON.stringify(teams.left.players)),
        rightPlayers: JSON.parse(JSON.stringify(teams.right.players)),
      };
      const updated = [...prev, newItem];
      if (updated.length > MAX_HISTORY_LENGTH) {
        updated.shift();
      }
      return updated;
    });
  }, [teams, serving]);

  const getPlayerIndexOnSide = useCallback(
    (team: TeamSide, side: 'left' | 'right') => {
      const players = teams[team].players;
      return players[0]?.courtSide === side ? 0 : 1;
    },
    [teams]
  );

  const swapPlayerPositions = useCallback((team: TeamSide) => {
    setTeams((prev) => {
      const newTeams = { ...prev };
      const players = [...newTeams[team].players];
      if (players.length < 2) return prev;
      const temp = players[0].courtSide;
      players[0] = { ...players[0], courtSide: players[1].courtSide };
      players[1] = { ...players[1], courtSide: temp };
      newTeams[team] = { ...newTeams[team], players };
      return newTeams;
    });
  }, []);

  const performSideSwitch = useCallback(() => {
    setTeams((prev) => ({
      left: {
        name: prev.right.name,
        athleteId: prev.right.athleteId,
        score: prev.right.score,
        gamesWon: prev.right.gamesWon,
        players: JSON.parse(JSON.stringify(prev.right.players)),
      },
      right: {
        name: prev.left.name,
        athleteId: prev.left.athleteId,
        score: prev.left.score,
        gamesWon: prev.left.gamesWon,
        players: JSON.parse(JSON.stringify(prev.left.players)),
      },
    }));
    setServing((prev) => ({
      ...prev,
      team: prev.team === 'left' ? 'right' : 'left',
    }));
  }, []);

  const handleSideOut = useCallback(() => {
    if (gameMode === 'singles') {
      setServing((prev) => {
        const newTeam = prev.team === 'left' ? 'right' : 'left';
        return { ...prev, team: newTeam };
      });
      recordEvent('side_out', serving.team === 'left' ? 'right' : 'left');
      addEvent('[SWITCH] Side-out!');
      showToast('[SWITCH]', 'Side-out - Doi quyen giao');
    } else {
      if (serving.isFirstServeOfGame) {
        const newTeam = serving.team === 'left' ? 'right' : 'left';
        const serverIndex = getPlayerIndexOnSide(newTeam, 'right');
        setServing({
          team: newTeam,
          serverNumber: 1,
          serverIndex,
          isFirstServeOfGame: false,
        });
        recordEvent('side_out', newTeam);
        addEvent('[SWITCH] Side-out!');
        showToast('[SWITCH]', 'Side-out - Doi quyen giao');
      } else if (serving.serverNumber === 1) {
        setServing((prev) => ({
          ...prev,
          serverNumber: 2,
          serverIndex: prev.serverIndex === 0 ? 1 : 0,
        }));
        recordEvent('server_change', serving.team, { serverNumber: 2 });
        addEvent('[2] Chuyen sang Server 2');
        showToast('[2]', 'Chuyen Server 2');
      } else {
        const newTeam = serving.team === 'left' ? 'right' : 'left';
        const score = teams[newTeam].score;
        const side = score % 2 === 0 ? 'right' : 'left';
        const serverIndex = getPlayerIndexOnSide(newTeam, side);
        setServing({
          team: newTeam,
          serverNumber: 1,
          serverIndex,
          isFirstServeOfGame: false,
        });
        recordEvent('side_out', newTeam);
        addEvent('[SWITCH] Side-out!');
        showToast('[SWITCH]', 'Side-out - Doi quyen giao');
      }
    }
  }, [gameMode, serving, teams, getPlayerIndexOnSide, recordEvent, addEvent, showToast]);

  const checkGameWin = useCallback(() => {
    const leftScore = teams.left.score;
    const rightScore = teams.right.score;

    if ((leftScore >= WIN_SCORE || rightScore >= WIN_SCORE) && Math.abs(leftScore - rightScore) >= 2) {
      return true;
    }
    return false;
  }, [teams.left.score, teams.right.score]);

  const checkDecidingGameSwitch = useCallback(() => {
    if (!isDecidingGame) return;
    if (hasSwitchedSidesInDecidingGame) return;

    if (teams.left.score === 6 || teams.right.score === 6) {
      setHasSwitchedSidesInDecidingGame(true);
      performSideSwitch();
      addEvent('[SWITCH] Doi san o game quyet dinh (6 diem)');
      showToast('[SWITCH]', 'Doi san - Game quyet dinh!');
    }
  }, [
    isDecidingGame,
    hasSwitchedSidesInDecidingGame,
    teams.left.score,
    teams.right.score,
    performSideSwitch,
    addEvent,
    showToast,
  ]);

  // Main actions
  const rallyWon = useCallback(
    (winningTeam: TeamSide) => {
      if (status !== 'playing') {
        showToast('[!]', 'Vui long bat dau tran dau!');
        return;
      }

      saveHistory();

      if (winningTeam === serving.team) {
        setTeams((prev) => ({
          ...prev,
          [winningTeam]: {
            ...prev[winningTeam],
            score: prev[winningTeam].score + 1,
          },
        }));

        if (gameMode === 'doubles') {
          swapPlayerPositions(winningTeam);
        }

        recordEvent('rally_won', winningTeam, { scored: true });
        addEvent(`[+] +1 diem cho ${teams[winningTeam].name}`);

        // Check after state update
        globalThis.setTimeout(() => {
          checkDecidingGameSwitch();
          if (checkGameWin()) {
            // Game win will be handled by endGame
          }
        }, 0);
      } else {
        recordEvent('rally_lost', serving.team);
        handleSideOut();
      }
    },
    [
      status,
      serving,
      gameMode,
      teams,
      saveHistory,
      swapPlayerPositions,
      recordEvent,
      addEvent,
      showToast,
      handleSideOut,
      checkDecidingGameSwitch,
      checkGameWin,
    ]
  );

  const adjustScore = useCallback(
    (team: TeamSide, delta: number) => {
      if (delta < 0 && teams[team].score <= 0) return;
      saveHistory();
      setTeams((prev) => ({
        ...prev,
        [team]: {
          ...prev[team],
          score: prev[team].score + delta,
        },
      }));
      recordEvent('score', team, { delta });
      addEvent(`[EDIT] ${delta > 0 ? '+' : ''}${delta} diem cho ${teams[team].name} (dieu chinh)`);
    },
    [teams, saveHistory, recordEvent, addEvent]
  );

  const undo = useCallback(() => {
    if (history.length === 0) {
      showToast('[X]', 'Khong co thao tac de hoan tac');
      return;
    }

    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));

    setTeams((t) => ({
      left: { ...t.left, score: prev.leftScore, players: prev.leftPlayers },
      right: { ...t.right, score: prev.rightScore, players: prev.rightPlayers },
    }));
    setServing({
      team: prev.servingTeam,
      serverIndex: prev.serverIndex,
      serverNumber: prev.serverNumber,
      isFirstServeOfGame: prev.isFirstServeOfGame,
    });

    recordEvent('undo', null);
    addEvent('[UNDO] Hoan tac thao tac truoc');
    showToast('[UNDO]', 'Da hoan tac');
  }, [history, recordEvent, addEvent, showToast]);

  const recordFault = useCallback(() => {
    if (status !== 'playing') return;
    saveHistory();
    recordEvent('fault', serving.team);
    handleSideOut();
    addEvent('[X] Loi giao bong');
  }, [status, serving.team, saveHistory, recordEvent, handleSideOut, addEvent]);

  const manualSwitchServer = useCallback(() => {
    if (status !== 'playing' || gameMode === 'singles') return;
    saveHistory();
    setServing((prev) => ({
      ...prev,
      serverNumber: prev.serverNumber === 1 ? 2 : 1,
      serverIndex: prev.serverIndex === 0 ? 1 : 0,
    }));
    recordEvent('server_change', serving.team, {
      serverNumber: serving.serverNumber === 1 ? 2 : 1,
    });
    addEvent(`[SWITCH] Doi sang Server ${serving.serverNumber === 1 ? 2 : 1}`);
    showToast('[SWITCH]', `Da doi sang Server ${serving.serverNumber === 1 ? 2 : 1}`);
  }, [status, gameMode, serving, saveHistory, recordEvent, addEvent, showToast]);

  const switchSides = useCallback(() => {
    saveHistory();
    performSideSwitch();
    addEvent('[SWITCH] Doi vi tri san');
    showToast('[SWITCH]', 'Da doi san cho 2 doi');
  }, [saveHistory, performSideSwitch, addEvent, showToast]);

  const startMatch = useCallback(
    (serverIndex: number) => {
      setStatus('playing');

      if (gameMode === 'doubles') {
        setServing((prev) => ({
          ...prev,
          serverNumber: 2,
          isFirstServeOfGame: true,
          serverIndex,
        }));
      } else {
        setServing((prev) => ({
          ...prev,
          serverIndex: 0,
        }));
      }

      startTimer();
      recordEvent('match_start', serving.team);
      addEvent('[BALL] Tran dau bat dau!');
      showToast('[BALL]', 'Tran dau da bat dau!');
    },
    [gameMode, serving.team, startTimer, recordEvent, addEvent, showToast]
  );

  const pauseMatch = useCallback(() => {
    if (status === 'waiting') return;

    if (status === 'paused') {
      setStatus('playing');
      startTimer();
      addEvent('[PLAY] Tiep tuc');
      showToast('[PLAY]', 'Tiep tuc tran dau');
    } else {
      setStatus('paused');
      stopTimer();
      addEvent('[PAUSE] Tam dung');
      showToast('[PAUSE]', 'Tran dau tam dung');
    }
  }, [status, startTimer, stopTimer, addEvent, showToast]);

  const resetScores = useCallback(() => {
    setTeams((prev) => ({
      left: {
        ...prev.left,
        score: 0,
        players: prev.left.players.map((p, i) => ({
          ...p,
          courtSide: i === 0 ? 'right' : 'left',
        })),
      },
      right: {
        ...prev.right,
        score: 0,
        players: prev.right.players.map((p, i) => ({
          ...p,
          courtSide: i === 0 ? 'right' : 'left',
        })),
      },
    }));
    setServing({
      team: 'left',
      serverNumber: 2,
      serverIndex: 0,
      isFirstServeOfGame: true,
    });
    setHistory([]);
    setStatus('waiting');
    stopTimer();
    setTimeout({
      active: false,
      team: null,
      remaining: TIMEOUT_DURATION,
      leftRemaining: TIMEOUTS_PER_GAME,
      rightRemaining: TIMEOUTS_PER_GAME,
    });
    setHasSwitchedSidesInDecidingGame(false);
  }, [stopTimer]);

  const endGame = useCallback(async () => {
    if (status === 'waiting') return;

    const leftScore = teams.left.score;
    const rightScore = teams.right.score;

    let winner = 'Hoa';
    const newTeams = { ...teams };
    if (leftScore > rightScore) {
      winner = teams.left.name;
      newTeams.left.gamesWon++;
    } else if (rightScore > leftScore) {
      winner = teams.right.name;
      newTeams.right.gamesWon++;
    }
    setTeams(newTeams);

    const newGameScore: GameScore = {
      game: currentGame,
      athlete1: leftScore,
      athlete2: rightScore,
    };
    const newGameScores = [...gameScores, newGameScore];
    setGameScores(newGameScores);

    recordEvent('game_end', leftScore > rightScore ? 'left' : 'right', {
      gameNumber: currentGame,
      leftScore,
      rightScore,
    });
    addEvent(`[TROPHY] Game ${currentGame}: ${winner} thang!`);
    showToast('[TROPHY]', `${winner} thang Game ${currentGame}!`);

    // Sync events
    const eventsToSync = [...pendingEventsRef.current];
    pendingEventsRef.current = [];
    await syncEventsToServer(eventsToSync, {
      currentGame,
      gamesWonAthlete1: newTeams.left.gamesWon,
      gamesWonAthlete2: newTeams.right.gamesWon,
      gameScores: newGameScores,
      servingTeam: serving.team === 'left' ? 'athlete1' : 'athlete2',
      serverNumber: serving.serverNumber,
      timerSeconds: timer,
    });

    const winsNeeded = Math.ceil(totalGames / 2);
    if (newTeams.left.gamesWon >= winsNeeded || newTeams.right.gamesWon >= winsNeeded) {
      const matchWinner = newTeams.left.gamesWon >= winsNeeded ? newTeams.left.name : newTeams.right.name;
      const winnerId = newTeams.left.gamesWon >= winsNeeded ? newTeams.left.athleteId : newTeams.right.athleteId;
      setStatus('finished');
      stopTimer();
      addEvent(`[CROWN] TRẠN ĐẤU KẾT THÚC: ${matchWinner} CHIEN THANG!`);
      showToast('[CROWN]', `${matchWinner} thang tran dau!`);

      const finalScoreParts = newGameScores.map((g) => `${g.athlete1}-${g.athlete2}`);
      const finalScore = `${newTeams.left.gamesWon}-${newTeams.right.gamesWon} (${finalScoreParts.join(', ')})`;

      await endMatchAPI({
        winner: newTeams.left.gamesWon > newTeams.right.gamesWon ? 'left' : 'right',
        winnerId,
        gameScores: newGameScores,
        finalScore,
        totalTimer: timer,
        teams: {
          left: { gamesWon: newTeams.left.gamesWon, athleteId: newTeams.left.athleteId },
          right: { gamesWon: newTeams.right.gamesWon, athleteId: newTeams.right.athleteId },
        },
      });
    } else if (currentGame < totalGames) {
      setCurrentGame((prev) => prev + 1);
      resetScores();
    }
  }, [
    status,
    teams,
    currentGame,
    totalGames,
    gameScores,
    serving,
    timer,
    recordEvent,
    addEvent,
    showToast,
    stopTimer,
    resetScores,
  ]);

  const startTimeout = useCallback(
    (team: TeamSide) => {
      const remaining = team === 'left' ? timeout.leftRemaining : timeout.rightRemaining;
      if (remaining <= 0) {
        showToast('[X]', `${teams[team].name} da het timeout!`);
        return;
      }

      stopTimer();
      setTimeout((prev) => ({
        ...prev,
        active: true,
        team,
        remaining: TIMEOUT_DURATION,
        [team === 'left' ? 'leftRemaining' : 'rightRemaining']:
          prev[team === 'left' ? 'leftRemaining' : 'rightRemaining'] - 1,
      }));

      recordEvent('timeout', team);
      addEvent(
        `[TIMER] ${teams[team].name} goi timeout (con ${
          (team === 'left' ? timeout.leftRemaining : timeout.rightRemaining) - 1
        } lan)`
      );
    },
    [timeout, teams, stopTimer, recordEvent, addEvent, showToast]
  );

  const endTimeout = useCallback(() => {
    setTimeout((prev) => ({
      ...prev,
      active: false,
      team: null,
      remaining: TIMEOUT_DURATION,
    }));
    startTimer();
    addEvent('[PLAY] Tiep tuc sau timeout');
    showToast('[PLAY]', 'Tiep tuc tran dau');
  }, [startTimer, addEvent, showToast]);

  const setSelectedServerIndex = useCallback((index: number) => {
    setServing((prev) => ({ ...prev, serverIndex: index }));
  }, []);

  return {
    // State
    gameMode,
    status,
    currentGame,
    totalGames,
    teams,
    serving,
    history,
    eventLog,
    gameScores,
    timeout,
    toast,
    isMatchCompleted,
    hasSwitchedSidesInDecidingGame,
    matchData: MATCH_DATA,

    // Computed
    scoreCall,
    servingCourtSide,
    matchWinnerName,
    isDecidingGame,
    statusText,

    // Methods
    setStatus,
    rallyWon,
    adjustScore,
    undo,
    recordFault,
    manualSwitchServer,
    switchSides,
    startMatch,
    pauseMatch,
    endGame,
    startTimeout,
    endTimeout,
    addEvent,
    clearEventLog,
    showToast,
    hideToast,
    setSelectedServerIndex,
    performSideSwitch,
    resetScores,
  };
}
