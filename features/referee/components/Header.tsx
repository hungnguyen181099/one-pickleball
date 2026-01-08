import React from 'react';

import { GameMode, MatchStatus, Referee } from '@/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
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
  isLandscape?: boolean;
  onToggleOrientation?: () => void;
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
  isLandscape,
  onToggleOrientation,
}) => {
  // Landscape Layout
  if (isLandscape) {
    return (
      <View style={[styles.header, styles.landscapeHeader]}>
        {/* Left Section */}
        <View style={styles.landscapeHeaderLeft}>
          <TouchableOpacity style={styles.btnBack} onPress={onBack}>
            <Text style={styles.btnBackText}>
              <MaterialIcons name="chevron-left" />
            </Text>
          </TouchableOpacity>
          <View style={[styles.matchTimerBox, styles.landscapeMatchTimerBox]}>
            <Text style={[styles.timerValue, styles.landscapeTimerValue]}>{timerDisplay}</Text>
          </View>
        </View>

        {/* Center Section - Timer & Status */}
        <View style={styles.landscapeHeaderCenter}>
          <View style={[styles.statusBadge, styles.landscapeStatusBadge]}>
            <View style={[styles.statusDot, status === 'playing' && styles.statusDotLive]} />
            <Text style={[styles.statusText, styles.landscapeStatusText]}>{statusText}</Text>
          </View>
          <View style={styles.gameScoreDisplay}>
            <Text style={[styles.gameScoreItem, styles.gameScoreItemLeft]}>{leftGamesWon}</Text>
            <Text style={styles.gameScoreSeparator}>-</Text>
            <Text style={[styles.gameScoreItem, styles.gameScoreItemRight]}>{rightGamesWon}</Text>
          </View>
          <Text style={[styles.gameBadge, styles.landscapeGameBadge]}>
            Game <Text style={styles.gameBadgeStrong}>{currentGame}</Text> / {totalGames}
          </Text>
        </View>

        <View style={styles.landscapeHeaderRight}>
          <View style={[styles.gameModeSwitch, styles.landscapeGameModeSwitch]}>
            {gameMode.includes('single') && (
              <View style={[styles.modeBtn, styles.modeBtnActive]}>
                <Text style={[styles.modeBtnText, styles.modeBtnTextActive]}>Đơn</Text>
              </View>
            )}
            {gameMode.includes('double')&& (
              <View style={[styles.modeBtn, styles.modeBtnActive]}>
                <Text style={[styles.modeBtnText, styles.modeBtnTextActive]}>Đôi</Text>
              </View>
            )}
          </View>
          <View style={[styles.refereeInfoHeader, styles.landscapeRefereeInfoHeader]}>
            <Image
              source={referee.avatar ? referee.avatar : require('@/assets/images/referee.png')}
              style={[styles.refereeAvatarSm, styles.landscapeRefereeAvatar]}
              contentFit="cover"
            />
            <View style={styles.refereeDetails}>
              <Text style={[styles.refereeNameSm, styles.landscapeRefereeNameSm]}>{referee.name}</Text>
              <Text style={[styles.refereeRole, styles.landscapeRefereeRole]}>Trọng tài - {referee.level}</Text>
            </View>
          </View>
          {onToggleOrientation && (
            <TouchableOpacity style={styles.rotateBtn} onPress={onToggleOrientation}>
              <Ionicons name="phone-portrait-outline" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Portrait Layout
  return (
    <View style={styles.header}>
      {/* Left Section */}
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.btnBack} onPress={onBack}>
          <Text style={styles.btnBackText}>Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Text style={styles.logoText}>onePickleball</Text>
          {onToggleOrientation && (
            <TouchableOpacity style={styles.rotateBtn} onPress={onToggleOrientation}>
              <Ionicons name="phone-landscape-outline" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Center Section */}
      <View style={styles.headerCenter}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {/* Left: Timer Box - styled larger relative to other items */}
          <View
            style={[
              styles.matchTimerBox,
              {
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
                backgroundColor: '#008bb9', // Light blue/teal from image
                minWidth: 120,
                alignItems: 'center',
              },
            ]}
          >
            <Text style={[styles.timerLabel, { fontSize: 8, letterSpacing: 1, marginBottom: 2 }]}>THỜI GIAN</Text>
            <Text style={[styles.timerValue, { fontSize: 24, letterSpacing: 1, lineHeight: 28 }]}>{timerDisplay}</Text>
          </View>

          {/* Right: Info Column */}
          <View style={{ gap: 4, alignItems: 'center' }}>
            {/* Status Badge - styled as pill */}
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 50,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  status === 'playing' ? styles.statusDotLive : { backgroundColor: '#f59e0b', width: 6, height: 6 },
                ]}
              />
              <Text style={[styles.statusText, { fontSize: 10 }]}>{statusText}</Text>
            </View>

            {/* Game Count */}
            <Text style={[styles.gameBadge, { fontSize: 10 }]}>
              Game <Text style={[styles.gameBadgeStrong, { color: '#f59e0b', fontSize: 12 }]}>{currentGame}</Text> /{' '}
              {totalGames}
            </Text>

            {/* Score Display */}
            <View style={[styles.gameScoreDisplay, { gap: 6 }]}>
              <View
                style={[
                  styles.gameScoreItem,
                  styles.gameScoreItemLeft,
                  { backgroundColor: '#1e3a8a', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
                ]}
              >
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>{leftGamesWon}</Text>
              </View>
              <Text style={[styles.gameScoreSeparator, { fontSize: 10 }]}>-</Text>
              <View
                style={[
                  styles.gameScoreItem,
                  styles.gameScoreItemRight,
                  { backgroundColor: '#581c1c', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
                ]}
              >
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>{rightGamesWon}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
