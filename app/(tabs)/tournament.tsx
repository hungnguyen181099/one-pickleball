import { MyTournamentItem, Tournament, TournamentDetailed, TournamentFilterType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';

import tournamentService from '@/services/api/tournament.service';
import { formatCurrency } from '@/utils/format.utils';
import { useQuery } from '@tanstack/react-query';
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from '@/constants/styles/tournament.styles';
import { useThemedColors } from '@/hooks/use-theme';

export default function TournamentScreen() {
    const colors = useThemedColors();
    const [activeFilter, setActiveFilter] = useState<TournamentFilterType>('open');
    const { isPending, error, data } = useQuery({
        queryKey: ['getTournaments'],
        queryFn: () => tournamentService.getTournaments()
    })

    console.log(data?.data);

    if (isPending) return <Text>loading...</Text>


  const featuredTournament: TournamentDetailed = {
    id: 'featured-1',
    title: 'HCM Pickleball Open 2025',
    date: '15-17 Tháng 12, 2025',
    location: 'Sân Rạch Chiếc, Q2',
    prize: '500tr',
    registered: 128,
    maxParticipants: 256,
    status: 'open',
    image:
      'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
    gradient: ['#00D9B5', '#0099CC'],
  };

  const tournaments: TournamentDetailed[] = [
    {
      id: '1',
      title: 'Vietnam Open Championship',
      date: '20-22 Th12',
      location: 'Landmark 81',
      prize: '300 triệu',
      registered: 64,
      maxParticipants: 128,
      status: 'open',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      gradient: ['#667eea', '#764ba2'],
    },
    {
      id: '2',
      title: 'Hanoi Master Series',
      date: '28-30 Th12',
      location: 'Mỹ Đình, Hà Nội',
      prize: '200 triệu',
      registered: 48,
      maxParticipants: 96,
      status: 'open',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      id: '3',
      title: 'Danang Coastal Cup',
      date: '05-07 Th01/2026',
      location: 'Đà Nẵng',
      prize: '150 triệu',
      registered: 32,
      maxParticipants: 64,
      status: 'upcoming',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      id: '4',
      title: 'Vung Tau Beach Open',
      date: '12-14 Th01/2026',
      location: 'Vũng Tàu',
      prize: '100 triệu',
      registered: 24,
      maxParticipants: 48,
      status: 'upcoming',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      gradient: ['#fa709a', '#fee140'],
    },
  ];

  const myTournaments: MyTournamentItem[] = [
    {
      id: '1',
      title: 'HCM Open 2025',
      status: 'Đã đăng ký • Nam Đơn',
      date: '15 Th12',
      type: 'registered',
    },
    {
      id: '2',
      title: 'Vietnam Cup 2024',
      status: 'Hạng 3 • Đôi Nam',
      date: '20 Th10',
      type: 'completed',
    },
  ];

    const getStatusText = (status: boolean) => {
        return status ? 'Mở' : 'Đã đóng'
    };

    const getStatusColor = (status: boolean) => {
        return status ? '#00D9B5' : '#999'
    };

  const handle = (id: string) => {
    router.push({
      pathname: '/(details)/eventDetail/[id]',
      params: { id: id },
    });
  };

  const filteredTournaments =
    activeFilter === 'all' ? tournaments : tournaments.filter((t) => t.status === activeFilter);

  const FilterChip = ({ label, value, icon }: { label: string; value: TournamentFilterType; icon: string }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: activeFilter === value ? colors.tint : colors.backgroundTertiary,
          borderColor: activeFilter === value ? colors.tint : colors.border,
        },
      ]}
      onPress={() => setActiveFilter(value)}
    >
      <Ionicons name={icon as any} size={16} color={activeFilter === value ? '#fff' : colors.icon} />
      <Text style={[styles.filterChipText, { color: activeFilter === value ? '#fff' : colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

    const FeaturedTournamentCard = ({ tournament }: { tournament: Tournament }) => (
        <View style={styles.featuredCard}>
            <View style={[styles.featuredCardInner, { backgroundColor: colors.card }]}>
                <View style={styles.featuredImageContainer}>
                    <Image
                        source={{ uri: tournament.imageUrl }}
                        style={styles.featuredImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.featuredGradient}
                    />
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredBadgeText}>🏆 Giải lớn nhất năm</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteBtn}>
                        <Ionicons name="heart-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.featuredContent}>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(tournament.status)}` }]}>
                        <Text style={[styles.statusBadgeText, { color: getStatusColor(tournament.status) }]}>
                            Đang mở đăng ký
                        </Text>
                    </View>

                    <Text style={[styles.featuredTitle, { color: colors.text }]}>
                        {tournament.name}
                    </Text>
                    <Text style={[styles.featuredDesc, { color: colors.textSecondary }]}>
                        Giải đấu mở rộng quy mô lớn nhất năm với tổng giá trị giải thưởng 500 triệu đồng
                    </Text>

                    <View style={styles.featuredMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={16} color={colors.icon} />
                            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                                {tournament.start_date}
                            </Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="location-outline" size={16} color={colors.icon} />
                            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                                {tournament.location}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featuredStats}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Đã đăng ký</Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {/* {tournament.registered}/{tournament.maxParticipants} */}
                            </Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Giải thưởng</Text>
                            <Text style={[styles.statValue, styles.prizeValue]}>{tournament.prizes && formatCurrency(tournament.prizes)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => handle(tournament.id.toString())} style={styles.registerBtn}>
                        <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const TournamentCompactCard = ({ tournament }: { tournament: Tournament }) => (
        <TouchableOpacity onPress={() => handle(tournament.id.toString())} style={[styles.compactCardInner, { backgroundColor: colors.card }]}>
            <View style={styles.compactImageContainer}>
                <Image
                    source={{ uri: tournament.imageUrl }}
                    style={styles.compactImage}
                    resizeMode="cover"
                />
                <View style={[styles.compactStatus, { backgroundColor: getStatusColor(tournament.status) }]}>
                    <Text style={styles.compactStatusText}>{getStatusText(tournament.status)}</Text>
                </View>
            </View>

            <View style={styles.compactContent}>
                <Text style={[styles.compactTitle, { color: colors.text }]} numberOfLines={2}>
                    {tournament.name}
                </Text>
                <View style={styles.compactMeta}>
                    <Ionicons name="calendar-outline" size={14} color={colors.icon} />
                    <Text style={[styles.compactMetaText, { color: colors.textSecondary }]}>
                        {tournament.start_date}
                    </Text>
                </View>
                <View style={styles.compactMeta}>
                    <Ionicons name="location-outline" size={14} color={colors.icon} />
                    <Text style={[styles.compactMetaText, { color: colors.textSecondary }]}>
                        {tournament.location}
                    </Text>
                </View>
                <View style={styles.compactPrize}>
                    <Text style={styles.compactPrizeText}>{tournament.prizes && formatCurrency(tournament.prizes)}</Text>
                </View>
            </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  const MyTournamentCard = ({ tournament }: { tournament: MyTournamentItem }) => (
    <TouchableOpacity style={[styles.myTournamentCard, { backgroundColor: colors.card }]}>
      <View
        style={[
          styles.myTournamentIcon,
          {
            backgroundColor: tournament.type === 'registered' ? `${colors.tint}20` : '#FFD70020',
          },
        ]}
      >
        <Ionicons
          name={tournament.type === 'registered' ? 'checkmark-circle' : 'star'}
          size={24}
          color={tournament.type === 'registered' ? colors.tint : '#FFD700'}
        />
      </View>
      <View style={styles.myTournamentInfo}>
        <Text style={[styles.myTournamentTitle, { color: colors.text }]}>{tournament.title}</Text>
        <Text style={[styles.myTournamentStatus, { color: colors.textSecondary }]}>{tournament.status}</Text>
      </View>
      <Text style={[styles.myTournamentDate, { color: colors.textTertiary }]}>{tournament.date}</Text>
    </TouchableOpacity>
  );

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
          <FilterChip label="Đang mở" value="open" icon="time-outline" />
          <FilterChip label="Sắp diễn ra" value="upcoming" icon="calendar-outline" />
          <FilterChip label="Đã kết thúc" value="closed" icon="checkmark-circle-outline" />
          <FilterChip label="Bộ lọc" value="all" icon="options-outline" />
        </ScrollView>
      </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Giải đấu nổi bật
                    </Text>
                    {/* <FeaturedTournamentCard tournament={featuredTournament} /> */}
                </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sắp diễn ra</Text>
            <Text style={styles.resultsBadgeText}>{filteredTournaments.length} giải đấu</Text>
          </View>

                    <FlatList
                        data={data?.data || []}
                        renderItem={({ item }) => <TournamentCompactCard tournament={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={styles.tournamentsList}
                        ListEmptyComponent={<Text style={styles.emptyText}>Không có giải đấu</Text>}
                    />
                </View>

        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Giải đấu của tôi</Text>
            <TouchableOpacity onPress={() => router.push('/mytournament')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={myTournaments}
            renderItem={({ item }) => <MyTournamentCard tournament={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.tournamentsList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
