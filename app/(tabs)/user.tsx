import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "@/assets/styles/user";
import { AchievementCard, SettingItemComponent, StatCard } from "@/components/user";


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

  const settingsItems: SettingsItem[] = [
    {
      id: '1',
      icon: 'cog',
      label: 'Cài đặt chung',
      route: 'Settings',
    },
    {
      id: '2',
      icon: 'lock',
      label: 'Bảo mật & quyền riêng tư',
    },
    {
      id: '3',
      icon: 'bell',
      label: 'Thông báo',
    },
    {
      id: '4',
      icon: 'help-circle',
      label: 'Trợ giúp & hỗ trợ',
    },
    {
      id: '5',
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.coverSection}>
          <View style={styles.cover} />

        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MT</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>Minh Tuấn</Text>
          <Text style={styles.profileUsername}>@minhtuan_pb</Text>
          <Text style={styles.profileBio}>
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
          <TouchableOpacity style={styles.quickActionItem}>
            <MaterialCommunityIcons name="star" size={20} color="#00D9B5" />
            <Text style={styles.quickActionLabel}>Giải đấu của tôi</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionItem}>
            <Ionicons name="calendar" size={20} color="#FF9800" />
            <Text style={styles.quickActionLabel}>Lịch sử đặt sân</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionItem}>
            <Ionicons name="heart" size={20} color="#E91E63" />
            <Text style={styles.quickActionLabel}>Sân yêu thích</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Thành tích</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} item={achievement} />
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionHeading}>Cài đặt</Text>
          <View style={styles.settingsMenu}>
            {settingsItems.map((item) => (
              <SettingItemComponent key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserPage;
