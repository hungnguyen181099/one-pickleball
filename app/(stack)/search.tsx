import React, { useEffect, useState } from 'react';

import { SearchResult } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import qs from 'qs';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/constants/styles/search.styles';
import { AppColors } from '@/constants/theme';

import { stadiumAPI } from '@/features/stadiums/shared/api/stadium.api';

import { useDebounce } from '@/hooks/use-debounce';
import { useThemedColors } from '@/hooks/use-theme';

import newService from '@/services/api/new.service';
import tournamentService from '@/services/api/tournament.service';

export default function SearchScreen() {
  const colors = useThemedColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'court' | 'event' | 'news' | 'player'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'court', label: 'Sân' },
    { key: 'event', label: 'Sự kiện' },
    { key: 'news', label: 'Tin tức' },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'court':
        return 'SÂN';
      case 'event':
        return 'SỰ KIỆN';
      case 'news':
        return 'TIN TỨC';
      case 'player':
        return 'CẦU THỦ';
      default:
        return type.toUpperCase();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'court':
        return '#00D9B5';
      case 'event':
        return '#FFB800';
      case 'news':
        return '#FF9800';
      case 'player':
        return '#2196F3';
      default:
        return colors.textTertiary;
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const promises = [];

        // Fetch Stadiums
        if (activeFilter === 'all' || activeFilter === 'court') {
          const query = qs.stringify({ search: debouncedSearchQuery });
          promises.push(
            stadiumAPI.getAll(query).then((res) =>
              res.data.map((item) => ({
                id: String(item.id),
                type: 'court',
                title: item.name,
                description: item.address,
                image: item.image || '#00D9B5', // Fallback color/image
                meta: {
                  location: item.province?.name,
                  rating: item.rating,
                  // Price not available in list response
                  price: '',
                  views: item.rating_count,
                },
              }))
            )
          );
        }

        // Fetch Tournaments
        if (activeFilter === 'all' || activeFilter === 'event') {
          promises.push(
            tournamentService.getTournaments({ search: debouncedSearchQuery }).then((res) =>
              res.data.map((item) => ({
                id: String(item.id),
                type: 'event',
                title: item.name,
                description: item.location,
                image: item.image_url || '#FFB800',
                meta: {
                  date: item.start_date,
                  location: item.location,
                },
              }))
            )
          );
        }

        // Fetch News
        if (activeFilter === 'all' || activeFilter === 'news') {
          promises.push(
            newService.getNews({ search: debouncedSearchQuery }).then((res) =>
              res.data.map((item) => ({
                id: String(item.id),
                type: 'news',
                title: item.title,
                description: item.content.substring(0, 100).replace(/<[^>]*>?/gm, ''), // Simple strip tags
                image: item.image || '#FF9800',
                meta: {
                  date: item.created_at,
                  views: item.views,
                },
              }))
            )
          );
        }

        const resultsArray = await Promise.all(promises);
        const combinedResults = resultsArray.flat() as SearchResult[];
        setResults(combinedResults);
      } catch (error) {
        console.error('Search error:', error);
        // Handle error gracefully?
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearchQuery, activeFilter]);

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={[styles.resultItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      activeOpacity={0.7}
      onPress={() => {
        if (item.type === 'court') {
          router.push({ pathname: '/stadiums/[stadiumId]', params: { stadiumId: item.id } });
        } else if (item.type === 'event') {
          router.push({ pathname: '/(details)/eventDetail/[id]', params: { id: item.id } });
        } else if (item.type === 'news') {
          router.push({ pathname: '/(details)/newDetail/[id]', params: { id: item.id } });
        }
      }}
    >
      <Image source={item.image} style={styles.resultImage} />

      <View style={styles.resultContent}>
        <Text style={[styles.resultType, { color: getTypeColor(item.type) }]}>{getTypeLabel(item.type)}</Text>
        <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.resultDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.resultMeta}>
          {!!item.meta?.location && (
            <View style={styles.metaItem}>
              <Ionicons name="location" size={12} color={colors.textTertiary} />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>{item.meta.location}</Text>
            </View>
          )}
          {!!item.meta?.rating && (
            <View style={styles.metaItem}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>{item.meta.rating}</Text>
            </View>
          )}
          {!!item.meta?.price && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>{item.meta.price}</Text>
            </View>
          )}
          {!!item.meta?.date && (
            <View style={styles.metaItem}>
              <Ionicons name="calendar" size={12} color={colors.textTertiary} />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>{item.meta.date}</Text>
            </View>
          )}
          {!!item.meta?.views && (
            <View style={styles.metaItem}>
              <Ionicons name="eye" size={12} color={colors.textTertiary} />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>{item.meta.views}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={{ paddingTop: 40 }}>
          <ActivityIndicator size="large" color={AppColors.primary} />
        </View>
      );
    }

    if (searchQuery.trim()) {
      return (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.backgroundTertiary }]}>
            <Ionicons name="search-outline" size={40} color={colors.textTertiary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Không tìm thấy kết quả</Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: colors.input, borderColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Tìm kiếm sân, sự kiện, tin tức..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                { borderColor: colors.border },
                activeFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.key as any)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: colors.text },
                  activeFilter === filter.key && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        contentContainerStyle={styles.resultsContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}
