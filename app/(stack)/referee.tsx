import { ModalType, TeamSide } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from 'expo-router';
import { OrientationLock, lockAsync } from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { Image } from 'expo-image';

export const RefereeScreen = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [currentOrientationLock, setCurrentOrientationLock] = useState<'landscape' | 'portrait'>('landscape');

  React.useEffect(() => {
    async function setDefaultLandscapeOrientation() {
      try {
        await lockAsync(OrientationLock.LANDSCAPE);
        setCurrentOrientationLock('landscape');
      } catch (error) {
        console.error('Error setting landscape orientation:', error);
      }
    }
    setDefaultLandscapeOrientation();

    return () => {
      lockAsync(OrientationLock.PORTRAIT_UP).catch((err: any) =>
        console.error('Error locking orientation:', err)
      );
    };
  }, []);

  // Hàm toggle xoay màn hình thủ công
  const handleToggleOrientation = useCallback(async () => {
    try {
      if (currentOrientationLock === 'landscape') {
        await lockAsync(OrientationLock.PORTRAIT_UP);
        setCurrentOrientationLock('portrait');
      } else {
        await lockAsync(OrientationLock.LANDSCAPE);
        setCurrentOrientationLock('landscape');
      }
    } catch (error) {
      console.error('Error toggling orientation:', error);
    }
  }, [currentOrientationLock]);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      if (isLandscape) {
        NavigationBar.setVisibilityAsync('hidden');
        // Note: setBehaviorAsync is not supported with edge-to-edge enabled
      } else {
        NavigationBar.setVisibilityAsync('visible');
      }
    }

    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible');
      }
    };
  }, [isLandscape]);

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
    isMatchCompleted = false,
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

  const renderMainContent = () => {
    // Check if match is completed
    if (isMatchCompleted) {
      return (
        <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
          {renderCompletedResults()}
        </ScrollView>
      );
    }

    // Check landscape mode
    if (isLandscape) {
      return (
        <View style={styles.landscapeContainer}>
          {/* 3-Column Grid Layout for Landscape */}
          <View style={styles.landscapeGridMain}>
            {/* Left Column: Team 1 Score Card */}
            <View style={styles.landscapeTeamColumn}>
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
                isLandscape={isLandscape}
                showLeftTeamOnly={true}
              />
            </View>

            {/* Center Column: Controls & Info */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.landscapeCenterColumn}>
              <View style={[styles.courtInfoBar, styles.landscapeCourtInfoBar, { flexDirection: 'column', height: 'auto', gap: 2, paddingVertical: 4 }]}>
                <View style={styles.courtDisplay}>
                  <View style={[styles.courtIconLg, styles.landscapeCourtIconLg]}>
                    <Ionicons name="baseball-outline" size={16} color="#fff" />
                  </View>
                  <View style={[styles.courtText, { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' }]}>
                    <Text style={styles.courtLabel}>Sân thi đấu:</Text>
                    <Text style={[styles.courtNumber, styles.landscapeCourtNumber]}>{matchData.court.number}</Text>
                  </View>
                </View>
                <View style={[styles.tournamentInfo, { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' }]}>
                  <Text style={styles.tournamentName}>{matchData.tournament.name}:</Text>
                  <Text style={styles.tournamentRoundAccent}>{matchData.round.name}</Text>
                </View>
              </View>

              <View style={styles.landscapeTopRow}>
                <View style={styles.landscapeCenterScoreCall}>
                  <Text style={styles.landscapeCenterScoreLabel}>Score Call</Text>
                  <Text style={styles.landscapeCenterScoreValue}>{scoreCall}</Text>
                </View>
                <View style={styles.landscapeVsCenterCompact}>
                  <View style={styles.landscapeVsBadgeSmall}>
                    <Text style={styles.landscapeVsBadgeTextSmall}>VS</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.landscapeSwitchBtnCompact, { opacity: status !== 'playing' ? 0.5 : 1 }]}
                    onPress={switchSides}
                    disabled={status !== 'playing'}
                  >
                    <Ionicons name="swap-horizontal" size={14} color="#94a3b8" />
                    <Text style={styles.landscapeSwitchBtnTextCompact}>Đổi sân</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                isLandscape={isLandscape}
              />

              <EventHistory eventLog={eventLog} onClear={handleClearEventLog} isLandscape={isLandscape} />
            </ScrollView>

            {/* Right Column: Team 2 Score Card */}
            <View style={styles.landscapeTeamColumn}>
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
                isLandscape={isLandscape}
                showRightTeamOnly={true}
              />
            </View>
          </View>
        </View>
      );
    }

    // Default Portrait Mode
    return (
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <View style={styles.gameModeSwitch}>
            {gameMode === 'singles' && (
              <View style={[styles.modeBtn, styles.modeBtnActive]}>
                <Text style={[styles.modeBtnText, styles.modeBtnTextActive]}>Đơn</Text>
              </View>
            )}
            {gameMode === 'doubles' && (
              <View style={[styles.modeBtn, styles.modeBtnActive]}>
                <Text style={[styles.modeBtnText, styles.modeBtnTextActive]}>Đôi</Text>
              </View>
            )}
          </View>
          <View style={styles.refereeInfoHeader}>
            <Image
              source={matchData.referee.avatar ? matchData.referee.avatar : require('@/assets/images/referee.png')}
              style={styles.refereeAvatarSm}
              contentFit="cover"
            />
            <View style={styles.refereeDetails}>
              <Text style={styles.refereeNameSm}>{matchData.referee.name}</Text>
              <Text style={styles.refereeRole}>Trọng tài - {matchData.referee.level}</Text>
            </View>
          </View>
        </View>

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
          isLandscape={isLandscape}
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
          isLandscape={isLandscape}
        />

        {/* Event History */}
        <EventHistory eventLog={eventLog} onClear={handleClearEventLog} isLandscape={isLandscape} />
      </ScrollView>
    );
  };

  return (
    <>

      <SafeAreaView
        style={[
          styles.container,
        ]}
      >
        <StatusBar hidden={isLandscape} style='light' />

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
            isLandscape={isLandscape}
            onToggleOrientation={handleToggleOrientation}
          />

          {/* Main Content */}
          {renderMainContent()}
        </View>
      </SafeAreaView>

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
    </>
  );
};

export default RefereeScreen;
