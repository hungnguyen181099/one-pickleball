import { styles } from '@/assets/styles/home.styles';
import { ActionCard, EventCardComponent, NewsItemComponent, StatCard } from '@/components/home';
import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export interface StatCardProps {
  id: string;
  icon: string;
  number: string;
  label: string;
  color: string;
}

export interface EventCard {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  badge?: string;
  meta: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  time: string;
  readTime: string;
  image: string;
  categoryColor: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const colors = useThemedColors();

  const statCards: StatCardProps[] = [
    { id: '1', icon: 'account', number: '24', label: 'Trận đấu', color: '#00D9B5' },
    { id: '2', icon: 'star', number: '68%', label: 'Tỷ lệ thắng', color: '#FF9800' },
    { id: '3', icon: 'trophy', number: '#42', label: 'Xếp hạng', color: '#2196F3' },
  ];

  const events: EventCard[] = [
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

  const news: NewsItem[] = [
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

  const handleSearch = () => {

  };

  const handleActionPress = (action: string) => {

  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingText, { color: colors.textTertiary }]}>Xin chào,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>Minh Tuấn</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: colors.backgroundTertiary }]}>
              <Ionicons name="notifications-outline" size={24} color={colors.icon} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarBtn}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MT</Text>
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

        <View style={styles.statsContainer}>
          {statCards.map(item => (
            <StatCard key={item.id} item={item} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Hành động nhanh</Text>
          <View style={styles.actionGrid}>
            <ActionCard
              icon="grid"
              label="Tìm sân"
              color="#00D9B5"
              onPress={() => handleActionPress('find-court')}
            />
            <ActionCard
              icon="star"
              label="Giải đấu"
              color="#FF9800"
              onPress={() => handleActionPress('tournament')}
            />
            <ActionCard
              icon="timer"
              label="Social Play"
              color="#2196F3"
              onPress={() => handleActionPress('social-play')}
            />
            <ActionCard
              icon="people"
              label="Tìm đối thủ"
              color="#E91E63"
              onPress={() => handleActionPress('find-opponent')}
            />
          </View>
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
    </SafeAreaView>
  );
}

