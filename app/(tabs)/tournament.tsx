import React, { useState } from 'react';

import { Tournament } from '@/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/tournament.styles';

import { useThemedColors } from '@/hooks/use-theme';

import tournamentService from '@/services/api/tournament.service';

import { formatDate, isStartDateAfterDeadline } from '@/utils/date.utils';
import { formatCurrency } from '@/utils/format.utils';
import { Image } from 'expo-image';
import MyTournamentCard from '@/components/MyTournamentCard';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';

type TournamentStatus = 'ongoing' | 'upcoming' | 'completed';

type Status = {
  label: string;
  value: TournamentStatus;
  iconName: keyof typeof MaterialIcons.glyphMap;
};

const statuses: Status[] = [
  {
    label: 'Đang diễn ra',
    value: 'ongoing',
    iconName: 'access-time',
  },
  {
    label: 'Sắp tới',
    value: 'upcoming',
    iconName: 'access-time',
  },
  {
    label: 'Đã kết thúc',
    value: 'completed',
    iconName: 'access-time',
  },
];

const TournamentCompactCard = (tournament: Tournament) => {
  const isExpired = isStartDateAfterDeadline(tournament.registration_deadline)
  const colors = useThemedColors();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/(details)/eventDetail/[id]',
          params: { id: tournament.id },
        });
      }}
      style={[styles.compactCardInner, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={styles.compactImageContainer}>
        <Image
          source={tournament.image_url
            || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHqgofysjHdgAUpsjEPcJlPdDmodG5SRaLIA&s'
          }
          style={styles.compactImage}
          contentFit='cover'
        />
        <View style={[styles.compactStatus, { backgroundColor: isExpired ? '#999' : '#00D9B5' }]}>
          <Text style={styles.compactStatusText}>{isExpired ? 'Đã đóng' : 'Mở'}</Text>
        </View>
      </View>

      <View style={styles.compactContent}>
        <Text style={[styles.compactTitle, { color: colors.text }]} numberOfLines={2}>
          {tournament.name}
        </Text>
        <View style={styles.compactMeta}>
          <Ionicons name="calendar-outline" size={14} color={colors.icon} />
          <Text style={[styles.compactMetaText, { color: colors.textSecondary }]}>
            {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
          </Text>
        </View>
        <View style={styles.compactMeta}>
          <Ionicons name="location-outline" size={14} color={colors.icon} />
          <Text style={[styles.compactMetaText, { color: colors.textSecondary }]}>{tournament.location}</Text>
        </View>
        <View style={styles.compactPrize}>
          <Text style={styles.compactPrizeText}>{tournament.prizes && formatCurrency(tournament.prizes)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TournamentList = ({ status }: { status: TournamentStatus }) => {
  const [page, setPage] = useState(1)
  const { data, status: queryStatus } = useQuery({
    queryKey: ['getTournaments', status, page],
    queryFn: () =>
      tournamentService.getTournaments({
        status,
        page: page
      }),
  });

  if (queryStatus === 'pending') return <CardSkeleton />;

  if (queryStatus === 'error') return null;

  return (
    <FlatList
      data={data?.data || []}
      renderItem={({ item }) => <TournamentCompactCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      contentContainerStyle={styles.tournamentsList}
      ListEmptyComponent={<Text style={styles.emptyText}>Không có giải đấu</Text>}
      ListFooterComponent={data?.data ? <Pagination currentPage={data.meta.current_page} totalPages={data.meta.last_page} onPageChange={setPage} /> : null}
    />
  );
};



const MyTournamentList = () => {
  const colors = useThemedColors();
  const { data, status: queryStatus } = useQuery({
    queryKey: ['getUserTournament'],
    queryFn: () => tournamentService.getUserTournament(),
  });

  if (queryStatus === 'pending') return  <CardSkeleton />;

  if (queryStatus === 'error') return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Giải đấu của tôi</Text>
        <TouchableOpacity onPress={() => router.push('/mytournament')}>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.data}
        renderItem={({ item }) => <MyTournamentCard {...item} />}
        keyExtractor={(item) => item.registration_id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.tournamentsList}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có giải đấu đã đăng ký</Text>}
      />
    </View>
  );
};

export default function TournamentScreen() {
  const [status, setStatus] = useState<TournamentStatus>('ongoing');
  const colors = useThemedColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Giải đấu</Text>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.searchBtn}>
          <Ionicons name="search" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.filterBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {statuses.map((item, index) => {
            const isActive = status === item.value;
            return (
              <Pressable
                key={index}
                onPress={() => setStatus(item.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? colors.tint : colors.backgroundTertiary,
                    borderColor: isActive ? colors.tint : colors.border,
                  },
                ]}
              >
                <MaterialIcons color={isActive ? "#fff" : colors.icon} name={item.iconName} size={16} />
                <Text
                  style={
                    isActive ? styles.IsCategoryChipText : styles.categoryChipText
                  }>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <TournamentList status={status} />
        </View>

        <MyTournamentList />
      </ScrollView>
    </View>
  );
}
