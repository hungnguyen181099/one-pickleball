import React, { useEffect, useRef } from 'react';

import { Teams, TimeoutState } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles';

interface TimeoutCountdownProps {
  visible: boolean;
  teams: Teams;
  timeout: TimeoutState;
  onEnd: () => void;
}

export const TimeoutCountdown: React.FC<TimeoutCountdownProps> = ({ visible, teams, timeout, onEnd }) => {
  const { width, height } = useWindowDimensions();
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

  const isLandscape = width > height;

  const teamName = timeout.team ? teams[timeout.team].name : '';
  const teamRemaining = timeout.team ? (timeout.team === 'left' ? timeout.leftRemaining : timeout.rightRemaining) : 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onEnd}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={{ width, height, backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <SafeAreaView
          style={[styles.modalOverlay, styles.timeoutCountdownOverlay]}
          edges={['left', 'right', 'bottom']}
        >
          <View style={[
            styles.modalContent,
            { alignItems: 'center' },
            isLandscape && { maxWidth: 320, alignSelf: 'center' }
          ]}>
            <View style={[styles.modalHeader, isLandscape && { paddingVertical: 12 }]}>
              <Ionicons name="timer-outline" size={isLandscape ? 32 : 60} color="#fff" />
              <Text style={[styles.modalTitle, isLandscape && { fontSize: 16, marginBottom: 2 }]}>TIMEOUT</Text>
              <Text style={[styles.modalSubtitle, isLandscape && { fontSize: 11 }]}>{teamName}</Text>
            </View>

            <View style={[styles.modalBody, { alignItems: 'center' }, isLandscape && { paddingVertical: 12 }]}>
              <Text style={[
                styles.timeoutCountdownValue,
                isLandscape && { fontSize: 44, marginVertical: 8 }
              ]}>{formatTime(remaining)}</Text>
              <Text style={[styles.timeoutRemainingText, isLandscape && { fontSize: 11 }]}>Con {teamRemaining} timeout</Text>
            </View>

            <View style={[styles.modalFooter, { justifyContent: 'center' }, isLandscape && { paddingVertical: 10 }]}>
              <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary, isLandscape && { paddingVertical: 10 }]} onPress={onEnd}>
                <Text style={[styles.btnModalText, styles.btnModalTextPrimary, isLandscape && { fontSize: 12 }]}>
                  <Ionicons name="play" size={isLandscape ? 12 : 16} /> Tiếp tục trận đấu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
