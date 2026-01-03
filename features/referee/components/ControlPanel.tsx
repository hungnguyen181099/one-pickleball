import React from 'react';

import { GameMode, HistoryItem, MatchStatus } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';
import { Grid, GridItem } from '@/components/ui/Grid';

interface ControlPanelProps {
  status: MatchStatus;
  gameMode: GameMode;
  history: HistoryItem[];
  onShowCoinFlip: () => void;
  onPauseMatch: () => void;
  onToggleMatch: () => void;
  onEndGame: () => void;
  onUndo: () => void;
  onRecordFault: () => void;
  onManualSwitchServer: () => void;
  onRequestTimeout: () => void;
  isLandscape?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  status,
  gameMode,
  history,
  onShowCoinFlip,
  onPauseMatch,
  onToggleMatch,
  onEndGame,
  onUndo,
  onRecordFault,
  onManualSwitchServer,
  onRequestTimeout,
  isLandscape,
}) => {
  return (
    <View style={[styles.controlPanel, isLandscape && styles.landscapeControlPanel]}>
      {/* Match Controls */}
      <View style={styles.controlCard}>
        {!isLandscape && (
          <View style={styles.controlCardHeader}>
            <Text style={styles.controlCardTitleText}>
              <Ionicons name="play" size={14} /> Điều khiển trận đấu
            </Text>
          </View>
        )}
        <View style={[styles.controlCardBody, isLandscape && styles.landscapeControlCardBody]}>
          <Grid columns={2} gap={8}>
            {/* Coin Flip */}
            <GridItem>
              <TouchableOpacity
                style={[styles.btnGame, styles.btnGameCoin, isLandscape && styles.landscapeBtnGame]}
                onPress={onShowCoinFlip}
              >
                <Ionicons name="disc-sharp" size={isLandscape ? 20 : 32} color="#fff" />
                <Text style={styles.btnGameText}>Bốc thăm</Text>
              </TouchableOpacity>
            </GridItem>
            {/* Pause */}

            <GridItem>
              <TouchableOpacity
                style={[
                  styles.btnGame,
                  styles.btnGamePause,
                  isLandscape && styles.landscapeBtnGame,
                  status === 'waiting' && styles.btnGameDisabled,
                ]}
                onPress={onPauseMatch}
                disabled={status === 'waiting'}
              >
                <Ionicons name="pause" size={isLandscape ? 20 : 32} color="#fff" />
                <Text style={styles.btnGameText}>{status === 'paused' ? 'Tiếp tục' : 'Tạm dừng'}</Text>
              </TouchableOpacity>
            </GridItem>
            {/* Start/Running */}

            <GridItem>
              <TouchableOpacity
                style={[
                  styles.btnGame,
                  styles.btnGameStart,
                  isLandscape && styles.landscapeBtnGame,
                  status === 'playing' && styles.btnGameDisabled,
                ]}
                onPress={onToggleMatch}
                disabled={status === 'playing'}
              >
                <Ionicons name="play" size={isLandscape ? 20 : 32} color="#fff" />
                <Text style={styles.btnGameText}>{status === 'waiting' ? 'Bắt đầu' : 'Đang đấu'}</Text>
              </TouchableOpacity>
            </GridItem>
            {/* End */}
            <GridItem>
              <TouchableOpacity
                style={[
                  styles.btnGame,
                  styles.btnGameEnd,
                  isLandscape && styles.landscapeBtnGame,
                  status === 'waiting' && styles.btnGameDisabled,
                ]}
                onPress={onEndGame}
                disabled={status === 'waiting'}
              >
                <Ionicons name="stop" size={isLandscape ? 20 : 32} color="#fff" />
                <Text style={styles.btnGameText}>Kết thúc</Text>
              </TouchableOpacity>
            </GridItem>
          </Grid>
        </View>
      </View>

      {/* Quick Actions */}
      {!isLandscape && (
        <View style={styles.controlCardHeader}>
          <Text style={styles.controlCardTitleText}>Thao tác nhanh</Text>
        </View>
      )}
      <View style={[styles.controlCardBody, isLandscape && styles.landscapeControlCardBody]}>
        <View style={styles.quickActionsGrid}>
          {/* Undo */}
          <TouchableOpacity
            style={[styles.btnQuick, isLandscape && styles.landscapeBtnQuick, history.length === 0 && styles.btnScoreDisabled]}
            onPress={onUndo}
            disabled={history.length === 0}
          >
            <Ionicons name="arrow-undo" size={14} color="#e2e8f0" />
            <Text style={styles.btnQuickText}>Hoàn tác</Text>
          </TouchableOpacity>

          {/* Fault */}
          <TouchableOpacity
            style={[styles.btnQuick, isLandscape && styles.landscapeBtnQuick, status !== 'playing' && styles.btnScoreDisabled]}
            onPress={onRecordFault}
            disabled={status !== 'playing'}
          >
            <Ionicons name="ban-outline" size={14} color="#e2e8f0" />
            <Text style={styles.btnQuickText}>Lỗi giao</Text>
          </TouchableOpacity>

          {/* Switch Server */}
          <TouchableOpacity
            style={[
              styles.btnQuick,
              isLandscape && styles.landscapeBtnQuick,
              (status !== 'playing' || gameMode === 'singles') && styles.btnScoreDisabled,
            ]}
            onPress={onManualSwitchServer}
            disabled={status !== 'playing' || gameMode === 'singles'}
          >
            <Ionicons name="swap-horizontal-outline" size={14} color="#e2e8f0" />
            <Text style={styles.btnQuickText}>Đổi server</Text>
          </TouchableOpacity>

          {/* Timeout */}
          <TouchableOpacity
            style={[styles.btnQuick, isLandscape && styles.landscapeBtnQuick, status !== 'playing' && styles.btnScoreDisabled]}
            onPress={onRequestTimeout}
            disabled={status !== 'playing'}
          >
            <Ionicons name="timer-outline" size={14} color="#e2e8f0" />
            <Text style={styles.btnQuickText}>Timeout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
