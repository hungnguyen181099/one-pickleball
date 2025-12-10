import React, { useState } from 'react';

import { MyTournamentFilterType, MyTournamentItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/tournament.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function MyTournamentScreen() {
  const colors = useThemedColors();
  const [activeFilter, setActiveFilter] = useState<MyTournamentFilterType>('all');

  const myTournaments: MyTournamentItem[] = [
    {
      id: '1',
      title: 'HCM Open 2025',
      status: 'Đã đăng ký • Nam Đơn',
      date: '15 Th12, 2025',
      type: 'registered',
    },
    {
      id: '2',
      title: 'Vietnam Cup 2024',
      status: 'Hoàn thành • Đôi Nam',
      date: '20 Th10, 2024',
      type: 'completed',
      result: 'Hạng 3',
    },
    {
      id: '3',
      title: 'Summer Pickleball 2024',
      status: 'Hoàn thành • Đôi Nam Nữ',
      date: '15 Th06, 2024',
      type: 'completed',
      result: 'Vô địch',
    },
    {
      id: '4',
      title: 'Winter League 2023',
      status: 'Đã hủy • Đơn Nữ',
      date: '10 Th12, 2023',
      type: 'cancelled',
    },
  ];

  const filteredTournaments =
    activeFilter === 'all' ? myTournaments : myTournaments.filter((t) => t.type === activeFilter);

  const getFilterLabel = (filter: MyTournamentFilterType) => {
    switch (filter) {
      case 'all':
        return 'Tất cả';
      case 'registered':
        return 'Đã đăng ký';
      case 'completed':
        return 'Đã tham gia';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return '';
    }
  };

  const MyTournamentCard = ({ tournament }: { tournament: MyTournamentItem }) => {
    let iconName: any = 'star';
    let iconColor = '#FFD700';
    let bgColor = '#FFD70020';

    if (tournament.type === 'registered') {
      iconName = 'checkmark-circle';
      iconColor = colors.tint;
      bgColor = `${colors.tint}20`;
    } else if (tournament.type === 'cancelled') {
      iconName = 'close-circle';
      iconColor = colors.error;
      bgColor = `${colors.error}20`;
    } else if (tournament.type === 'completed') {
      iconName = 'trophy';
      iconColor = '#FFD700';
      bgColor = '#FFD70020';
    }

    return (
      <TouchableOpacity style={[styles.myTournamentCard, { backgroundColor: colors.card, marginBottom: 12 }]}>
        <View
          style={[
            styles.myTournamentIcon,
            {
              backgroundColor: bgColor,
            },
          ]}
        >
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.myTournamentInfo}>
          <Text style={[styles.myTournamentTitle, { color: colors.text }]}>{tournament.title}</Text>
          <Text style={[styles.myTournamentStatus, { color: colors.textSecondary }]}>{tournament.status}</Text>
          {tournament.result && (
            <Text style={{ color: colors.tint, fontSize: 12, fontWeight: '600', marginTop: 2 }}>
              {tournament.result}
            </Text>
          )}
        </View>
        <Text style={[styles.myTournamentDate, { color: colors.textTertiary }]}>{tournament.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Giải đấu của tôi</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {(['all', 'registered', 'completed', 'cancelled'] as MyTournamentFilterType[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor: activeFilter === filter ? colors.tint : colors.backgroundTertiary,
                  borderColor: activeFilter === filter ? colors.tint : colors.border,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterChipText, { color: activeFilter === filter ? '#fff' : colors.text }]}>
                {getFilterLabel(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={filteredTournaments}
        renderItem={({ item }) => <MyTournamentCard tournament={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.scrollContent, { padding: 16 }]}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="documents-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Không tìm thấy giải đấu nào</Text>
          </View>
        }
      />
    </View>
  );
}
