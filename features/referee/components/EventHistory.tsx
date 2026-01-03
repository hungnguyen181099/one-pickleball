import React from 'react';

import { EventLogItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';

interface EventHistoryProps {
  eventLog: EventLogItem[];
  onClear: () => void;
  isLandscape?: boolean;
}

export const EventHistory: React.FC<EventHistoryProps> = ({ eventLog, onClear, isLandscape }) => {
  return (
    <View style={styles.controlCard}>
      <View style={styles.controlCardHeader}>
        <Text style={styles.controlCardTitleText}>
          <Ionicons name="time-outline" size={14} /> Lịch sử trận đấu
        </Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.historyClear}>Xoá tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.controlCardBody, isLandscape && styles.landscapeControlCardBody]}>

        {eventLog.map((event, index) => (
          <View key={index} style={[styles.historyItem, isLandscape && styles.landscapeHistoryItem]}>
            <Text style={styles.historyTime}>{event.time}</Text>
            <Text style={styles.historyEvent}>{event.message}</Text>
            <Text style={styles.historyScore}>{event.score}</Text>
          </View>
        ))}
        {eventLog.length === 0 && <Text style={styles.historyEvent}>Chưa có sự kiện nào</Text>}

      </View>
    </View>
  );
};
