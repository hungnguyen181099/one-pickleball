import { useCallback, useMemo, useRef, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';

import { endMatchAPI, syncEventsToServer } from '@/features/referee/api/referee.api';
import {
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
  MatchStateResponse,
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

export function useMatchState(
  data: MatchStateResponse,
  timer: number,
  startTimer: () => void,
  stopTimer: () => void
): UseMatchStateReturn {
  const match = data.data;

  const matchData: MatchData = {
    id: match.id,
    status: match.status,
    isCompleted: match.isCompleted,
    bestOf: match.bestOf,
    gameMode: match.gameMode,
    tournament: {
      name: match.tournament.name,
    },
    category: {
      name: match.category.name,
    },
    round: {
      name: match.round.name,
    },
    court: {
      name: match.court.name,
      number: match.court.number,
    },
    athlete1: {
      id: match.athlete1.id,
      name: match.athlete1.name,
      partnerName: match.athlete1.partnerName || '',
      pairName: match.athlete1.pairName,
    },
    athlete2: {
      id: match.athlete2.id,
      name: match.athlete2.name,
      partnerName: match.athlete2.partnerName || '',
      pairName: match.athlete2.pairName,
    },
    referee: {
      id: match.referee.id,
      name: match.referee.name,
      level: 'N/A',
      avatar: '',
    },
    gameScores: match.gameScores,
    setScores: match.setScores,
    currentGame: match.currentGame,
    gamesWonAthlete1: match.gamesWonAthlete1,
    gamesWonAthlete2: match.gamesWonAthlete2,
    timerSeconds: match.timerSeconds,
    servingTeam: match.servingTeam || '',
    serverNumber: match.serverNumber || 0,
  };

  const gameMode = matchData.gameMode;

  const totalGames = matchData.bestOf;

  const [status, setStatus] = useState<MatchStatus>(
    matchData.isCompleted ? 'finished' : matchData.status === 'in_progress' ? 'paused' : 'waiting'
  );

  const { id } = useLocalSearchParams<{ id: string }>();

  const [currentGame, setCurrentGame] = useState(matchData.currentGame);

  const [teams, setTeams] = useState<Teams>({
    left: {
      name: matchData.athlete1.pairName || matchData.athlete1.name || 'TBD',
      athleteId: matchData.athlete1.id,
      score: 0,
      gamesWon: matchData.gamesWonAthlete1 || 0,
      players: buildPlayersArray(matchData.athlete1, matchData.gameMode.includes('doubles')),
    },
    right: {
      name: matchData.athlete2.pairName || matchData.athlete2.name || 'TBD',
      athleteId: matchData.athlete2.id,
      score: 0,
      gamesWon: matchData.gamesWonAthlete2 || 0,
      players: buildPlayersArray(matchData.athlete2, matchData.gameMode.includes('doubles')),
    },
  });

  const [serving, setServing] = useState<Serving>({
    team: matchData.servingTeam === 'athlete2' ? 'right' : 'left',
    serverIndex: 0,
    serverNumber: matchData.serverNumber,
    isFirstServeOfGame: true,
  });

  const [gameScores, setGameScores] = useState<GameScore[]>(matchData.gameScores);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [eventLog, setEventLog] = useState<EventLogItem[]>([]);
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
  const isMatchCompleted = useMemo(() => matchData.isCompleted || status === 'finished', [status]);

  const matchWinnerName = useMemo(() => {
    if (!matchData.isCompleted) return '';
    const firstGameWinner = matchData.setScores?.[0];
    if (!firstGameWinner) return '';
    const winnerId =
      firstGameWinner.athlete1 > firstGameWinner.athlete2 ? matchData.athlete1.id : matchData.athlete2.id;
    return winnerId === matchData.athlete1.id
      ? matchData.athlete1.pairName || matchData.athlete1.name
      : matchData.athlete2.pairName || matchData.athlete2.name;
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
    showToast('', 'Đã xoá lịch sử');
  }, [showToast]);

  const recordEvent = useCallback(
    async (type: string, team: TeamSide | null, data: Record<string, unknown> = {}) => {
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
        syncEventsToServer(id, eventsToSync, {
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
    [teams, currentGame, timer, gameScores, serving, id]
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
      addEvent('Swtich Side-out!');
      showToast('Swtich', 'Side-out - Đổi quyền giao');
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
        addEvent('Swtich Side-out!');
        showToast('Swtich', 'Side-out - Đổi quyền giao');
      } else if (serving.serverNumber === 1) {
        setServing((prev) => ({
          ...prev,
          serverNumber: 2,
          serverIndex: prev.serverIndex === 0 ? 1 : 0,
        }));
        recordEvent('server_change', serving.team, { serverNumber: 2 });
        addEvent('[2] Chuyển sang Server 2');
        showToast('[2]', 'Chuyển Server 2');
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
        addEvent('Swtich Side-out!');
        showToast('Swtich', 'Side-out - Đổi quyền giao');
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
      addEvent('Swtich Đổi sân ở game quyết định (6 diem)');
      showToast('Swtich', 'Đổi sân - Game quyết định!');
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
        showToast('[!]', 'Vui lòng bắt đầu trận đấu!');
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
        addEvent(`+1 điểm cho ${teams[winningTeam].name}`);

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
      addEvent(`[EDIT] ${delta > 0 ? '+' : ''}${delta} điểm cho ${teams[team].name} (điều chỉnh)`);
    },
    [teams, saveHistory, recordEvent, addEvent]
  );

  const undo = useCallback(() => {
    if (history.length === 0) {
      showToast('[X]', 'Không có thao tác để hoàn tác');
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
    addEvent('Hoàn tác thao tác trước');
    showToast('', 'Đã hoàn tác');
  }, [history, recordEvent, addEvent, showToast]);

  const recordFault = useCallback(() => {
    if (status !== 'playing') return;
    saveHistory();
    recordEvent('fault', serving.team);
    handleSideOut();
    addEvent('Lỗi giao bóng');
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
    addEvent(`Swtich Đổi sang Server ${serving.serverNumber === 1 ? 2 : 1}`);
    showToast('Swtich', `Đã đổi sang Server ${serving.serverNumber === 1 ? 2 : 1}`);
  }, [status, gameMode, serving, saveHistory, recordEvent, addEvent, showToast]);

  const switchSides = useCallback(() => {
    saveHistory();
    performSideSwitch();
    addEvent('Swtich Đổi vị trí sân');
    showToast('Swtich', 'Đã đổi sân cho 2 đội');
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
      addEvent(' Trận đấu bắt đầu!');
      showToast('', 'Trận đấu đã bắt đầu!');
    },
    [gameMode, serving.team, startTimer, recordEvent, addEvent, showToast]
  );

  const pauseMatch = useCallback(() => {
    if (status === 'waiting') return;

    if (status === 'paused') {
      setStatus('playing');
      startTimer();
      addEvent(' Tiếp tục');
      showToast('', 'Tiếp tục trận đấu');
    } else {
      setStatus('paused');
      stopTimer();
      addEvent('Tạm dừng');
      showToast('', 'Trận đấu tạm dừng');
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

    let winner = 'Hoà';
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
    addEvent(` Game ${currentGame}: ${winner} thắng!`);
    showToast('', `${winner} thắng Game ${currentGame}!`);

    // Sync events
    const eventsToSync = [...pendingEventsRef.current];
    pendingEventsRef.current = [];

    await syncEventsToServer(id, eventsToSync, {
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
      addEvent(`TRẬN ĐẤU KẾT THÚC: ${matchWinner} CHIẾN THẮNG!`);
      showToast('', `${matchWinner} thắng trận đấu!`);

      const finalScoreParts = newGameScores.map((g) => `${g.athlete1}-${g.athlete2}`);
      const finalScore = `${newTeams.left.gamesWon}-${newTeams.right.gamesWon} (${finalScoreParts.join(', ')})`;

      endMatchAPI(id, {
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
        showToast('', `${teams[team].name} đã hết timeout!`);
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
        `${teams[team].name} gọi timeout (còn ${
          (team === 'left' ? timeout.leftRemaining : timeout.rightRemaining) - 1
        } lần)`
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
    addEvent('Tiếp tục sau timeout');
    showToast('', 'Tiếp tục trận đấu');
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
    matchData: matchData,

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
