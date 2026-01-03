import React, { useState } from 'react';

import { GameMode, Serving, Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { styles } from '../../styles';

interface ServeOrderModalProps {
  visible: boolean;
  teams: Teams;
  serving: Serving;
  gameMode: GameMode;
  onBack: () => void;
  onConfirm: (serverIndex: number) => void;
}

export const ServeOrderModal: React.FC<ServeOrderModalProps> = ({
  visible,
  teams,
  serving,
  gameMode,
  onBack,
  onConfirm,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [selectedServerIndex, setSelectedServerIndex] = useState(0);

  const servingTeamPlayers = teams[serving.team].players;
  const servingTeamName = teams[serving.team].name;

  const handleConfirm = () => {
    onConfirm(selectedServerIndex);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onBack}>
      <View style={[styles.modalOverlay, isLandscape && { padding: 16 }]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.modalContent,
            isLandscape && {
              maxWidth: 400,
              alignSelf: 'center',
            }
          ]}>
            <View style={[styles.modalHeader, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
              <Ionicons name="baseball-outline" size={isLandscape ? 32 : 56} color="#fff" />
              <Text style={[styles.modalTitle, isLandscape && { fontSize: 16, marginBottom: 4 }]}>Xác định người giao bóng</Text>
              <Text style={[styles.modalSubtitle, isLandscape && { fontSize: 11 }]}>{servingTeamName} được quyền giao bóng trước</Text>
            </View>

            <View style={[styles.modalBody, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
              {gameMode === 'doubles' ? (
                <View style={[styles.serveSection, isLandscape && { gap: 8 }]}>
                  <Text style={[styles.serveLabel, isLandscape && { fontSize: 11, marginBottom: 6 }]}>
                    <Ionicons name="hand-left-outline" size={isLandscape ? 12 : 14} /> Chọn người giao bóng đầu tiên
                  </Text>
                  {servingTeamPlayers.map((player, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.playerOption,
                        selectedServerIndex === index && styles.playerOptionSelected,
                        isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                      ]}
                      onPress={() => setSelectedServerIndex(index)}
                    >
                      <View
                        style={[
                          styles.playerOptionRadio,
                          selectedServerIndex === index && styles.playerOptionRadioSelected,
                          isLandscape && { width: 16, height: 16 }
                        ]}
                      />
                      <Text style={[styles.playerOptionName, isLandscape && { fontSize: 12 }]}>{player.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={[styles.serveSection, isLandscape && { gap: 8 }]}>
                  <Text style={[styles.serveLabel, isLandscape && { fontSize: 11, marginBottom: 6 }]}>Người giao bóng</Text>
                  <View style={[
                    styles.playerOption,
                    styles.playerOptionSelected,
                    isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                  ]}>
                    <View style={[styles.playerOptionRadio, styles.playerOptionRadioSelected, isLandscape && { width: 16, height: 16 }]} />
                    <Text style={[styles.playerOptionName, isLandscape && { fontSize: 12 }]}>{servingTeamPlayers[0]?.name}</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={[styles.modalFooter, isLandscape && { paddingVertical: 10, paddingHorizontal: 16, gap: 10 }]}>
              <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary, isLandscape && { paddingVertical: 10 }]} onPress={onBack}>
                <Text style={[styles.btnModalText, styles.btnModalTextSecondary, isLandscape && { fontSize: 12 }]}>Quay lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary, isLandscape && { paddingVertical: 10 }]} onPress={handleConfirm}>
                <Text style={[styles.btnModalText, styles.btnModalTextPrimary, isLandscape && { fontSize: 12 }]}>
                  <Ionicons name="play" size={isLandscape ? 12 : 16} color="#fff" /> Bắt đầu trận đấu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
