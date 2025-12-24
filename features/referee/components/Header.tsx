import React from 'react';

import { GameMode, MatchStatus, Referee } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';

interface HeaderProps {
  timerDisplay: string;
  status: MatchStatus;
  statusText: string;
  currentGame: number;
  totalGames: number;
  leftGamesWon: number;
  rightGamesWon: number;
  gameMode: GameMode;
  referee: Referee;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  timerDisplay,
  status,
  statusText,
  currentGame,
  totalGames,
  leftGamesWon,
  rightGamesWon,
  gameMode,
  referee,
  onBack,
}) => {
  return (
    <View style={styles.header}>
      {/* Left Section */}
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.btnBack} onPress={onBack}>
          <Text style={styles.btnBackText}>Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Text style={styles.logoText}>onePickleball</Text>
        </View>
      </View>

      {/* Center Section */}
      <View style={styles.headerCenter}>
        <View style={styles.matchTimerBox}>
          <Text style={styles.timerLabel}>Thời gian</Text>
          <Text style={styles.timerValue}>{timerDisplay}</Text>
        </View>
        <View style={styles.matchInfo}>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, status === 'playing' && styles.statusDotLive]} />
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
          <Text style={styles.gameBadge}>
            Game <Text style={styles.gameBadgeStrong}>{currentGame}</Text> / {totalGames}
          </Text>
          <View style={styles.gameScoreDisplay}>
            <Text style={[styles.gameScoreItem, styles.gameScoreItemLeft]}>{leftGamesWon}</Text>
            <Text style={styles.gameScoreSeparator}>-</Text>
            <Text style={[styles.gameScoreItem, styles.gameScoreItemRight]}>{rightGamesWon}</Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.headerRight}>
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
          <View style={styles.refereeDetails}>
            <Text style={styles.refereeNameSm}>{referee.name}</Text>
            <Text style={styles.refereeRole}>Trong tai - {referee.level}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
