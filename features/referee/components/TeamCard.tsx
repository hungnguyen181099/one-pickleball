import React from 'react';

import { GameMode, MatchStatus, Serving, Team, TeamSide } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';

interface TeamCardProps {
  team: Team;
  side: TeamSide;
  serving: Serving;
  gameMode: GameMode;
  status: MatchStatus;
  isMatchCompleted: boolean;
  onRallyWon: () => void;
  onAdjustScore: (delta: number) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  side,
  serving,
  gameMode,
  status,
  isMatchCompleted,
  onRallyWon,
  onAdjustScore,
}) => {
  const isBlue = side === 'left';
  const isServing = serving.team === side;

  const getCourtSideText = (courtSide: 'left' | 'right') => {
    return courtSide === 'right' ? 'Ben Phai (Chan)' : 'Ben Trai (Le)';
  };

  return (
    <View style={[styles.teamCard, isServing && styles.teamCardServing]}>
      {/* Top colored border */}
      <View style={[styles.teamCardTopBorder, isBlue ? styles.teamCardTopBorderBlue : styles.teamCardTopBorderRed]} />

      {/* Serving indicator */}
      {isServing && (
        <View style={styles.servingIndicator}>
          <Ionicons name="baseball-outline" size={16} color="#fff" />
          <Text style={styles.servingIndicatorText}>Đang giao bóng</Text>
        </View>
      )}

      {/* Team header */}
      <View style={styles.teamHeader}>
        <View style={[styles.teamAvatar, isBlue ? styles.teamAvatarBlue : styles.teamAvatarRed]}>
          <Text style={styles.teamAvatarText}>
            {isBlue ? (
              <Ionicons name="ellipse" size={20} color="#0000FF" />
            ) : (
              <Ionicons name="ellipse" size={20} color="#FF8080" />
            )}
          </Text>
        </View>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      </View>

      {/* Score section */}
      <View style={styles.teamScoreSection}>
        <Text style={[styles.teamScore, isBlue ? styles.teamScoreBlue : styles.teamScoreRed]}>{team.score}</Text>
        <Text style={styles.scoreLabel}>Điểm số</Text>
        {isServing && gameMode === 'doubles' && (
          <View style={styles.serverNumberDisplay}>
            <Text style={styles.serverLabel}>Server</Text>
            <Text style={styles.serverValue}>{serving.serverNumber}</Text>
          </View>
        )}
      </View>

      {/* Players section */}
      <View style={styles.playersSection}>
        <Text style={styles.playersTitleText}>
          <Ionicons name="body" size={14} color="#fff" /> {gameMode === 'doubles' ? 'Thành viên' : 'VĐV'}
        </Text>
        <View style={styles.playersGrid}>
          {team.players.map((player, index) => {
            const isActiveServer = isServing && (gameMode === 'singles' || serving.serverIndex === index);

            return (
              <View key={index} style={[styles.playerCard, isActiveServer && styles.playerCardActive]}>
                <View style={[styles.playerStatus, isActiveServer && styles.playerStatusActive]} />
                <View style={styles.playerDetails}>
                  <Text style={[styles.playerName, isActiveServer && styles.playerNameActive]}>{player.name}</Text>
                  <Text style={styles.playerPosition}>Vị trí: {getCourtSideText(player.courtSide)}</Text>
                </View>
                {gameMode === 'doubles' && (
                  <View style={styles.playerTag}>
                    <Text style={styles.playerTagText}>Server {index + 1}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Score controls */}
      {!isMatchCompleted && (
        <View style={styles.scoreControls}>
          <TouchableOpacity
            style={[styles.btnScore, styles.btnScoreAdd, status !== 'playing' && styles.btnScoreDisabled]}
            onPress={onRallyWon}
            disabled={status !== 'playing'}
          >
            <Text style={styles.btnScoreText}>+</Text>
            <Text style={styles.btnScoreText}>Thắng rally</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnScore, styles.btnScoreSubtract, status !== 'playing' && styles.btnScoreDisabled]}
            onPress={() => onAdjustScore(-1)}
            disabled={status !== 'playing'}
          >
            <Text style={[styles.btnScoreText, styles.btnScoreTextMuted]}>-</Text>
            <Text style={[styles.btnScoreText, styles.btnScoreTextMuted]}>Trừ điểm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
