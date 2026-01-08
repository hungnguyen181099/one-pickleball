import React, { useState } from 'react';

import { GameMode, TeamSide, Teams } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../styles';

interface TeamAssignModalProps {
  visible: boolean;
  teams: Teams;
  gameMode: GameMode;
  onBack: () => void;
  onConfirm: (selectedLeftTeam: TeamSide) => void;
}

export const TeamAssignModal: React.FC<TeamAssignModalProps> = ({ visible, teams, gameMode, onBack, onConfirm }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onBack}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={{ width, height, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <SafeAreaView
          style={[styles.modalOverlay, isLandscape && { padding: 16 }]}
          edges={isLandscape ? ['left', 'right', 'bottom'] : ['top', 'bottom']}
        >
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
                <Text style={[styles.modalTitle, isLandscape && { fontSize: 16, marginBottom: 4 }]}>Phân chia vị trí trên sân</Text>
                <Text style={[styles.modalSubtitle, isLandscape && { fontSize: 11 }]}>Chọn đội sẽ đứng ở vị trí bên TRÁI</Text>
              </View>

              <View style={[styles.modalBody, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
                <View style={[styles.teamOptions, isLandscape && { gap: 8 }]}>
                  {/* Left Team Option */}
                  <TouchableOpacity
                    style={[
                      styles.teamOption,
                      selectedLeftTeam === 'left' && styles.teamOptionSelected,
                      isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                    ]}
                    onPress={() => setSelectedLeftTeam('left')}
                  >
                    <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorBlue, isLandscape && { height: 32 }]} />
                    <View style={styles.teamOptionContent}>
                      <Text style={[styles.teamOptionName, isLandscape && { fontSize: 13 }]}>{teams.left.name}</Text>
                      <Text style={[styles.teamOptionPlayers, isLandscape && { fontSize: 10 }]}>{getPlayersString('left')}</Text>
                    </View>
                    <View style={[styles.teamOptionRadio, selectedLeftTeam === 'left' && styles.teamOptionRadioSelected, isLandscape && { width: 20, height: 20 }]}>
                      {selectedLeftTeam === 'left' && (
                        <Text style={styles.teamOptionRadioCheck}>
                          <Ionicons name="checkmark-outline" size={isLandscape ? 12 : 16} />
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Right Team Option */}
                  <TouchableOpacity
                    style={[
                      styles.teamOption,
                      selectedLeftTeam === 'right' && styles.teamOptionSelected,
                      isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                    ]}
                    onPress={() => setSelectedLeftTeam('right')}
                  >
                    <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorRed, isLandscape && { height: 32 }]} />
                    <View style={styles.teamOptionContent}>
                      <Text style={[styles.teamOptionName, isLandscape && { fontSize: 13 }]}>{teams.right.name}</Text>
                      <Text style={[styles.teamOptionPlayers, isLandscape && { fontSize: 10 }]}>{getPlayersString('right')}</Text>
                    </View>
                    <View style={[styles.teamOptionRadio, selectedLeftTeam === 'right' && styles.teamOptionRadioSelected, isLandscape && { width: 20, height: 20 }]}>
                      {selectedLeftTeam === 'right' && (
                        <Text style={styles.teamOptionRadioCheck}>
                          <Ionicons name="checkmark-outline" size={isLandscape ? 12 : 16} />
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.modalFooter, isLandscape && { paddingVertical: 10, paddingHorizontal: 16, gap: 10 }]}>
                <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary, isLandscape && { paddingVertical: 10 }]} onPress={onBack}>
                  <Text style={[styles.btnModalText, styles.btnModalTextSecondary, isLandscape && { fontSize: 12 }]}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnModal, styles.btnModalPrimary, isLandscape && { paddingVertical: 10 }]} onPress={handleConfirm}>
                  <Text style={[styles.btnModalText, styles.btnModalTextPrimary, isLandscape && { fontSize: 12 }]}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
