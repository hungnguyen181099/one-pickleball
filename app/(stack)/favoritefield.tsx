import React, { useState } from 'react';

import { FavoriteCourt, FavoriteCourtSortType } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/area.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function FavoriteFieldScreen() {
  const colors = useThemedColors();
  const [sortBy, setSortBy] = useState<FavoriteCourtSortType>('recent');
  const [favorites, setFavorites] = useState<FavoriteCourt[]>([
    {
      id: '1',
      name: 'Sân Pickleball Rạch Chiếc',
      rating: 4.9,
      reviews: 156,
      price: 250,
      location: 'Quận 2, TP.HCM',
      distance: 1.2,
      courts: 6,
      features: ['6 sân indoor', 'Có đèn', 'Có WC'],
      status: 'open',
      statusText: 'Đang mở • Đóng cửa lúc 23:00',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      isPremium: true,
      lastVisited: '2 ngày trước',
      totalBookings: 12,
    },
    {
      id: '2',
      name: 'Landmark 81 Sports Center',
      rating: 4.8,
      reviews: 203,
      price: 300,
      location: 'Bình Thạnh, TP.HCM',
      distance: 2.5,
      courts: 4,
      features: ['4 sân indoor', 'View đẹp', 'Cho thuê vợt'],
      status: 'open',
      statusText: 'Đang mở • Đóng cửa lúc 22:00',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      lastVisited: '1 tuần trước',
      totalBookings: 8,
    },
    {
      id: '3',
      name: 'Sân Thể Thao Thảo Điền',
      rating: 4.7,
      reviews: 89,
      price: 200,
      location: 'Quận 2, TP.HCM',
      distance: 3.8,
      courts: 3,
      features: ['3 sân outdoor', 'Bãi xe rộng'],
      status: 'busy',
      statusText: 'Gần hết chỗ • Còn 2 sân trống',
      image:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
      lastVisited: '3 tuần trước',
      totalBookings: 5,
    },
  ]);

  const sortOptions: { id: FavoriteCourtSortType; label: string; icon: string }[] = [
    { id: 'recent', label: 'Gần đây', icon: 'time' },
    { id: 'rating', label: 'Đánh giá', icon: 'star' },
    { id: 'distance', label: 'Khoảng cách', icon: 'location' },
    { id: 'price', label: 'Giá', icon: 'cash' },
  ];

  const getSortedFavorites = () => {
    const sorted = [...favorites];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'recent':
      default:
        return sorted;
    }
  };

  const removeFavorite = (courtId: string, courtName: string) => {
    Alert.alert('Xóa khỏi yêu thích', `Bạn có chắc chắn muốn xóa "${courtName}" khỏi danh sách yêu thích?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          setFavorites(favorites.filter((f) => f.id !== courtId));
        },
      },
    ]);
  };

  const handleBookCourt = (courtId: string) => {
    // router.push({
    //   pathname: '/(details)/courtDetail/[id]',
    //   params: { id: courtId },
    // });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#4CAF50';
      case 'busy':
        return '#FF9800';
      case 'closed':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const FavoriteCourtCard = ({ item }: { item: FavoriteCourt }) => (
    <View style={[styles.courtCard, { backgroundColor: colors.card }]}>
      {item.isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>Premium</Text>
        </View>
      )}

      <Image source={{ uri: item.image }} style={styles.courtImage} />

      <TouchableOpacity
        style={styles.favoriteBtn}
        onPress={() => removeFavorite(item.id, item.name)}
        activeOpacity={0.5}
      >
        <Ionicons name="heart" size={24} color="#FF4444" />
      </TouchableOpacity>

      <View style={styles.courtContent}>
        <View style={styles.courtHeader}>
          <View style={styles.courtInfo}>
            <Text style={[styles.courtName, { color: colors.text }]}>{item.name}</Text>
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={16} color="#FFB800" />
              <Text style={[styles.ratingScore, { color: colors.text }]}>{item.rating}</Text>
              <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>({item.reviews})</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceAmount}>{item.price}k</Text>
            <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>/giờ</Text>
          </View>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="location" size={16} color={colors.icon} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.location}</Text>
          <Text style={[styles.distance, { color: colors.textTertiary }]}>• {item.distance} km</Text>
        </View>

        {/* Favorite Stats */}
        {(item.lastVisited || item.totalBookings) && (
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, marginBottom: 8 }}>
            {item.lastVisited && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.lastVisited}</Text>
              </View>
            )}
            {item.totalBookings && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.totalBookings} lần đặt</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.features}>
          {item.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureTag, { backgroundColor: colors.backgroundTertiary }]}>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.status}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>{item.statusText}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.bookBtn,
            item.status === 'closed' && {
              ...styles.bookBtnOutline,
              backgroundColor: colors.card,
              borderColor: '#00D9B5',
            },
          ]}
          onPress={() => handleBookCourt(item.id)}
        >
          <Text style={[styles.bookBtnText, item.status === 'closed' && styles.bookBtnTextOutline]}>
            {item.status === 'closed' ? 'Xem chi tiết' : 'Đặt sân ngay'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={{ alignItems: 'center', marginTop: 80, paddingHorizontal: 40 }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.backgroundTertiary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Ionicons name="heart-outline" size={48} color={colors.textTertiary} />
      </View>
      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 }}>
        Chưa có sân yêu thích
      </Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>
        Thêm sân vào danh sách yêu thích để dễ dàng đặt sân lần sau
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.tint,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
        onPress={() => router.back()}
      >
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Khám phá sân</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Sân yêu thích</Text>
        <View style={{ width: 40 }} />
      </View>

      {favorites.length > 0 && (
        <>
          {/* Sort Options */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterBar}
            contentContainerStyle={styles.filterContent}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: sortBy === option.id ? '#00D9B5' : colors.backgroundTertiary,
                    borderColor: sortBy === option.id ? '#00D9B5' : colors.border,
                  },
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Ionicons name={option.icon as any} size={16} color={sortBy === option.id ? '#fff' : colors.icon} />
                <Text style={[styles.filterLabel, { color: sortBy === option.id ? '#fff' : colors.text }]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Count */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={[styles.resultCount, { color: colors.textSecondary }]}>
              <Text style={[styles.resultCountBold, { color: colors.text }]}>{favorites.length}</Text> sân yêu thích
            </Text>
          </View>
        </>
      )}

      {/* List */}
      <FlatList
        data={getSortedFavorites()}
        renderItem={({ item }) => <FavoriteCourtCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courtsList}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}
