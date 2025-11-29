import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { styles } from '@/constants/styles/booking.styles';
import { AppColors } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import { PaymentMethod } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function CheckoutScreen() {
  const colors = useThemedColors();
  const [selectedPayment, setSelectedPayment] = useState('momo');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const params = useLocalSearchParams();

  // Lấy dữ liệu từ params
  const bookingData = {
    courtName: (params.courtName as string) || 'Sân Pickleball Rạch Chiếc',
    location: (params.location as string) || 'Quận 2, TP.HCM',
    date: (params.date as string) || '26/11',
    timeRange: (params.timeRange as string) || '15:00 - 18:00',
    selectedTimes: params.selectedTimes ? JSON.parse(params.selectedTimes as string) : ['15:00', '16:00', '17:00'],
    court: (params.court as string) || 'Sân 1',
    courtDescription: (params.courtDescription as string) || 'Indoor • AC',
    notes: (params.notes as string) || '',
    totalPrice: params.totalPrice ? parseInt(params.totalPrice as string) : 750000,
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'momo',
      name: 'Ví MoMo',
      icon: 'wallet-outline',
      description: 'Thanh toán qua ví điện tử MoMo'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: 'wallet-outline',
      description: 'Thanh toán qua ví ZaloPay'
    },
    {
      id: 'banking',
      name: 'Chuyển khoản',
      icon: 'card-outline',
      description: 'Chuyển khoản ngân hàng'
    },
    {
      id: 'cash',
      name: 'Tiền mặt',
      icon: 'cash-outline',
      description: 'Thanh toán trực tiếp tại sân'
    },
  ];

  const handleConfirmBooking = () => {
    setIsConfirmModalVisible(true);
  };

  const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => (
    <TouchableOpacity
      style={[
        styles.courtOption,
        selectedPayment === method.id ? styles.courtOptionActive : styles.courtOptionInactive,
      ]}
      onPress={() => setSelectedPayment(method.id)}
    >
      <View style={[styles.courtOptionCard, { backgroundColor: colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: selectedPayment === method.id ? `${AppColors.primary}20` : colors.input,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Ionicons
              name={method.icon}
              size={24}
              color={selectedPayment === method.id ? AppColors.primary : colors.icon}
            />
          </View>
          <View style={styles.courtOptionInfo}>
            <Text style={[styles.courtOptionName, { color: colors.text }]}>
              {method.name}
            </Text>
            <Text style={[styles.courtOptionDesc, { color: colors.textSecondary }]}>
              {method.description}
            </Text>
          </View>
        </View>
        {selectedPayment === method.id && (
          <Ionicons name="checkmark-circle" size={24} color={AppColors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Xác nhận đặt sân</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Court Summary */}
        <View style={[styles.courtSummary, { borderBottomColor: colors.border }]}>
          <LinearGradient
            colors={['#00D9B5', '#0099CC']}
            style={styles.courtSummaryImage}
          />
          <View style={styles.courtSummaryInfo}>
            <Text style={[styles.courtSummaryName, { color: colors.text }]}>
              {bookingData.courtName}
            </Text>
            <View style={styles.courtSummaryMeta}>
              <Ionicons name="location-outline" size={16} color={colors.icon} />
              <Text style={[styles.courtSummaryMetaText, { color: colors.textSecondary }]}>
                {bookingData.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Thông tin đặt sân</Text>

          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            gap: 16,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            {/* Date & Time */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>Ngày giờ</Text>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                  {bookingData.date}, {bookingData.timeRange}
                </Text>
              </View>
              <View style={{
                backgroundColor: `${AppColors.primary}15`,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                alignSelf: 'flex-start'
              }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: AppColors.primary }}>
                  {bookingData.selectedTimes.length} giờ
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: colors.border }} />

            {/* Court */}
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>Sân</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                {bookingData.court}
              </Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                {bookingData.courtDescription}
              </Text>
            </View>

            {/* Time Slots */}
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>Khung giờ đã chọn</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {bookingData.selectedTimes.map((time: string) => (
                  <View
                    key={time}
                    style={{
                      backgroundColor: colors.input,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: AppColors.primary
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>
                      {time}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Phương thức thanh toán</Text>
          <View style={styles.courtSelector}>
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Chi tiết thanh toán</Text>

          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            gap: 12,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            {bookingData.selectedTimes.map((time: string, index: number) => (
              <View key={time} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                  Giờ {time}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>
                  {(250000).toLocaleString('vi-VN')}đ
                </Text>
              </View>
            ))}

            <View style={{ height: 1, backgroundColor: colors.border }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                Tổng cộng
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: AppColors.primary }}>
                {bookingData.totalPrice.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View style={styles.bookingSummary}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tổng thanh toán:</Text>
            <Text style={styles.priceHighlight}>
              {bookingData.totalPrice.toLocaleString('vi-VN')}đ
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.continueBtnText}>Xác nhận đặt sân</Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={isConfirmModalVisible}
        title="Xác nhận đặt sân"
        message="Bạn có chắc chắn muốn đặt sân này?"
        onCancel={() => setIsConfirmModalVisible(false)}
        onConfirm={() => {
          setIsConfirmModalVisible(false);
          // TODO: Handle booking logic here
        }}
      />
    </View>
  );
}