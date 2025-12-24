import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import MyTournamentCard from '@/components/MyTournamentCard';
import { styles } from '@/constants/styles/tournament.styles';
import { useThemedColors } from '@/hooks/use-theme';
import tournamentService from '@/services/api/tournament.service';
import { registration } from '@/types';
import { CardSkeleton } from '@/components/ui/Skeleton';

type FilterType = 'all' | 'pending' | 'approved' | 'completed' | 'cancelled';

export default function MyTournamentScreen() {
  const colors = useThemedColors();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['getUserTournaments'],
    queryFn: () => tournamentService.getUserTournament(),
  });

  const registrations = data?.data || [];

  const filteredTournaments = registrations.filter((reg: registration) => {
    if (activeFilter === 'all') return true;

    // Simple mapping for now, assuming status values match FilterType or similar
    const status = reg.status.toLowerCase();

    if (activeFilter === 'completed') {
      // Logic for completed: maybe based on tournament end date?
      const endDate = new Date(reg.tournament.end_date);
      return endDate < new Date();
    }

    return status === activeFilter;
  });

  const getFilterLabel = (filter: FilterType) => {
    switch (filter) {
      case 'all': return 'Tất cả';
      case 'pending': return 'Chờ duyệt';
      case 'approved': return 'Đã xác nhận';
      case 'completed': return 'Đã tham gia';
      case 'cancelled': return 'Đã hủy';
      default: return '';
    }
  };

  const filters: FilterType[] = ['all', 'pending', 'approved', 'completed', 'cancelled'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border, paddingTop: 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Giải đấu của tôi</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.chip,
                {
                  backgroundColor: activeFilter === filter ? colors.tint : colors.backgroundTertiary,
                  borderColor: activeFilter === filter ? colors.tint : colors.border,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={activeFilter === filter ? styles.IsCategoryChipText : styles.categoryChipText}>
                {getFilterLabel(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <FlatList
          data={filteredTournaments}
          renderItem={({ item }) => <MyTournamentCard {...item} />}
          keyExtractor={(item) => item.registration_id.toString()}
          contentContainerStyle={[styles.scrollContent, ]}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Ionicons name="documents-outline" size={48} color={colors.textTertiary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Không tìm thấy giải đấu nào</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
