import React from 'react';

import { GameMode, HistoryItem, MatchStatus } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';

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
}) => {
  return (
    <View style={styles.controlPanel}>
      {/* Match Controls */}
      <View style={styles.controlCard}>
        <View style={styles.controlCardHeader}>
          <Text style={styles.controlCardTitleText}>
            <Ionicons name="play" size={14} /> Điều khiển trận đấu
          </Text>
        </View>
        <View style={styles.controlCardBody}>
          <View style={styles.gameControlsGrid}>
            {/* Coin Flip */}
            <TouchableOpacity style={[styles.btnGame, styles.btnGameCoin]} onPress={onShowCoinFlip}>
              <Ionicons name="disc-sharp" size={32} color="#fff" />
              <Text style={[styles.btnGameText, styles.btnGameText]}>Bốc thăm</Text>
            </TouchableOpacity>

            {/* Pause */}
            <TouchableOpacity
              style={[styles.btnGame, styles.btnGamePause, status === 'waiting' && styles.btnGameDisabled]}
              onPress={onPauseMatch}
              disabled={status === 'waiting'}
            >
              <Ionicons name="pause" size={32} color="#fff" />
              <Text style={styles.btnGameText}>{status === 'paused' ? 'Tiếp tục' : 'Tạm dừng'}</Text>
            </TouchableOpacity>

            {/* Start/Running */}
            <TouchableOpacity
              style={[styles.btnGame, styles.btnGameStart, status === 'playing' && styles.btnGameDisabled]}
              onPress={onToggleMatch}
              disabled={status === 'playing'}
            >
              <Ionicons name="play" size={32} color="#fff" />
              <Text style={styles.btnGameText}>{status === 'waiting' ? 'Bắt đầu trận đấu' : 'Đang diễn ra'}</Text>
            </TouchableOpacity>

            {/* End */}
            <TouchableOpacity
              style={[styles.btnGame, styles.btnGameEnd, status === 'waiting' && styles.btnGameDisabled]}
              onPress={onEndGame}
              disabled={status === 'waiting'}
            >
              <Ionicons name="stop" size={32} color="#fff" />
              <Text style={styles.btnGameText}>Kết thúc</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.controlCard}>
        <View style={styles.controlCardHeader}>
          <Text style={styles.controlCardTitleText}>Thao tác nhanh</Text>
        </View>
        <View style={styles.controlCardBody}>
          <View style={styles.quickActionsGrid}>
            {/* Undo */}
            <TouchableOpacity
              style={[styles.btnQuick, history.length === 0 && styles.btnScoreDisabled]}
              onPress={onUndo}
              disabled={history.length === 0}
            >
              <Ionicons name="arrow-undo" size={14} color="#e2e8f0" />
              <Text style={styles.btnQuickText}>Hoàn tác</Text>
            </TouchableOpacity>

            {/* Fault */}
            <TouchableOpacity
              style={[styles.btnQuick, status !== 'playing' && styles.btnScoreDisabled]}
              onPress={onRecordFault}
              disabled={status !== 'playing'}
            >
              <Ionicons name="ban-outline" size={14} color="#e2e8f0" />
              <Text style={styles.btnQuickText}>Lỗi giao</Text>
            </TouchableOpacity>

            {/* Switch Server */}
            <TouchableOpacity
              style={[styles.btnQuick, (status !== 'playing' || gameMode === 'singles') && styles.btnScoreDisabled]}
              onPress={onManualSwitchServer}
              disabled={status !== 'playing' || gameMode === 'singles'}
            >
              <Ionicons name="swap-horizontal-outline" size={14} color="#e2e8f0" />
              <Text style={styles.btnQuickText}>Đổi server</Text>
            </TouchableOpacity>

            {/* Timeout */}
            <TouchableOpacity
              style={[styles.btnQuick, status !== 'playing' && styles.btnScoreDisabled]}
              onPress={onRequestTimeout}
              disabled={status !== 'playing'}
            >
              <Ionicons name="timer-outline" size={14} color="#e2e8f0" />
              <Text style={styles.btnQuickText}>Timeout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
