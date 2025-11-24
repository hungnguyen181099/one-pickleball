import { styles } from "@/assets/styles/user.styles";
import { AchievementCard, SettingItemComponent, StatCard } from "@/components/user";
import { useTheme, useThemedColors } from "@/hooks/use-theme";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export interface StatCardProps {
  number: string;
  label: string;
}

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  locked: boolean;
}

export interface SettingsItem {
  id: string;
  icon: string;
  label: string;
  route?: string;
  onPress?: () => void;
  isLogout?: boolean;
}

const UserPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const colors = useThemedColors();

  const stats: StatCardProps[] = [
    { number: '24', label: 'Trận đấu' },
    { number: '68%', label: 'Tỷ lệ thắng' },
    { number: '#42', label: 'Xếp hạng' },
    { number: '3', label: 'Huy chương' },
  ];

  const achievements: Achievement[] = [
    { id: '1', name: 'Vô địch HCM 2024', emoji: '🏆', locked: false },
    { id: '2', name: 'Á quân VN Cup', emoji: '🥈', locked: false },
    { id: '3', name: 'Hạng 3 Open', emoji: '🥉', locked: false },
    { id: '4', name: 'Chưa mở khóa', emoji: '🔒', locked: true },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const settingsItems: SettingsItem[] = [
    {
      id: '1',
      icon: 'cog',
      label: 'Cài đặt chung',
      route: '/screen/setting',
    },
    {
      id: '3',
      icon: 'lock',
      label: 'Bảo mật & quyền riêng tư',
    },
    {
      id: '4',
      icon: 'bell',
      label: 'Thông báo',
    },
    {
      id: '5',
      icon: 'help-circle',
      label: 'Trợ giúp & hỗ trợ',
    },
    {
      id: '6',
      icon: 'logout',
      label: 'Đăng xuất',
      isLogout: true,
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', onPress: () => { }, style: 'cancel' },
        {
          text: 'Đăng xuất', onPress: () => {
            console.log('User logged out');
            // Xử lý đăng xuất tại đây
          }, style: 'destructive'
        },
      ]
    );
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
    
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.coverSection}>
          <View style={styles.cover} />
        </View>
        
        <View style={[styles.profileInfoSection, { backgroundColor: colors.card }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MT</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.profileName, { color: colors.text }]}>Minh Tuấn</Text>
          <Text style={[styles.profileUsername, { color: colors.textTertiary }]}>@minhtuan_pb</Text>
          <Text style={[styles.profileBio, { color: colors.textSecondary }]}>
            🏓 Pickleball enthusiast | 🏆 Level 4.5 | 📍 TP.HCM
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={handleEditProfile}
          >
            <Text style={styles.editBtnText}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <StatCard key={idx} item={stat} />
          ))}
        </View>

        <View style={styles.quickActionsSection}>
          <TouchableOpacity style={[styles.quickActionItem, { backgroundColor: colors.cardSecondary }]}>
            <MaterialCommunityIcons name="star" size={20} color="#00D9B5" />
            <Text style={[styles.quickActionLabel, { color: colors.text }]}>Giải đấu của tôi</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionItem, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons name="calendar" size={20} color="#FF9800" />
            <Text style={[styles.quickActionLabel, { color: colors.text }]}>Lịch sử đặt sân</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionItem, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons name="heart" size={20} color="#E91E63" />
            <Text style={[styles.quickActionLabel, { color: colors.text }]}>Sân yêu thích</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>Thành tích</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} item={achievement} />
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>Cài đặt</Text>
          <View style={[styles.settingsMenu, { backgroundColor: colors.card }]}>
            {settingsItems.map((item) => (
              <SettingItemComponent key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default UserPage;
