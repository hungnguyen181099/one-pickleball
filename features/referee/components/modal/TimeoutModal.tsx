import React from 'react';

import { TeamSide, Teams, TimeoutState } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { styles } from '../../styles';

interface TimeoutModalProps {
  visible: boolean;
  teams: Teams;
  timeout: TimeoutState;
  onClose: () => void;
  onSelectTeam: (team: TeamSide) => void;
}

export const TimeoutModal: React.FC<TimeoutModalProps> = ({ visible, teams, timeout, onClose, onSelectTeam }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
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
              <Text style={[styles.modalTitle, isLandscape && { fontSize: 16, marginBottom: 4 }]}>Gọi Timeout</Text>
              <Text style={[styles.modalSubtitle, isLandscape && { fontSize: 11 }]}>Chọn đội muốn timeout (mỗi đội 2 lần/game)</Text>
            </View>

            <View style={[styles.modalBody, isLandscape && { paddingVertical: 12, paddingHorizontal: 16 }]}>
              <View style={[styles.teamOptions, isLandscape && { gap: 8 }]}>
                {/* Left Team */}
                <TouchableOpacity
                  style={[
                    styles.teamOption,
                    timeout.leftRemaining <= 0 && styles.teamOptionDisabled,
                    isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                  ]}
                  onPress={() => timeout.leftRemaining > 0 && onSelectTeam('left')}
                  disabled={timeout.leftRemaining <= 0}
                >
                  <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorBlue, isLandscape && { height: 32 }]} />
                  <View style={styles.teamOptionContent}>
                    <Text style={[styles.teamOptionName, isLandscape && { fontSize: 13 }]}>{teams.left.name}</Text>
                    <Text style={[styles.teamOptionPlayers, isLandscape && { fontSize: 10 }]}>Còn {timeout.leftRemaining} timeout</Text>
                  </View>
                  <View style={[styles.teamOptionRadio, isLandscape && { width: 28, height: 28 }]}>
                    {timeout.leftRemaining > 0 ? (
                      <Text style={{ fontSize: isLandscape ? 14 : 18 }}>
                        <Ionicons name="timer-outline" size={isLandscape ? 24 : 40} />
                      </Text>
                    ) : (
                      <Text style={{ fontSize: isLandscape ? 11 : 14, color: '#ef4444' }}>Hết</Text>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Right Team */}
                <TouchableOpacity
                  style={[
                    styles.teamOption,
                    timeout.rightRemaining <= 0 && styles.teamOptionDisabled,
                    isLandscape && { paddingVertical: 10, paddingHorizontal: 12 }
                  ]}
                  onPress={() => timeout.rightRemaining > 0 && onSelectTeam('right')}
                  disabled={timeout.rightRemaining <= 0}
                >
                  <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorRed, isLandscape && { height: 32 }]} />
                  <View style={styles.teamOptionContent}>
                    <Text style={[styles.teamOptionName, isLandscape && { fontSize: 13 }]}>{teams.right.name}</Text>
                    <Text style={[styles.teamOptionPlayers, isLandscape && { fontSize: 10 }]}>Còn {timeout.rightRemaining} timeout</Text>
                  </View>
                  <View style={[styles.teamOptionRadio, isLandscape && { width: 28, height: 28 }]}>
                    {timeout.rightRemaining > 0 ? (
                      <Text style={{ fontSize: isLandscape ? 14 : 18 }}>
                        <Ionicons name="timer-outline" size={isLandscape ? 24 : 40} />
                      </Text>
                    ) : (
                      <Text style={{ fontSize: isLandscape ? 11 : 14, color: '#ef4444' }}>Hết</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.modalFooter, isLandscape && { paddingVertical: 10, paddingHorizontal: 16, gap: 10 }]}>
              <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary, isLandscape && { paddingVertical: 10 }]} onPress={onClose}>
                <Text style={[styles.btnModalText, styles.btnModalTextSecondary, isLandscape && { fontSize: 12 }]}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
