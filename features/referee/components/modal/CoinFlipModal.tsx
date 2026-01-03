import React, { useCallback, useRef, useState } from 'react';

import { Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing, Modal, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { styles } from '../../styles';

interface CoinFlipModalProps {
  visible: boolean;
  teams: Teams;
  onClose: () => void;
  onConfirm: (result: string) => void;
}

export const CoinFlipModal: React.FC<CoinFlipModalProps> = ({ visible, teams, onClose, onConfirm }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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

  // Responsive sizes for landscape
  const coinSize = isLandscape ? 80 : 140;
  const iconSize = isLandscape ? 56 : 96;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={[styles.modalOverlay, isLandscape && { padding: 16 }]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.modalContent,
            isLandscape && {
              maxWidth: 360,
              alignSelf: 'center',
            }
          ]}>
            <View style={[styles.modalHeader, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
              <Text style={[styles.modalTitle, isLandscape && { fontSize: 16, marginBottom: 4 }]}>Bốc thăm chia sân</Text>
              <Text style={[styles.modalSubtitle, isLandscape && { fontSize: 11 }]}>Nhấn vào đồng xu để bốc thăm ngẫu nhiên</Text>
            </View>

            <View style={[styles.modalBody, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
              <View style={[styles.coinContainer, isLandscape && { gap: 12 }]}>
                <TouchableOpacity
                  style={[styles.coin3d, { width: coinSize, height: coinSize }]}
                  onPress={flipCoin}
                  disabled={isFlipping}
                  activeOpacity={0.9}
                >
                  <Animated.View style={[styles.coinInner, { transform: [{ rotateY }] }]}>
                    {/* Front - Blue */}
                    <Animated.View style={[
                      styles.coinSide,
                      styles.coinFront,
                      { opacity: frontOpacity, borderRadius: coinSize / 2 }
                    ]}>
                      <Text
                        style={[styles.coinText, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}
                      >
                        <Ionicons name="ellipse" size={iconSize} color="#0000FF" />
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
                          borderRadius: coinSize / 2,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.coinText, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}
                      >
                        <Ionicons name="ellipse" size={iconSize} color="#FF8080" />
                      </Text>
                    </Animated.View>
                  </Animated.View>
                </TouchableOpacity>

                {coinResult ? (
                  <Text style={[styles.coinResultText, isLandscape && { fontSize: 13 }]}>{coinResult}</Text>
                ) : isFlipping ? (
                  <Text style={[styles.coinHint, isLandscape && { fontSize: 11 }]}>Đang bốc thăm...</Text>
                ) : (
                  <Text style={[styles.coinHint, isLandscape && { fontSize: 11 }]}>Nhấn vào đồng xu để bốc thăm</Text>
                )}
              </View>
            </View>

            <View style={[styles.modalFooter, isLandscape && { paddingVertical: 10, paddingHorizontal: 16, gap: 10 }]}>
              <TouchableOpacity
                style={[styles.btnModal, styles.btnModalSecondary, isLandscape && { paddingVertical: 10 }]}
                onPress={handleClose}
                disabled={isFlipping}
              >
                <Text style={[styles.btnModalText, styles.btnModalTextSecondary, isLandscape && { fontSize: 12 }]}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnModal, styles.btnModalPrimary, (!coinResult || isFlipping) && styles.btnModalDisabled, isLandscape && { paddingVertical: 10 }]}
                onPress={handleConfirm}
                disabled={!coinResult || isFlipping}
              >
                <Text style={[styles.btnModalText, styles.btnModalTextPrimary, isLandscape && { fontSize: 12 }]}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
