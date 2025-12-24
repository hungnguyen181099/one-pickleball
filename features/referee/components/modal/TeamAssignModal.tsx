import React, { useState } from 'react';

import { GameMode, TeamSide, Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../styles';

interface TeamAssignModalProps {
  visible: boolean;
  teams: Teams;
  gameMode: GameMode;
  onBack: () => void;
  onConfirm: (selectedLeftTeam: TeamSide) => void;
}

export const TeamAssignModal: React.FC<TeamAssignModalProps> = ({ visible, teams, gameMode, onBack, onConfirm }) => {
  const [selectedLeftTeam, setSelectedLeftTeam] = useState<TeamSide>('left');

  const getPlayersString = (team: TeamSide): string => {
    if (gameMode === 'singles') {
      return teams[team].players[0]?.name || '';
    }
    return teams[team].players.map((p) => p.name).join(' - ');
  };

  const handleConfirm = () => {
    onConfirm(selectedLeftTeam);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onBack}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Phân chia vị trí trên sân</Text>
            <Text style={styles.modalSubtitle}>Chọn đội sẽ đứng ở vị trí bên TRÁI</Text>
          </View>

          <View style={styles.modalBody}>
            <View style={styles.teamOptions}>
              {/* Left Team Option */}
              <TouchableOpacity
                style={[styles.teamOption, selectedLeftTeam === 'left' && styles.teamOptionSelected]}
                onPress={() => setSelectedLeftTeam('left')}
              >
                <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorBlue]} />
                <View style={styles.teamOptionContent}>
                  <Text style={styles.teamOptionName}>{teams.left.name}</Text>
                  <Text style={styles.teamOptionPlayers}>{getPlayersString('left')}</Text>
                </View>
                <View style={[styles.teamOptionRadio, selectedLeftTeam === 'left' && styles.teamOptionRadioSelected]}>
                  {selectedLeftTeam === 'left' && (
                    <Text style={styles.teamOptionRadioCheck}>
                      <Ionicons name="checkmark-outline" size={16} />
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Right Team Option */}
              <TouchableOpacity
                style={[styles.teamOption, selectedLeftTeam === 'right' && styles.teamOptionSelected]}
                onPress={() => setSelectedLeftTeam('right')}
              >
                <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorRed]} />
                <View style={styles.teamOptionContent}>
                  <Text style={styles.teamOptionName}>{teams.right.name}</Text>
                  <Text style={styles.teamOptionPlayers}>{getPlayersString('right')}</Text>
                </View>
                <View style={[styles.teamOptionRadio, selectedLeftTeam === 'right' && styles.teamOptionRadioSelected]}>
                  {selectedLeftTeam === 'right' && (
                    <Text style={styles.teamOptionRadioCheck}>
                      <Ionicons name="checkmark-outline" />
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary]} onPress={onBack}>
              <Text style={[styles.btnModalText, styles.btnModalTextSecondary]}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary]} onPress={handleConfirm}>
              <Text style={[styles.btnModalText, styles.btnModalTextPrimary]}>Xac Nhan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
