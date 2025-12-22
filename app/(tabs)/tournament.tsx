import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import TournamentCard from '@/components/TournamentCard';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { styles } from '@/constants/styles/tournament.styles';
import { AppColors, Radius } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import tournamentService from '@/services/api/tournament.service';

type TournamentStatus = 'ongoing' | 'upcoming' | 'completed';

type Status = {
  label: string;
  value: TournamentStatus | undefined; // undefined for "All"
};

const statuses: Status[] = [
  {
    label: 'Tất cả',
    value: undefined,
  },
  {
    label: 'Sắp diễn ra',
    value: 'upcoming',
  },
  {
    label: 'Đang nhận đăng ký',
    value: 'ongoing',
  },
  {
    label: 'Đã hoàn thành',
    value: 'completed',
  },
];

const TournamentList = ({ status }: { status: TournamentStatus | undefined }) => {
  const [page, setPage] = useState(1);
  // Reset page when status changes
  React.useEffect(() => {
    setPage(1);
  }, [status]);

  const { data, status: queryStatus } = useQuery({
    queryKey: ['getTournaments', status, page],
    queryFn: () =>
      tournamentService.getTournaments({
        status: status, // undefined will fetch all
        page: page,
      }),
  });

  if (queryStatus === 'pending') {
    return (
      <View style={{ gap: 16 }}>
        <CardSkeleton />
        <CardSkeleton />
      </View>
    );
  }

  if (queryStatus === 'error') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#64748b' }}>Không thể tải danh sách giải đấu</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data?.data || []}
      renderItem={({ item }) => <TournamentCard tournament={item} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', padding: 32 }}>
          <Text style={{ color: '#94a3b8' }}>Không có giải đấu nào</Text>
        </View>
      }
      ListFooterComponent={
        data?.data && data.data.length > 0 ? (
          <Pagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.last_page}
            onPageChange={setPage}
          />
        ) : null
      }
    />
  );
};

export default function TournamentScreen() {
  const [status, setStatus] = useState<TournamentStatus | undefined>(undefined);
  const colors = useThemedColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Giải đấu</Text>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.searchBtn}>
          <Ionicons name="search" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 4, paddingBottom: 4 }}
            style={{ marginHorizontal: -4 }} // Offset padding
          >
            {statuses.map((item, index) => {
              const isActive = status === item.value;
              return (
                <Pressable
                  key={index}
                  onPress={() => setStatus(item.value)}
                  style={({ pressed }) => [
                    {
                      height: 36,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      borderRadius: Radius.full,
                      backgroundColor: isActive ? AppColors.primary : colors.card,
                      borderWidth: 1,
                      borderColor: isActive ? AppColors.primary : colors.border,
                      transform: [{ scale: pressed ? 0.95 : 1 }]
                    }
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: isActive ? 'white' : colors.textSecondary
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ gap: 16 }}>
          <TournamentList status={status} />
        </View>

      </ScrollView>
    </View>
  );
}
