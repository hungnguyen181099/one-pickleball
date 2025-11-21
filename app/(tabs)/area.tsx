
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/area.styles';
import { router } from 'expo-router';


export interface Court {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  distance: number;
  courts: number;
  features: string[];
  status: 'open' | 'busy' | 'closed';
  statusText: string;
  isFavorite: boolean;
  isPremium?: boolean;
  image: string;
  badgeColor?: string;
}

type FilterType = 'nearby' | 'open' | 'rated' | 'filter';

export const courts: Court[] = [
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
      isFavorite: false,
      isPremium: true,
      image: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
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
      isFavorite: false,
      isPremium: false,
      image: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
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
      isFavorite: false,
      isPremium: false,
      image: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
    },
    {
      id: '4',
      name: 'Vinhomes Central Park Sports',
      rating: 4.6,
      reviews: 124,
      price: 280,
      location: 'Bình Thạnh, TP.HCM',
      distance: 4.2,
      courts: 5,
      features: ['5 sân indoor', 'Có Cafe'],
      status: 'closed',
      statusText: 'Đã đóng cửa • Mở lại lúc 06:00',
      isFavorite: false,
      isPremium: false,
      image: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
    },
  ];

const AreaPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('nearby');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [favorites, setFavorites] = useState<string[]>(['2']);

  

  const filters: { id: FilterType; label: string; icon: string }[] = [
    { id: 'nearby', label: 'Gần tôi', icon: 'location' },
    { id: 'open', label: 'Đang mở', icon: 'timer' },
    { id: 'rated', label: 'Đánh giá cao', icon: 'star' },
    { id: 'filter', label: 'Bộ lọc', icon: 'options' },
  ];

  const toggleFavorite = (courtId: string) => {
    if (favorites.includes(courtId)) {
      setFavorites(favorites.filter(id => id !== courtId));
    } else {
      setFavorites([...favorites, courtId]);
    }
  };

  const handleBookCourt = (courtId: string) => {
    router.push({
    pathname: '/(details)/courtDetail/[id]',
    params: { id: courtId }
  });
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

  const CourtCard = ({ item }: { item: Court }) => (
    <View
      style={[styles.courtCard,]}
    >
      {item.isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>Premium</Text>
        </View>
      )}

      {/* <View style={[styles.courtImage, { backgroundColor: item.image as any }]} /> */}
      <Image source={{uri:item.image}} style={styles.courtImage}/>

      <TouchableOpacity
        style={styles.favoriteBtn}
        onPress={() => toggleFavorite(item.id)}
        activeOpacity={0.5}
      >
        <Ionicons
          name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.includes(item.id) ? '#FF4444' : '#fff'}
        />
      </TouchableOpacity>
      
      <View style={styles.courtContent}>
        
        <View style={styles.courtHeader}>
          <View style={styles.courtInfo}>
            <Text style={styles.courtName}>{item.name}</Text>
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingScore}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviews})</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceAmount}>{item.price}k</Text>
            <Text style={styles.priceUnit}>/giờ</Text>
          </View>
        </View>
        
        <View style={styles.metaItem}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.distance}>• {item.distance} km</Text>
        </View>


        <View style={styles.features}>
          {item.features.map((feature, idx) => (
            <View key={idx} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {item.features.length < 3 && (
            <View style={styles.featureTag}>
              <Text style={styles.featureMore}>+{3 - item.features.length}</Text>
            </View>
          )}
        </View>


        <View style={styles.status}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          />
          <Text style={styles.statusText}>{item.statusText}</Text>
        </View>


        <TouchableOpacity
          style={[
            styles.bookBtn,
            item.status === 'closed' && styles.bookBtnOutline,
          ]}
          onPress={() => handleBookCourt(item.id)}
        >
          <Text
            style={[
              styles.bookBtnText,
              item.status === 'closed' && styles.bookBtnTextOutline,
            ]}
          >
            {item.status === 'closed' ? 'Xem chi tiết' : 'Đặt sân ngay'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Sân thi đấu</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={activeFilter === filter.id ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.filterLabel,
                activeFilter === filter.id && styles.filterLabelActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.viewToggle}>
        <View style={styles.toggleBtns}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === 'list' && styles.toggleBtnActive,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons
              name="list"
              size={20}
              color={viewMode === 'list' ? '#00D9B5' : '#ccc'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === 'map' && styles.toggleBtnActive,
            ]}
            onPress={() => setViewMode('map')}
          >
            <MaterialCommunityIcons
              name="map"
              size={20}
              color={viewMode === 'map' ? '#00D9B5' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.resultCount}>
          Tìm thấy <Text style={styles.resultCountBold}>{courts.length}</Text> sân
        </Text>
      </View>

      <FlatList
        data={courts}
        renderItem={({ item }) => <CourtCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courtsList}
        scrollEnabled={viewMode === 'list'}
      />
    </SafeAreaView>
  );
}

export default AreaPage;
