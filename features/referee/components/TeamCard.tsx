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
  isLandscape?: boolean;
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
  isLandscape,
}) => {
  const isBlue = side === 'left';
  const isServing = serving.team === side;

  const getCourtSideText = (courtSide: 'left' | 'right') => {
    return courtSide === 'right' ? 'Bên phải (Chẵn)' : 'Bên trái (Lẻ)';
  };

  return (
    <View style={[styles.teamCard, isServing && styles.teamCardServing, isLandscape && styles.landscapeTeamCard]}>
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
      <View style={[styles.teamHeader, isLandscape && styles.landscapeTeamHeader]}>
        <View
          style={[
            styles.teamAvatar,
            isBlue ? styles.teamAvatarBlue : styles.teamAvatarRed,
            isLandscape && styles.landscapeTeamAvatar,
          ]}
        >
          <Text style={styles.teamAvatarText}>
            {isBlue ? (
              <Ionicons name="ellipse" size={isLandscape ? 12 : 20} color="#0000FF" />
            ) : (
              <Ionicons name="ellipse" size={isLandscape ? 12 : 20} color="#FF8080" />
            )}
          </Text>
        </View>
        <View style={styles.teamInfo}>
          <Text style={[styles.teamName, isLandscape && styles.landscapeTeamName]}>{team.name}</Text>
        </View>
      </View>

      {/* Score section */}
      <View style={[styles.teamScoreSection, isLandscape && styles.landscapeTeamScoreSection]}>
        <Text
          style={[
            styles.teamScore,
            isBlue ? styles.teamScoreBlue : styles.teamScoreRed,
            isLandscape && styles.landscapeTeamScore,
          ]}
        >
          {team.score}
        </Text>
        <Text style={[styles.scoreLabel, isLandscape && styles.landscapeScoreLabel]}>Điểm số</Text>
        {isServing && gameMode === 'doubles' && (
          <View style={styles.serverNumberDisplay}>
            <Text style={styles.serverLabel}>Server</Text>
            <Text style={styles.serverValue}>{serving.serverNumber}</Text>
          </View>
        )}
      </View>

      {/* Players section */}
      <View style={[styles.playersSection, isLandscape && styles.landscapePlayersSection]}>
        {!isLandscape && (
          <Text style={styles.playersTitleText}>
            <Ionicons name="body" size={14} color="#fff" /> {gameMode === 'doubles' ? 'Thành viên' : 'VĐV'}
          </Text>
        )}
        <View style={styles.playersGrid}>
          {team.players.map((player, index) => {
            const isActiveServer = isServing && (gameMode === 'singles' || serving.serverIndex === index);

            return (
              <View
                key={index}
                style={[
                  styles.playerCard,
                  isLandscape && styles.landscapePlayerCard,
                  isActiveServer && styles.playerCardActive,
                ]}
              >
                <View style={[styles.playerStatus, isActiveServer && styles.playerStatusActive]} />
                <View style={styles.playerDetails}>
                  <Text
                    style={[
                      styles.playerName,
                      isLandscape && styles.landscapePlayerName,
                      isActiveServer && styles.playerNameActive,
                    ]}
                  >
                    {player.name}
                  </Text>
                  <Text style={[styles.playerPosition, isLandscape && styles.landscapePlayerPosition]}>
                    Vị trí: {getCourtSideText(player.courtSide)}
                  </Text>
                </View>
                {gameMode === 'doubles' && !isLandscape && (
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
        <View style={[styles.scoreControls, isLandscape && styles.landscapeScoreControls]}>
          <TouchableOpacity
            style={[
              styles.btnScore,
              styles.btnScoreAdd,
              isLandscape && styles.landscapeBtnScore,
              status !== 'playing' && styles.btnScoreDisabled,
            ]}
            onPress={onRallyWon}
            disabled={status !== 'playing'}
          >
            <Text style={[styles.btnScoreText, isLandscape && styles.landscapeBtnScoreText]}>+</Text>
            <Text style={[styles.btnScoreText, isLandscape && styles.landscapeBtnScoreText]}>Thắng rally</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnScore,
              styles.btnScoreSubtract,
              isLandscape && styles.landscapeBtnScore,
              status !== 'playing' && styles.btnScoreDisabled,
            ]}
            onPress={() => onAdjustScore(-1)}
            disabled={status !== 'playing'}
          >
            <Text style={[styles.btnScoreText, isLandscape && styles.landscapeBtnScoreText, styles.btnScoreTextMuted]}>
              -
            </Text>
            <Text style={[styles.btnScoreText, isLandscape && styles.landscapeBtnScoreText, styles.btnScoreTextMuted]}>
              Trừ điểm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
