import React, { useState } from 'react';

import { Facility, RatingBar, Review } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { courts } from '@/app/(tabs)/area';

import { styles } from '@/constants/styles/courtdetail.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function CourtDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(true);
  const { id } = useLocalSearchParams();
  const data: any = courts.find((court) => court.id === id);
  const colors = useThemedColors();

  const facilities: Facility[] = [
    { id: '1', icon: 'home', name: '6 sân indoor' },
    { id: '2', icon: 'lightbulb-on', name: 'Hệ thống đèn' },
    { id: '3', icon: 'hanger', name: 'Phòng thay đồ' },
    { id: '4', icon: 'toilet', name: 'Nhà vệ sinh' },
    { id: '5', icon: 'parking', name: 'Bãi đỗ xe' },
    { id: '6', icon: 'tennis', name: 'Cho thuê vợt' },
    { id: '7', icon: 'cup-water', name: 'Quầy nước' },
    { id: '8', icon: 'wifi', name: 'Wifi miễn phí' },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Nguyễn Tuấn',
      userInitials: 'NT',
      rating: 5.0,
      date: '2 ngày trước',
      text: 'Sân rất đẹp và chuyên nghiệp. Nhân viên thân thiện, nhiệt tình. Bãi đỗ xe rộng rãi, tiện lợi. Mình sẽ quay lại chơi thường xuyên!',
      color: '#00D9B5',
    },
    {
      id: '2',
      userName: 'Lê Anh',
      userInitials: 'LA',
      rating: 5.0,
      date: '1 tuần trước',
      text: 'Vị trí thuận tiện, dễ tìm. Sân sạch sẽ, thoáng mát. Giá cả hợp lý. Rất đáng để thử!',
      color: '#667eea',
    },
  ];

  const ratingBars: RatingBar[] = [
    { stars: 5, count: 132, percentage: 85 },
    { stars: 4, count: 16, percentage: 10 },
    { stars: 3, count: 5, percentage: 3 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  const FacilityItem = ({ item }: { item: Facility }) => (
    <View style={[styles.facilityItem, { backgroundColor: colors.backgroundTertiary }]}>
      <View style={styles.facilityIcon}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color="#00D9B5" />
      </View>
      <Text style={[styles.facilityName, { color: colors.text }]}>{item.name}</Text>
    </View>
  );

  const ReviewItem = ({ item }: { item: Review }) => (
    <View style={[styles.reviewItem, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
      <View style={styles.reviewHeader}>
        <View style={[styles.reviewAvatar, { backgroundColor: item.color }]}>
          <Text style={styles.reviewAvatarText}>{item.userInitials}</Text>
        </View>
        <View style={styles.reviewUserInfo}>
          <Text style={[styles.reviewUserName, { color: colors.text }]}>{item.userName}</Text>
          <View style={styles.reviewRating}>
            <MaterialCommunityIcons name="star" size={14} color="#FFB800" />
            <Text style={[styles.reviewRatingText, { color: colors.text }]}>{item.rating}</Text>
          </View>
        </View>
        <Text style={[styles.reviewDate, { color: colors.textTertiary }]}>{item.date}</Text>
      </View>
      <Text style={[styles.reviewText, { color: colors.textSecondary }]}>{item.text}</Text>
    </View>
  );

  const RatingBarItem = ({ item }: { item: RatingBar }) => (
    <View style={styles.ratingBarItem}>
      <Text style={[styles.barLabel, { color: colors.text }]}>{item.stars}★</Text>
      <View style={[styles.barTrack, { backgroundColor: colors.backgroundTertiary }]}>
        <View style={[styles.barFill, { width: `${item.percentage}%` }]} />
      </View>
      <Text style={[styles.barCount, { color: colors.textSecondary }]}>{item.count}</Text>
    </View>
  );

  const handle = () => {
    router.push('/(booking)/bookcourse');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.gallerySection}>
              <Image style={styles.galleryImage} source={{ uri: data.image }} />
              <View style={styles.galleryOverlay}>
                <TouchableOpacity style={styles.backBtnLight} onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.iconBtnLight}>
                    <Ionicons name="share-social" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtnLight} onPress={() => setIsFavorite(!isFavorite)}>
                    <Ionicons
                      name={isFavorite ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isFavorite ? '#FF4444' : '#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.galleryIndicator}>
                <MaterialCommunityIcons name="image-multiple" size={16} color="#fff" />
                <Text style={styles.galleryIndicatorText}>1/8 ảnh</Text>
              </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <View style={styles.courtDetailHeader}>
                <View style={styles.courtDetailInfo}>
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                  <Text style={[styles.detailTitle, { color: colors.text }]}>{data.name}</Text>
                  <View style={styles.courtRatingLarge}>
                    <MaterialCommunityIcons name="star" size={18} color="#FFB800" />
                    <Text style={[styles.ratingScore, { color: colors.text }]}>{data.rating}</Text>
                    <Text style={[styles.ratingCount, { color: colors.textTertiary }]}>({data.reviews} đánh giá)</Text>
                  </View>
                </View>
                <View style={styles.courtStatusLarge}>
                  <View style={styles.statusDot} />
                  <Text style={[styles.statusText, { color: colors.textSecondary }]}>{data.status}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <View style={styles.quickInfoGrid}>
                <View style={[styles.quickInfoItem, { backgroundColor: colors.backgroundTertiary }]}>
                  <Ionicons name="location" size={20} color="#00D9B5" />
                  <View style={styles.quickInfoText}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Địa chỉ</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{data.location}</Text>
                  </View>
                </View>
                <View style={[styles.quickInfoItem, { backgroundColor: colors.backgroundTertiary }]}>
                  <Ionicons name="time" size={20} color="#FF9800" />
                  <View style={styles.quickInfoText}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Giờ mở cửa</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{data.statusText}</Text>
                  </View>
                </View>
                <View style={[styles.quickInfoItem, { backgroundColor: colors.backgroundTertiary }]}>
                  <Ionicons name="call" size={20} color="#2196F3" />
                  <View style={styles.quickInfoText}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Liên hệ</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>0901 234 567</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.contentSection}>
              <View
                style={[styles.priceBookingCard, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
              >
                <View style={styles.priceSection}>
                  <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Giá thuê sân</Text>
                  <View style={styles.priceRange}>
                    <Text style={styles.priceFrom}>200k</Text>
                    <Text style={[styles.priceSeparator, { color: colors.textSecondary }]}>-</Text>
                    <Text style={styles.priceTo}>300k</Text>
                    <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>/giờ</Text>
                  </View>
                  <Text style={[styles.priceNote, { color: colors.textTertiary }]}>Giá thay đổi theo khung giờ</Text>
                </View>
                <TouchableOpacity style={styles.bookBtn}>
                  <Text style={styles.bookBtnText}>Đặt sân ngay</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Giới thiệu</Text>
              <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                Sân Pickleball Rạch Chiếc là một trong những địa điểm chơi pickleball hàng đầu tại TP.HCM với 6 sân thi
                đấu tiêu chuẩn quốc tế. Tọa lạc tại vị trí trung tâm quận 2, sân được trang bị đầy đủ tiện nghi hiện đại
                phục vụ người chơi.
              </Text>
              <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                Với hệ thống chiếu sáng chuyên nghiệp, bãi đỗ xe rộng rãi và không gian thoáng mát, đây là lựa chọn lý
                tưởng cho các buổi tập luyện và thi đấu.
              </Text>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Tiện ích</Text>
              <View style={styles.facilitiesGrid}>
                {facilities.map((facility) => (
                  <FacilityItem key={facility.id} item={facility} />
                ))}
              </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Vị trí</Text>
              <View style={styles.mapContainer}>
                <LinearGradient
                  colors={['#E5E7EB', '#D1D5DB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.mapImage}
                />
                <TouchableOpacity style={styles.mapActionBtn}>
                  <Ionicons name="location" size={20} color="#fff" />
                  <Text style={styles.mapActionBtnText}>Mở bản đồ</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.locationDetail}>
                <Text style={[styles.locationAddress, { color: colors.text }]}>
                  123 Xa lộ Hà Nội, Phường Thảo Điền, Quận 2, TP.HCM
                </Text>
                <View style={styles.locationDistance}>
                  <Ionicons name="location" size={14} color={colors.icon} />
                  <Text style={[styles.locationDistanceText, { color: colors.textSecondary }]}>
                    Cách bạn 1.2 km • Khoảng 5 phút lái xe
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionHeading, { color: colors.text }]}>Đánh giá</Text>
                <TouchableOpacity style={styles.reviewBtnSmall}>
                  <Text style={styles.reviewBtnSmallText}>Viết đánh giá</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.ratingSummary, { backgroundColor: colors.backgroundTertiary }]}>
                <View style={styles.ratingOverview}>
                  <Text style={[styles.ratingBig, { color: colors.text }]}>{data.rating}</Text>
                  <View style={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MaterialCommunityIcons key={i} name="star" size={16} color="#FFB800" />
                    ))}
                  </View>
                  <Text style={[styles.ratingCountText, { color: colors.textSecondary }]}>{data.reviews} đánh giá</Text>
                </View>
                <View style={styles.ratingBars}>
                  {ratingBars.map((bar) => (
                    <RatingBarItem key={bar.stars} item={bar} />
                  ))}
                </View>
              </View>

              <View style={styles.reviewsList}>
                {reviews.map((review) => (
                  <ReviewItem key={review.id} item={review} />
                ))}
                <TouchableOpacity style={styles.viewAllBtn}>
                  <Text style={styles.viewAllBtnText}>Xem tất cả đánh giá</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={[]}
        renderItem={() => null}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={[styles.detailFooter, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <View style={styles.footerInfo}>
          <Text style={[styles.footerPriceLabel, { color: colors.textSecondary }]}>Từ</Text>
          <Text style={styles.footerPriceValue}>{data.price}/giờ</Text>
        </View>
        <TouchableOpacity onPress={handle} style={styles.footerBtn}>
          <Text style={styles.footerBtnText}>Đặt sân ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
