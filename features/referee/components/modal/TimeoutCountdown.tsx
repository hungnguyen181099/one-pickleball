import React, { useEffect, useRef } from 'react';

import { Teams, TimeoutState } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../styles';

interface TimeoutCountdownProps {
  visible: boolean;
  teams: Teams;
  timeout: TimeoutState;
  onEnd: () => void;
}

export const TimeoutCountdown: React.FC<TimeoutCountdownProps> = ({ visible, teams, timeout, onEnd }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [remaining, setRemaining] = React.useState(timeout.remaining);

  useEffect(() => {
    if (visible && timeout.active) {
      setRemaining(timeout.remaining);
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [visible, timeout.active, timeout.remaining, onEnd]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const teamName = timeout.team ? teams[timeout.team].name : '';
  const teamRemaining = timeout.team ? (timeout.team === 'left' ? timeout.leftRemaining : timeout.rightRemaining) : 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onEnd}>
      <View style={[styles.modalOverlay, styles.timeoutCountdownOverlay]}>
        <View style={[styles.modalContent, { alignItems: 'center' }]}>
          <View style={styles.modalHeader}>
            <Ionicons name="timer-outline" size={60} color="#fff" />
            <Text style={styles.modalTitle}>TIMEOUT</Text>
            <Text style={styles.modalSubtitle}>{teamName}</Text>
          </View>

          <View style={[styles.modalBody, { alignItems: 'center' }]}>
            <Text style={styles.timeoutCountdownValue}>{formatTime(remaining)}</Text>
            <Text style={styles.timeoutRemainingText}>Con {teamRemaining} timeout</Text>
          </View>

          <View style={[styles.modalFooter, { justifyContent: 'center' }]}>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary]} onPress={onEnd}>
              <Text style={[styles.btnModalText, styles.btnModalTextPrimary]}>
                <Ionicons name="play" size={16} /> Tiếp tục trận đấu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
