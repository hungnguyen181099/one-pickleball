import React from 'react';

import { GameMode, MatchData, MatchStatus, Serving, Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';
import { TeamCard } from './TeamCard';

interface ScoreBoardProps {
  teams: Teams;
  serving: Serving;
  gameMode: GameMode;
  status: MatchStatus;
  isMatchCompleted: boolean;
  scoreCall: string;
  matchData: MatchData;
  onRallyWon: (team: 'left' | 'right') => void;
  onAdjustScore: (team: 'left' | 'right', delta: number) => void;
  onSwitchSides: () => void;
  isLandscape?: boolean;
  showLeftTeamOnly?: boolean;
  showRightTeamOnly?: boolean;
  onRecordFault: () => void;
}

export const ScoreBoard = ({
  teams,
  serving,
  gameMode,
  status,
  isMatchCompleted,
  scoreCall,
  matchData,
  onRallyWon,
  onAdjustScore,
  onSwitchSides,
  isLandscape,
  showLeftTeamOnly,
  showRightTeamOnly,
  onRecordFault,
}: ScoreBoardProps) => {
  // Single team display for 3-column landscape layout
  if (showLeftTeamOnly) {
    return (
      <View style={styles.landscapeTeamCard}>
        <TeamCard
          team={teams.left}
          side="left"
          serving={serving}
          gameMode={gameMode}
          status={status}
          isMatchCompleted={isMatchCompleted}
          onRallyWon={() => onRallyWon('left')}
          onAdjustScore={(delta) => onAdjustScore('left', delta)}
          onRecordFault={onRecordFault}
          isLandscape={isLandscape}
        />
      </View>
    );
  }

  if (showRightTeamOnly) {
    return (
      <View style={styles.landscapeTeamCard}>
        <TeamCard
          team={teams.right}
          side="right"
          serving={serving}
          gameMode={gameMode}
          status={status}
          isMatchCompleted={isMatchCompleted}
          onRallyWon={() => onRallyWon('right')}
          onAdjustScore={(delta) => onAdjustScore('right', delta)}
          onRecordFault={onRecordFault}
          isLandscape={isLandscape}
        />
      </View>
    );
  }

  // Default full scoreboard display
  return (
    <View>
      {/* Score Call Bar */}
      <View style={[styles.scoreCallBar, isLandscape && styles.landscapeScoreCallBar]}>
        <Text style={styles.scoreCallLabel}>Score Call:</Text>
        <Text style={[styles.scoreCallValue, isLandscape && styles.landscapeScoreCallValue]}>{scoreCall}</Text>
      </View>

      {/* Court Info Bar */}
      <View style={[styles.courtInfoBar, isLandscape && styles.landscapeCourtInfoBar]}>
        <View style={styles.courtDisplay}>
          <View style={[styles.courtIconLg, isLandscape && styles.landscapeCourtIconLg]}>
            <Ionicons name="baseball-outline" size={isLandscape ? 16 : 24} color="#fff" />
          </View>
          <View style={styles.courtText}>
            <Text style={styles.courtLabel}>Sân thi đấu</Text>
            <Text style={[styles.courtNumber, isLandscape && styles.landscapeCourtNumber]}>{matchData.court.number}</Text>
          </View>
        </View>
        {!isLandscape && (
          <>
            <View style={styles.courtDivider} />
            <View style={styles.tournamentInfo}>
              <Text style={styles.tournamentName}>{matchData.tournament.name}</Text>
              <Text style={styles.tournamentRound}>
                <Text style={styles.tournamentRoundAccent}>{matchData.round.name}</Text>
                {' - '}
                {gameMode === 'singles' ? 'Đơn' : 'Đôi'}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Main Scoreboard */}
      <View style={[styles.scoreboardMain, isLandscape && styles.landscapeScoreBoard]}>
        {/* Left Team */}
        <TeamCard
          team={teams.left}
          side="left"
          serving={serving}
          gameMode={gameMode}
          status={status}
          isMatchCompleted={isMatchCompleted}
          onRallyWon={() => onRallyWon('left')}
          onAdjustScore={(delta) => onAdjustScore('left', delta)}
          onRecordFault={onRecordFault}
          isLandscape={isLandscape}
        />

        {/* VS Center */}
        <View style={[styles.vsCenter, isLandscape && styles.landscapeVsCenter]}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, gap: 8 }}>
            <View style={styles.vsLine} />
            <View style={[styles.vsBadge, isLandscape && styles.landscapeVsBadge]}>
              <Text style={styles.vsBadgeText}>VS</Text>
            </View>
            <View style={styles.vsLine} />
          </View>
          <TouchableOpacity style={styles.vsSwitchBtn} onPress={onSwitchSides} disabled={status !== 'playing'}>
            <Ionicons name="swap-horizontal" size={16} color="#94a3b8" />
            <Text style={styles.vsSwitchBtnText}>Đổi sân</Text>
          </TouchableOpacity>
        </View>

        {/* Right Team */}
        <TeamCard
          team={teams.right}
          side="right"
          serving={serving}
          gameMode={gameMode}
          status={status}
          isMatchCompleted={isMatchCompleted}
          onRallyWon={() => onRallyWon('right')}
          onAdjustScore={(delta) => onAdjustScore('right', delta)}
          onRecordFault={onRecordFault}
          isLandscape={isLandscape}
        />
      </View>
    </View>
  );
};
