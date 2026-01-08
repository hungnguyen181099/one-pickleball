import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';

import NewsCard from '@/components/NewsCard';
import { DebouncedSearch } from '@/components/common/DebouncedSearch';
import { Chip } from '@/components/ui/Chip';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';

import { styles } from '@/constants/styles/news.styles';

import { useDebounce } from '@/hooks/use-debounce';
import { useThemedColors } from '@/hooks/use-theme';

import { Text } from '@/components/ui/Text';
import newService from '@/services/api/new.service';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const colors = useThemedColors();
  const [page, setPage] = useState<number>(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: ['getNews', page, debouncedSearchQuery, activeCategory],
    queryFn: () =>
      newService.getNews({
        page: page,
        search: debouncedSearchQuery,
        category: activeCategory,
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ['newCategories'],
    queryFn: () => newService.getCategories(),
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text size='h2'>Tin tức & Sự kiện</Text>
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
        <DebouncedSearch
          onDebouncedChange={(text) => {
            setSearchQuery(text);
            setPage(1);
          }}
          variant="filled"
          placeholder="Tìm kiếm ..."
        />
      </View>

      <View style={[styles.categoriesWrapper, { borderColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          <Chip variant='outline' checked={'' === activeCategory} onPress={() => setActiveCategory('')} size="sm">
            {'Tất cả'}
          </Chip>
          {categories?.data.map((category) => (
            <Chip
              variant='outline'
              checked={category.id === Number(activeCategory)}
              onPress={() => {
                setActiveCategory(String(category.id))
                setPage(1)
              }}
              size="sm"
              key={category.id}
            >
              {category.name}
            </Chip>
          ))}
        </ScrollView>
      </View>
      {isPending ? (
        <CardSkeleton />
      ) : (
        <FlatList
          data={data?.data}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          renderItem={({ item }) => <NewsCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.backgroundTertiary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Ionicons name="newspaper-outline" size={40} color={colors.textTertiary} />
              </View>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                Không có tin tức nào
              </Text>
              <Text style={{ color: colors.textTertiary, fontSize: 14, textAlign: 'center', maxWidth: '80%' }}>
                Hiện tại chưa có bài viết nào trong danh mục này. Vui lòng quay lại sau.
              </Text>
            </View>
          }
          ListFooterComponent={
            data?.data.length ? (
              <Pagination
                currentPage={Number(data?.meta.current_page)}
                totalPages={Number(data?.meta.last_page)}
                onPageChange={setPage}
              />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default NewsPage;
