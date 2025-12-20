import React, { useState } from 'react';

import { HomeEventCard, HomeNewsItem, HomeStatCardProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ActionCard, EventCardComponent, NewsItemComponent, StatCard } from '@/components/home';
import { Grid, GridItem } from '@/components/ui/Grid';

import { styles } from '@/constants/styles/home.styles';

import { useSession } from '@/contexts/AuthProvider';

import { useThemedColors } from '@/hooks/use-theme';

const getInitials = (name?: string) => {
  if (!name) return 'MT';
  const names = name.trim().split(' ');
  if (names.length === 0) return 'MT';
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colors = useThemedColors();
  const { user } = useSession();

  const statCards: HomeStatCardProps[] = [
    {
      id: '1',
      icon: 'account',
      number: '24',
      label: 'Trận đấu',
      color: '#00D9B5',
    },
    {
      id: '2',
      icon: 'star',
      number: '68%',
      label: 'Tỷ lệ thắng',
      color: '#FF9800',
    },
    {
      id: '3',
      icon: 'trophy',
      number: '#42',
      label: 'Xếp hạng',
      color: '#2196F3',
    },
  ];

  const events: HomeEventCard[] = [
    {
      id: '1',
      title: 'HCM Open 2025',
      date: '15-17 Dec, 2025',
      location: 'Sân Rạch Chiếc, Q2',
      image: 'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
      badge: 'Nổi bật',
      meta: '500tr',
    },
    {
      id: '2',
      title: 'Social Play Q1',
      date: '20 Nov, 18:00',
      location: 'Sân Landmark 81',
      image: 'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
      meta: '12/16',
    },
  ];

  const news: HomeNewsItem[] = [
    {
      id: '1',
      category: 'Kỹ thuật',
      title: '5 Tips nâng cao kỹ thuật serve',
      time: '2 giờ trước',
      readTime: '3 phút đọc',
      image: '#E8F5E9',
      categoryColor: '#4CAF50',
    },
    {
      id: '2',
      category: 'Cộng đồng',
      title: 'Chuyện của các tay vợt huyền thoại',
      time: '5 giờ trước',
      readTime: '5 phút đọc',
      image: '#E3F2FD',
      categoryColor: '#2196F3',
    },
    {
      id: '3',
      category: 'Giải đấu',
      title: 'Kết quả Vietnam Open Championship',
      time: '1 ngày trước',
      readTime: '4 phút đọc',
      image: '#FFF3E0',
      categoryColor: '#FF9800',
    },
  ];

  const handleSearch = () => {};

  const handleActionPress = (action: string) => {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingText, { color: colors.textTertiary }]}>Xin chào,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.navigate('/notification')}
              style={[styles.notificationBtn, { backgroundColor: colors.backgroundTertiary }]}
            >
              <Ionicons name="notifications-outline" size={24} color={colors.icon} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarBtn}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: colors.input }]}>
            <Ionicons name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Tìm sân, giải đấu, người chơi..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <Grid columns={3} gap={8} style={styles.statsContainer}>
          {statCards.map((item) => (
            <GridItem key={item.id}>
              <StatCard item={item} />
            </GridItem>
          ))}
        </Grid>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Hành động nhanh</Text>

          <Grid columns={2} gap={8}>
            <GridItem>
              <ActionCard icon="grid" label="Test" color="#00D9B5" onPress={() => router.push('/test')} />
            </GridItem>

            <GridItem>
              <ActionCard
                icon="grid"
                label="Bảng xếp hạng OCR"
                color="#00D9B5"
                onPress={() => router.push('/leaderboard/ocr')}
              />
            </GridItem>
            <GridItem>
              <ActionCard
                icon="grid"
                label="Bảng xếp hạng OPRS"
                color="#2196F3"
                onPress={() => router.push('/leaderboard/oprs')}
              />
            </GridItem>
            <GridItem>
              <ActionCard
                icon="star"
                label="Giải đấu"
                color="#FF9800"
                onPress={() => handleActionPress('tournament')}
              />
            </GridItem>
            <GridItem>
              <ActionCard
                icon="people"
                label="Tìm đối thủ"
                color="#E91E63"
                onPress={() => handleActionPress('find-opponent')}
              />
            </GridItem>
          </Grid>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sự kiện sắp tới</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={events}
            renderItem={({ item }) => <EventCardComponent item={item} />}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Tin tức mới</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={news}
              renderItem={({ item }) => <NewsItemComponent item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
