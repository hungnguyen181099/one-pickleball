import React, { useState } from 'react';

import { GameMode, Serving, Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

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
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);

  const servingTeamPlayers = teams[serving.team].players;
  const servingTeamName = teams[serving.team].name;

  const handleConfirm = () => {
    onConfirm(selectedServerIndex);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onBack}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Ionicons name="baseball-outline" size={56} color="#fff" />
            <Text style={styles.modalTitle}>Xác định người giao bóng</Text>
            <Text style={styles.modalSubtitle}>{servingTeamName} được quyền giao bóng trước</Text>
          </View>

          <View style={styles.modalBody}>
            {gameMode === 'doubles' ? (
              <View style={styles.serveSection}>
                <Text style={styles.serveLabel}>
                  <Ionicons name="hand-left-outline" /> Chọn người giao bóng đầu tiên
                </Text>
                {servingTeamPlayers.map((player, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.playerOption, selectedServerIndex === index && styles.playerOptionSelected]}
                    onPress={() => setSelectedServerIndex(index)}
                  >
                    <View
                      style={[
                        styles.playerOptionRadio,
                        selectedServerIndex === index && styles.playerOptionRadioSelected,
                      ]}
                    />
                    <Text style={styles.playerOptionName}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.serveSection}>
                <Text style={styles.serveLabel}>Người giao bóng</Text>
                <View style={[styles.playerOption, styles.playerOptionSelected]}>
                  <View style={[styles.playerOptionRadio, styles.playerOptionRadioSelected]} />
                  <Text style={styles.playerOptionName}>{servingTeamPlayers[0]?.name}</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary]} onPress={onBack}>
              <Text style={[styles.btnModalText, styles.btnModalTextSecondary]}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary]} onPress={handleConfirm}>
              <Text style={[styles.btnModalText, styles.btnModalTextPrimary]}>
                <Ionicons name="play" size={16} color="#fff" /> Bắt đầu trận đấu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
