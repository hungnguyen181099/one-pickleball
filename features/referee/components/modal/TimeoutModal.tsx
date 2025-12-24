import React from 'react';

import { TeamSide, Teams, TimeoutState } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../styles';

interface TimeoutModalProps {
  visible: boolean;
  teams: Teams;
  timeout: TimeoutState;
  onClose: () => void;
  onSelectTeam: (team: TeamSide) => void;
}

export const TimeoutModal: React.FC<TimeoutModalProps> = ({ visible, teams, timeout, onClose, onSelectTeam }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Gọi Timeout</Text>
            <Text style={styles.modalSubtitle}>Chọn đội muốn timeout (mỗi đội 2 lần/game)</Text>
          </View>

          <View style={styles.modalBody}>
            <View style={styles.teamOptions}>
              {/* Left Team */}
              <TouchableOpacity
                style={[styles.teamOption, timeout.leftRemaining <= 0 && styles.teamOptionDisabled]}
                onPress={() => timeout.leftRemaining > 0 && onSelectTeam('left')}
                disabled={timeout.leftRemaining <= 0}
              >
                <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorBlue]} />
                <View style={styles.teamOptionContent}>
                  <Text style={styles.teamOptionName}>{teams.left.name}</Text>
                  <Text style={styles.teamOptionPlayers}>Còn {timeout.leftRemaining} timeout</Text>
                </View>
                <View style={styles.teamOptionRadio}>
                  {timeout.leftRemaining > 0 ? (
                    <Text style={{ fontSize: 18 }}>
                      <Ionicons name="timer-outline" size={40} />
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, color: '#ef4444' }}>Hết</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Right Team */}
              <TouchableOpacity
                style={[styles.teamOption, timeout.rightRemaining <= 0 && styles.teamOptionDisabled]}
                onPress={() => timeout.rightRemaining > 0 && onSelectTeam('right')}
                disabled={timeout.rightRemaining <= 0}
              >
                <View style={[styles.teamOptionIndicator, styles.teamOptionIndicatorRed]} />
                <View style={styles.teamOptionContent}>
                  <Text style={styles.teamOptionName}>{teams.right.name}</Text>
                  <Text style={styles.teamOptionPlayers}>Còn {timeout.rightRemaining} timeout</Text>
                </View>
                <View style={styles.teamOptionRadio}>
                  {timeout.rightRemaining > 0 ? (
                    <Text style={{ fontSize: 18 }}>
                      <Ionicons name="timer-outline" size={40} />
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, color: '#ef4444' }}>Hết</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.btnModal, styles.btnModalSecondary]} onPress={onClose}>
              <Text style={[styles.btnModalText, styles.btnModalTextSecondary]}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
