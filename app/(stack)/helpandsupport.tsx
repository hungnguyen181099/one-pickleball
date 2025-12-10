import React, { useState } from 'react';

import { ContactMethod, FAQ } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/setting.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function HelpAndSupportScreen() {
  const colors = useThemedColors();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'booking',
      question: 'Làm thế nào để đặt sân?',
      answer:
        'Vào tab "Sân", chọn sân bạn muốn đặt, chọn ngày giờ phù hợp và nhấn "Đặt sân". Xác nhận thông tin và thanh toán để hoàn tất.',
    },
    {
      id: '2',
      category: 'booking',
      question: 'Tôi có thể hủy đặt sân không?',
      answer:
        'Có, bạn có thể hủy đặt sân trước 24 giờ để được hoàn tiền 100%. Hủy trong vòng 24 giờ sẽ bị trừ 50% phí đặt sân.',
    },
    {
      id: '3',
      category: 'tournament',
      question: 'Cách đăng ký tham gia giải đấu?',
      answer:
        'Vào tab "Giải đấu", chọn giải bạn muốn tham gia, nhấn "Đăng ký" và điền đầy đủ thông tin. Thanh toán lệ phí để hoàn tất đăng ký.',
    },
    {
      id: '4',
      category: 'tournament',
      question: 'Điều kiện tham gia giải đấu?',
      answer:
        'Mỗi giải đấu có yêu cầu riêng về độ tuổi, giới tính và trình độ. Vui lòng đọc kỹ mô tả giải đấu trước khi đăng ký.',
    },
    {
      id: '5',
      category: 'account',
      question: 'Làm thế nào để đổi mật khẩu?',
      answer: 'Vào tab "Tôi" > "Cài đặt chung" > "Đổi mật khẩu". Nhập mật khẩu cũ và mật khẩu mới để thay đổi.',
    },
    {
      id: '6',
      category: 'payment',
      question: 'Các phương thức thanh toán nào được hỗ trợ?',
      answer:
        'Chúng tôi hỗ trợ thanh toán qua thẻ ATM, thẻ tín dụng, ví điện tử (MoMo, ZaloPay, VNPay) và chuyển khoản ngân hàng.',
    },
  ];

  const contactMethods: ContactMethod[] = [
    {
      id: '1',
      icon: 'call',
      label: 'Hotline',
      value: '0975241204',
      color: '#00D9B5',
      action: () => {
        Linking.openURL('tel:0975241204');
      },
    },
    {
      id: '2',
      icon: 'mail',
      label: 'Email',
      value: 'support@onepickleball.vn',
      color: '#3B82F6',
      action: () => {
        Linking.openURL('mailto:support@onepickleball.vn');
      },
    },
    {
      id: '3',
      icon: 'logo-facebook',
      label: 'Facebook',
      value: 'onePickleball',
      color: '#1877F2',
      action: () => {
        Linking.openURL('https://www.facebook.com/profile.php?id=100086623663818');
      },
    },
    {
      id: '4',
      icon: 'chatbubble-ellipses',
      label: 'Live Chat',
      value: 'Trò chuyện trực tiếp',
      color: '#10B981',
      action: () => {
        Alert.alert('Live Chat', 'Tính năng chat trực tiếp sẽ sớm ra mắt!');
      },
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const getCategoryLabel = (category: FAQ['category']) => {
    switch (category) {
      case 'booking':
        return '📅 Đặt sân';
      case 'tournament':
        return '🏆 Giải đấu';
      case 'account':
        return '👤 Tài khoản';
      case 'payment':
        return '💳 Thanh toán';
      default:
        return '';
    }
  };

  const renderFAQItem = (faq: FAQ) => {
    const isExpanded = expandedFAQ === faq.id;

    return (
      <TouchableOpacity
        key={faq.id}
        style={[
          localStyles.faqItem,
          { backgroundColor: colors.card, borderColor: colors.border },
          isExpanded && localStyles.faqItemExpanded,
        ]}
        onPress={() => toggleFAQ(faq.id)}
        activeOpacity={0.7}
      >
        <View style={localStyles.faqHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[localStyles.faqCategory, { color: colors.tint }]}>{getCategoryLabel(faq.category)}</Text>
            <Text style={[localStyles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
          </View>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textTertiary} />
        </View>
        {isExpanded && <Text style={[localStyles.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>}
      </TouchableOpacity>
    );
  };

  const renderContactMethod = (method: ContactMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[localStyles.contactCard, { backgroundColor: colors.card }]}
      onPress={method.action}
      activeOpacity={0.7}
    >
      <View style={[localStyles.contactIconContainer, { backgroundColor: `${method.color}20` }]}>
        <Ionicons name={method.icon as any} size={24} color={method.color} />
      </View>
      <View style={localStyles.contactInfo}>
        <Text style={[localStyles.contactLabel, { color: colors.text }]}>{method.label}</Text>
        <Text style={[localStyles.contactValue, { color: colors.textSecondary }]}>{method.value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  const renderQuickAction = (icon: string, label: string, onPress: () => void, iconColor: string) => (
    <TouchableOpacity
      style={[localStyles.quickActionCard, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[localStyles.quickActionIcon, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={icon as any} size={28} color={iconColor} />
      </View>
      <Text style={[localStyles.quickActionLabel, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Trợ giúp & hỗ trợ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={localStyles.section}>
          <Text style={[localStyles.sectionTitle, { color: colors.text }]}>Hành động nhanh</Text>
          <View style={localStyles.quickActionsGrid}>
            {renderQuickAction('document-text', 'Hướng dẫn', () => console.log('Guide'), '#3B82F6')}
            {renderQuickAction('videocam', 'Video hướng dẫn', () => console.log('Videos'), '#EF4444')}
            {renderQuickAction('bug', 'Báo lỗi', () => console.log('Report bug'), '#F59E0B')}
            {renderQuickAction('star', 'Đánh giá app', () => console.log('Rate app'), '#FFD700')}
          </View>
        </View>

        {/* Contact Methods */}
        <View style={localStyles.section}>
          <Text style={[localStyles.sectionTitle, { color: colors.text }]}>Liên hệ với chúng tôi</Text>
          <View style={localStyles.contactList}>{contactMethods.map(renderContactMethod)}</View>
        </View>

        {/* FAQs */}
        <View style={localStyles.section}>
          <Text style={[localStyles.sectionTitle, { color: colors.text }]}>Câu hỏi thường gặp</Text>
          <View style={localStyles.faqList}>{faqs.map(renderFAQItem)}</View>
        </View>

        {/* Additional Resources */}
        <View style={[localStyles.section, { marginBottom: 40 }]}>
          <Text style={[localStyles.sectionTitle, { color: colors.text }]}>Tài nguyên hữu ích</Text>
          <View style={[localStyles.resourceCard, { backgroundColor: colors.card }]}>
            <Ionicons name="book" size={24} color={colors.tint} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[localStyles.resourceTitle, { color: colors.text }]}>Trung tâm trợ giúp</Text>
              <Text style={[localStyles.resourceDesc, { color: colors.textSecondary }]}>
                Tìm hiểu thêm về cách sử dụng ứng dụng
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </View>

          <View style={[localStyles.resourceCard, { backgroundColor: colors.card }]}>
            <Ionicons name="people" size={24} color={colors.tint} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[localStyles.resourceTitle, { color: colors.text }]}>Cộng đồng</Text>
              <Text style={[localStyles.resourceDesc, { color: colors.textSecondary }]}>
                Tham gia cộng đồng người chơi Pickleball
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  contactCard: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  contactIconContainer: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactList: {
    gap: 12,
  },
  contactValue: {
    fontSize: 14,
  },
  quickActionCard: {
    alignItems: 'center',
    borderRadius: 12,
    gap: 8,
    padding: 16,
    width: '48%',
  },
  quickActionIcon: {
    alignItems: 'center',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  faqList: {
    gap: 12,
  },
  faqItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  faqItemExpanded: {
    borderWidth: 2,
  },
  faqHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  faqCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  faqAnswer: {
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderTopWidth: 1,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    paddingTop: 12,
  },

  // Resources
  resourceCard: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceDesc: {
    fontSize: 13,
  },
});
