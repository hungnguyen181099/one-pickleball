import React, { useState } from 'react';

import { NotificationItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/notification.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function NotificationScreen() {
  const colors = useThemedColors();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Đặt sân thành công',
      message: 'Bạn đã đặt sân Pickleball Rạch Chiếc vào lúc 18:00 ngày 25/11/2024. Vui lòng đến sớm 10 phút.',
      time: '5 phút trước',
      isRead: false,
      icon: 'calendar',
      iconColor: '#00D9B5',
      actions: [
        {
          label: 'Xem chi tiết',
          primary: true,
          onPress: () => console.log('View booking'),
        },
        {
          label: 'Hủy đặt',
          onPress: () => console.log('Cancel booking'),
        },
      ],
    },
    {
      id: '2',
      type: 'event',
      title: 'Sự kiện mới: HCM Pickleball Open 2025',
      message: 'Giải đấu lớn nhất năm đã mở đăng ký! Đăng ký ngay để nhận ưu đãi sớm.',
      time: '1 giờ trước',
      isRead: false,
      icon: 'trophy',
      iconColor: '#FFB800',
      actions: [
        {
          label: 'Đăng ký ngay',
          primary: true,
          onPress: () => console.log('Register event'),
        },
      ],
    },
    {
      id: '3',
      type: 'social',
      title: 'Nguyễn Văn A đã thích bài viết của bạn',
      message: '"5 Tips nâng cao kỹ thuật serve trong Pickleball"',
      time: '2 giờ trước',
      isRead: true,
      icon: 'heart',
      iconColor: '#FF4444',
    },
    {
      id: '4',
      type: 'social',
      title: 'Trần Thị B đã bình luận',
      message: 'Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ.',
      time: '3 giờ trước',
      isRead: true,
      icon: 'chatbubble',
      iconColor: '#2196F3',
    },
    {
      id: '5',
      type: 'system',
      title: 'Cập nhật ứng dụng',
      message: 'Phiên bản mới 2.0 đã có sẵn với nhiều tính năng mới. Cập nhật ngay!',
      time: '1 ngày trước',
      isRead: true,
      icon: 'download',
      iconColor: '#9C27B0',
      actions: [
        {
          label: 'Cập nhật',
          primary: true,
          onPress: () => console.log('Update app'),
        },
      ],
    },
  ];

  const filteredNotifications = activeTab === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: colors.card, borderColor: colors.border },
        !item.isRead && styles.notificationItemUnread,
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}20` }]}>
        <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, { color: colors.text }]}>{item.title}</Text>
          {!item.isRead && <View style={styles.unreadBadge} />}
        </View>

        <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{item.message}</Text>

        <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>{item.time}</Text>

        {item.actions && item.actions.length > 0 && (
          <View style={styles.notificationActions}>
            {item.actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionBtn, { borderColor: colors.border }, action.primary && styles.actionBtnPrimary]}
                onPress={action.onPress}
              >
                <Text
                  style={[styles.actionBtnText, { color: colors.text }, action.primary && styles.actionBtnTextPrimary]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.backgroundTertiary }]}>
        <Ionicons name="notifications-off-outline" size={40} color={colors.textTertiary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>Không có thông báo</Text>
      <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
        {activeTab === 'unread' ? 'Bạn đã đọc tất cả thông báo' : 'Bạn chưa có thông báo nào'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Thông báo</Text>
            {unreadCount > 0 && (
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                {unreadCount} thông báo chưa đọc
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, { borderColor: colors.border }, activeTab === 'all' && styles.tabBtnActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabLabel, { color: colors.text }, activeTab === 'all' && styles.tabLabelActive]}>
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, { borderColor: colors.border }, activeTab === 'unread' && styles.tabBtnActive]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[styles.tabLabel, { color: colors.text }, activeTab === 'unread' && styles.tabLabelActive]}>
            Chưa đọc {unreadCount > 0 && `(${unreadCount})`}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
