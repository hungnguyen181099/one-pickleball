import React, { useState } from 'react';

import { BookingFilterType, BookingHistory } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/historybooking.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function HistoryBookingScreen() {
  const colors = useThemedColors();
  const [activeFilter, setActiveFilter] = useState<BookingFilterType>('all');

  const bookingHistory: BookingHistory[] = [
    {
      id: '1',
      courtName: 'Pickleball Rạch Chiếc',
      courtAddress: 'Quận 2, TP.HCM',
      date: '25 Th11, 2024',
      time: '18:00 - 20:00',
      duration: '2 giờ',
      status: 'confirmed',
      totalPrice: 300000,
      paymentMethod: 'MoMo',
      courtType: 'indoor',
    },
    {
      id: '2',
      courtName: 'Sân Pickleball Thảo Điền',
      courtAddress: 'Quận 2, TP.HCM',
      date: '28 Th11, 2024',
      time: '19:00 - 21:00',
      duration: '2 giờ',
      status: 'pending',
      totalPrice: 350000,
      paymentMethod: 'ZaloPay',
      courtType: 'outdoor',
    },
    {
      id: '3',
      courtName: 'Arena Pickleball Club',
      courtAddress: 'Quận 7, TP.HCM',
      date: '20 Th11, 2024',
      time: '17:00 - 19:00',
      duration: '2 giờ',
      status: 'completed',
      totalPrice: 400000,
      paymentMethod: 'VNPay',
      courtType: 'indoor',
    },
    {
      id: '4',
      courtName: 'Pickleball Phú Mỹ Hưng',
      courtAddress: 'Quận 7, TP.HCM',
      date: '15 Th11, 2024',
      time: '16:00 - 18:00',
      duration: '2 giờ',
      status: 'completed',
      totalPrice: 320000,
      paymentMethod: 'Thẻ ATM',
      courtType: 'outdoor',
    },
    {
      id: '5',
      courtName: 'Sân Pickleball Landmark',
      courtAddress: 'Bình Thạnh, TP.HCM',
      date: '10 Th11, 2024',
      time: '20:00 - 22:00',
      duration: '2 giờ',
      status: 'cancelled',
      totalPrice: 280000,
      courtType: 'indoor',
    },
  ];

  const filteredBookings =
    activeFilter === 'all' ? bookingHistory : bookingHistory.filter((b) => b.status === activeFilter);

  const getFilterLabel = (filter: BookingFilterType) => {
    switch (filter) {
      case 'all':
        return 'Tất cả';
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return '';
    }
  };

  const getStatusConfig = (status: BookingHistory['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Chờ xác nhận',
          icon: 'time',
          color: '#F59E0B',
          bgColor: '#F59E0B20',
        };
      case 'confirmed':
        return {
          label: 'Đã xác nhận',
          icon: 'checkmark-circle',
          color: colors.tint,
          bgColor: `${colors.tint}20`,
        };
      case 'completed':
        return {
          label: 'Hoàn thành',
          icon: 'checkmark-done-circle',
          color: '#10B981',
          bgColor: '#10B98120',
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
          icon: 'close-circle',
          color: colors.error,
          bgColor: `${colors.error}20`,
        };
      default:
        return {
          label: '',
          icon: 'help-circle',
          color: colors.textTertiary,
          bgColor: `${colors.textTertiary}20`,
        };
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCancelBooking = (booking: BookingHistory) => {
    Alert.alert(
      'Hủy đặt sân',
      `Bạn có chắc chắn muốn hủy đặt sân "${booking.courtName}"?\n\nLưu ý: Hủy trước 24 giờ sẽ được hoàn 100% tiền.`,
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Hủy đặt sân',
          style: 'destructive',
          onPress: () => console.log('Cancelled booking:', booking.id),
        },
      ]
    );
  };

  const handleRebookCourt = (booking: BookingHistory) => {
    console.log('Rebook court:', booking.id);
    // Navigate to booking screen with pre-filled data
  };

  const BookingCard = ({ booking }: { booking: BookingHistory }) => {
    const statusConfig = getStatusConfig(booking.status);

    return (
      <View style={[styles.bookingCard, { backgroundColor: colors.card }]}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
          <Ionicons name={statusConfig.icon as any} size={16} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
        </View>

        {/* Court Info */}
        <View style={styles.courtInfo}>
          <View style={styles.courtHeader}>
            <Text style={[styles.courtName, { color: colors.text }]}>{booking.courtName}</Text>
            <View style={[styles.courtTypeBadge, { backgroundColor: colors.backgroundTertiary }]}>
              <Ionicons
                name={booking.courtType === 'indoor' ? 'home' : 'sunny'}
                size={12}
                color={colors.textSecondary}
              />
              <Text style={[styles.courtTypeText, { color: colors.textSecondary }]}>
                {booking.courtType === 'indoor' ? 'Trong nhà' : 'Ngoài trời'}
              </Text>
            </View>
          </View>

          <View style={styles.courtDetail}>
            <Ionicons name="location" size={14} color={colors.textTertiary} />
            <Text style={[styles.courtAddress, { color: colors.textSecondary }]}>{booking.courtAddress}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={[styles.detailsSection, { borderTopColor: colors.border }]}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color={colors.icon} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{booking.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color={colors.icon} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{booking.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="hourglass-outline" size={16} color={colors.icon} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{booking.duration}</Text>
            </View>
            {booking.paymentMethod && (
              <View style={styles.detailItem}>
                <Ionicons name="card-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{booking.paymentMethod}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Price */}
        <View style={[styles.priceSection, { borderTopColor: colors.border }]}>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Tổng tiền:</Text>
          <Text style={[styles.priceValue, { color: colors.tint }]}>{formatPrice(booking.totalPrice)}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          {booking.status === 'confirmed' && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn, { borderColor: colors.error }]}
              onPress={() => handleCancelBooking(booking)}
            >
              <Text style={[styles.actionBtnText, { color: colors.error }]}>Hủy đặt sân</Text>
            </TouchableOpacity>
          )}
          {booking.status === 'pending' && (
            <>
              <TouchableOpacity
                style={[styles.actionBtn, styles.cancelBtn, { borderColor: colors.error }]}
                onPress={() => handleCancelBooking(booking)}
              >
                <Text style={[styles.actionBtnText, { color: colors.error }]}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.viewBtn, { backgroundColor: colors.tint }]}>
                <Text style={[styles.actionBtnText, { color: '#fff' }]}>Xem chi tiết</Text>
              </TouchableOpacity>
            </>
          )}
          {(booking.status === 'completed' || booking.status === 'cancelled') && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.rebookBtn, { borderColor: colors.tint }]}
              onPress={() => handleRebookCourt(booking)}
            >
              <Ionicons name="refresh" size={16} color={colors.tint} />
              <Text style={[styles.actionBtnText, { color: colors.tint }]}>Đặt lại</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Lịch sử đặt sân</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as BookingFilterType[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor: activeFilter === filter ? colors.tint : colors.backgroundTertiary,
                  borderColor: activeFilter === filter ? colors.tint : colors.border,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterChipText, { color: activeFilter === filter ? '#fff' : colors.text }]}>
                {getFilterLabel(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={filteredBookings}
        renderItem={({ item }) => <BookingCard booking={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.scrollContent, { padding: 16 }]}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="calendar-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary, marginTop: 12 }]}>
              Không tìm thấy lịch sử đặt sân
            </Text>
          </View>
        }
      />
    </View>
  );
}
