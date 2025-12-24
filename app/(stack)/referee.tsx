import React, { useCallback, useState } from 'react';

import { ModalType, TeamSide } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, Text, View } from 'react-native';

// Hooks
// Components
import { ControlPanel } from '@/features/referee/components/ControlPanel';
import { EventHistory } from '@/features/referee/components/EventHistory';
import { Header } from '@/features/referee/components/Header';
import { ScoreBoard } from '@/features/referee/components/ScoreBoard';
import { Toast } from '@/features/referee/components/Toast';
// Modals
import { CoinFlipModal } from '@/features/referee/components/modal/CoinFlipModal';
import { ServeOrderModal } from '@/features/referee/components/modal/ServeOrderModal';
import { TeamAssignModal } from '@/features/referee/components/modal/TeamAssignModal';
import { TimeoutCountdown } from '@/features/referee/components/modal/TimeoutCountdown';
import { TimeoutModal } from '@/features/referee/components/modal/TimeoutModal';
import { MATCH_DATA } from '@/features/referee/constants';
import { styles } from '@/features/referee/styles';

import { useMatchState } from '@/hooks/useMatchState';
import { useTimer } from '@/hooks/useTimer';

export const RefereeScreen: React.FC = () => {
  // Timer hook
  const { timer, timerDisplay, startTimer, stopTimer, setTimer } = useTimer(MATCH_DATA.timerSeconds || 0);
  const router = useRouter();
  // Match state hook
  const {
    gameMode,
    status,
    currentGame,
    totalGames,
    teams,
    serving,
    history,
    eventLog,
    timeout,
    toast,
    isMatchCompleted,
    matchData,
    scoreCall,
    matchWinnerName,
    statusText,
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
    performSideSwitch,
  } = useMatchState(timer, startTimer, stopTimer);

  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Navigation

  const navigateBack = () => {
    router.back();
  };

  const handleBack = useCallback(() => {
    if (status !== 'waiting' && status !== 'finished') {
      Alert.alert(
        'Xác nhận',
        'Trận đấu đang diễn ra. Bạn có chắc muốn rời đi?\n\nNhấn OK để rời đi (dữ liệu sẽ được lưu)',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              navigateBack();
            },
          },
        ]
      );
    } else {
      navigateBack();
    }
  }, [status]);

  // Modal handlers
  const handleShowCoinFlip = useCallback(() => {
    setActiveModal('coinFlip');
  }, []);

  const handleCoinFlipConfirm = useCallback(
    (result: string) => {
      addEvent(`Bốc thăm: ${result}`);
      setActiveModal('teamAssign');
    },
    [addEvent]
  );

  const handleTeamAssignConfirm = useCallback(
    (selectedLeftTeam: TeamSide) => {
      if (selectedLeftTeam === 'right') {
        performSideSwitch();
      }
      addEvent(` Đã phân chia vị trí sân`);
      showToast(``, 'Da gan doi vao vi tri san');
      setActiveModal('serveOrder');
    },
    [performSideSwitch, addEvent, showToast]
  );

  const handleServeOrderConfirm = useCallback(
    (serverIndex: number) => {
      setActiveModal(null);
      startMatch(serverIndex);
    },
    [startMatch]
  );

  const handleToggleMatch = useCallback(() => {
    if (status === 'waiting') {
      setActiveModal('serveOrder');
    }
  }, [status]);

  const handleRequestTimeout = useCallback(() => {
    if (status !== 'playing') return;
    if (timeout.active) return;
    setActiveModal('timeout');
  }, [status, timeout.active]);

  const handleTimeoutSelect = useCallback(
    (team: TeamSide) => {
      setActiveModal(null);
      startTimeout(team);
    },
    [startTimeout]
  );

  const handleTimeoutEnd = useCallback(() => {
    endTimeout();
  }, [endTimeout]);

  const handleClearEventLog = useCallback(() => {
    Alert.alert('Xac nhan', 'Xoa toan bo lich su tran dau?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: clearEventLog },
    ]);
  }, [clearEventLog]);

  // Render completed match results
  const renderCompletedResults = () => (
    <View style={styles.completedResults}>
      <Text style={styles.completedTitle}>
        <Ionicons name="trophy-outline" size={24} color="#fff" /> TRẠN ĐẤU ĐÃ KẾT THÚC
      </Text>
      <View style={styles.completedTournament}>
        <Text style={styles.tournamentName}>{matchData.tournament.name}</Text>
        <Text style={styles.tournamentRound}>
          <Text style={styles.tournamentRoundAccent}>{matchData.round.name}</Text>
          {' - '}
          {gameMode === 'singles' ? 'Đơn' : 'Đôi'}
        </Text>
      </View>
      <Text style={styles.winnerText}>
        Nguoi thang: <Text style={styles.winnerName}>{matchWinnerName}</Text>
      </Text>
      <Text style={styles.scoreText}>
        Ti so: {matchData.setScores?.map((s) => `${s.athlete1}-${s.athlete2}`).join(', ') || 'N/A'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background pattern placeholder */}
      <View style={styles.bgPattern} />

      <View style={styles.appContainer}>
        {/* Header */}
        <Header
          timerDisplay={timerDisplay}
          status={status}
          statusText={statusText}
          currentGame={currentGame}
          totalGames={totalGames}
          leftGamesWon={teams.left.gamesWon}
          rightGamesWon={teams.right.gamesWon}
          gameMode={gameMode}
          referee={matchData.referee}
          onBack={handleBack}
        />

        {/* Main Content */}
        <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
          {!isMatchCompleted ? (
            renderCompletedResults()
          ) : (
            <>
              {/* Scoreboard */}
              <ScoreBoard
                teams={teams}
                serving={serving}
                gameMode={gameMode}
                status={status}
                isMatchCompleted={isMatchCompleted}
                scoreCall={scoreCall}
                matchData={matchData}
                onRallyWon={rallyWon}
                onAdjustScore={adjustScore}
                onSwitchSides={switchSides}
              />

              {/* Control Panel */}
              <ControlPanel
                status={status}
                gameMode={gameMode}
                history={history}
                onShowCoinFlip={handleShowCoinFlip}
                onPauseMatch={pauseMatch}
                onToggleMatch={handleToggleMatch}
                onEndGame={endGame}
                onUndo={undo}
                onRecordFault={recordFault}
                onManualSwitchServer={manualSwitchServer}
                onRequestTimeout={handleRequestTimeout}
              />

              {/* Event History */}
              <EventHistory eventLog={eventLog} onClear={handleClearEventLog} />
            </>
          )}
        </ScrollView>
      </View>

      {/* Modals */}
      <CoinFlipModal
        visible={activeModal === 'coinFlip'}
        teams={teams}
        onClose={() => setActiveModal(null)}
        onConfirm={handleCoinFlipConfirm}
      />

      <TeamAssignModal
        visible={activeModal === 'teamAssign'}
        teams={teams}
        gameMode={gameMode}
        onBack={() => setActiveModal('coinFlip')}
        onConfirm={handleTeamAssignConfirm}
      />

      <ServeOrderModal
        visible={activeModal === 'serveOrder'}
        teams={teams}
        serving={serving}
        gameMode={gameMode}
        onBack={() => setActiveModal('teamAssign')}
        onConfirm={handleServeOrderConfirm}
      />

      <TimeoutModal
        visible={activeModal === 'timeout'}
        teams={teams}
        timeout={timeout}
        onClose={() => setActiveModal(null)}
        onSelectTeam={handleTimeoutSelect}
      />

      <TimeoutCountdown visible={timeout.active} teams={teams} timeout={timeout} onEnd={handleTimeoutEnd} />

      {/* Toast */}
      <Toast toast={toast} />
    </View>
  );
};

export default RefereeScreen;
