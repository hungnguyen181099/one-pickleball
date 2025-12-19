import React, { useState } from 'react';

import { NewsCategory } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/news.styles';

import NewsCard from '@/components/NewsCard';
import { Pagination } from '@/components/ui/Pagination';
import { AppColors } from '@/constants/theme';
import { useDebounce } from '@/hooks/use-debounce';
import { useThemedColors } from '@/hooks/use-theme';
import newService from '@/services/api/new.service';
import { useQuery } from '@tanstack/react-query';
import { DebouncedSearch } from '@/components/common/DebouncedSearch';
import { CardSkeleton } from '@/components/ui/Skeleton';

const categories: NewsCategory[] = [
  { id: 'all', name: 'Tất cả', icon: 'home', color: '#00D9B5' },
  { id: 'technique', name: 'Kỹ thuật', icon: 'school', color: '#FF9800' },
  { id: 'community', name: 'Cộng đồng', icon: 'account-multiple', color: '#2196F3' },
  { id: 'tournament', name: 'Giải đấu', icon: 'trophy', color: '#E91E63' },
  { id: 'lifestyle', name: 'Lối sống', icon: 'heart', color: '#9C27B0' },
];

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const colors = useThemedColors();
  const [page, setPage] = useState<number>(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: ['getNews', page, debouncedSearchQuery],
    queryFn: () => newService.getNews({
      page: page,
      search: debouncedSearchQuery
    })
  })

  const CategoryChip = ({ item }: { item: NewsCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        activeCategory === item.id && styles.categoryChipActive,
        {
          backgroundColor: activeCategory === item.id ? item.color : colors.backgroundTertiary,
          borderColor: activeCategory === item.id ? item.color : colors.border,
          borderWidth: 1,
        },
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={16}
        color={activeCategory === item.id ? '#fff' : item.color}
      />
      <Text
        style={[
          styles.categoryChipText,
          activeCategory === item.id && styles.categoryChipTextActive,
          { color: activeCategory === item.id ? '#fff' : colors.text },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tin tức & Sự kiện</Text>
        <TouchableOpacity
          onPress={() => router.navigate('/notification')}
          style={[styles.notificationBtn, { backgroundColor: colors.backgroundTertiary }]}
        >
          <Ionicons name="notifications-outline" size={24} color={colors.icon} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <DebouncedSearch onDebouncedChange={(text) => {
          setSearchQuery(text);
          setPage(1);
        }} 
        variant='filled'
        placeholder='Tìm kiếm ...'
        />
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => (
            <CategoryChip key={category.id} item={category} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data?.data}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => <NewsCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <CardSkeleton />
        }
        ListFooterComponent={
          data?.data ? <Pagination currentPage={Number(data?.meta.current_page)} totalPages={Number(data?.meta.last_page)} onPageChange={setPage} /> : null
        }
      />
    </View>
  );
};

export default NewsPage;
