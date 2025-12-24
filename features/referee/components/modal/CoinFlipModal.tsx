import React, { useCallback, useRef, useState } from 'react';

import { Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing, Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../styles';

interface CoinFlipModalProps {
  visible: boolean;
  teams: Teams;
  onClose: () => void;
  onConfirm: (result: string) => void;
}

export const CoinFlipModal: React.FC<CoinFlipModalProps> = ({ visible, teams, onClose, onConfirm }) => {
  const [coinResult, setCoinResult] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    setCoinResult('');

    // Determine random result
    const isBlue = Math.random() > 0.5;
    const finalRotation = isBlue ? 8 : 9; // Even = blue (front), Odd = red (back)

    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: finalRotation,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFlipping(false);
      const result = isBlue ? ` ${teams.left.name} được chọn sân trước!` : `${teams.right.name} được chọn sân trước!`;
      setCoinResult(result);
    });
  }, [isFlipping, rotateAnim, teams]);

  const handleConfirm = () => {
    if (!coinResult || isFlipping) return;
    onConfirm(coinResult);
    // Reset for next time
    setCoinResult('');
    rotateAnim.setValue(0);
  };

  const handleClose = () => {
    setCoinResult('');
    rotateAnim.setValue(0);
    setIsFlipping(false);
    onClose();
  };

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const frontOpacity = rotateAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = rotateAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bốc thăm chia sân</Text>
            <Text style={styles.modalSubtitle}>Nhấn vào đồng xu để bốc thăm ngẫu nhiên</Text>
          </View>

          <View style={styles.modalBody}>
            <View style={styles.coinContainer}>
              <TouchableOpacity style={styles.coin3d} onPress={flipCoin} disabled={isFlipping} activeOpacity={0.9}>
                <Animated.View style={[styles.coinInner, { transform: [{ rotateY }] }]}>
                  {/* Front - Blue */}
                  <Animated.View style={[styles.coinSide, styles.coinFront, { opacity: frontOpacity }]}>
                    <Text
                      style={[styles.coinText, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}
                    >
                      <Ionicons name="ellipse" size={96} color="#0000FF" />
                    </Text>
                  </Animated.View>

                  {/* Back - Red */}
                  <Animated.View
                    style={[
                      styles.coinSide,
                      styles.coinBack,
                      {
                        opacity: backOpacity,
                        transform: [{ rotateY: '180deg' }],
                      },
                    ]}
                  >
                    <Text
                      style={[styles.coinText, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}
                    >
                      <Ionicons name="ellipse" size={96} color="#FF8080" />
                    </Text>
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>

              {coinResult ? (
                <Text style={styles.coinResultText}>{coinResult}</Text>
              ) : isFlipping ? (
                <Text style={styles.coinHint}>Đang bốc thăm...</Text>
              ) : (
                <Text style={styles.coinHint}>Nhấn vào đồng xu để bốc thăm</Text>
              )}
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.btnModal, styles.btnModalSecondary]}
              onPress={handleClose}
              disabled={isFlipping}
            >
              <Text style={[styles.btnModalText, styles.btnModalTextSecondary]}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnModal, styles.btnModalPrimary, (!coinResult || isFlipping) && styles.btnModalDisabled]}
              onPress={handleConfirm}
              disabled={!coinResult || isFlipping}
            >
              <Text style={[styles.btnModalText, styles.btnModalTextPrimary]}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
