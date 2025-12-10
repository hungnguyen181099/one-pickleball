import React, { useState } from 'react';

import { UserAchievement, UserSettingsItem, UserStatCardProps } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Grid, GridItem } from '@/components/ui/Grid';
import { AchievementCard, SettingItemComponent, StatCard } from '@/components/user';

import { styles } from '@/constants/styles/user.styles';

import { useSession } from '@/contexts/AuthProvider';

import { useTheme, useThemedColors } from '@/hooks/use-theme';

const UserPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const colors = useThemedColors();
  const { signOut, user } = useSession();

  console.log(user);

  const stats: UserStatCardProps[] = [
    { number: (user?.total_ocr_matches || 0).toString(), label: 'Trận đấu' },
    {
      number: user?.elo_rating ? user.elo_rating.toString() : 'N/A',
      label: 'ELO',
    },
    { number: user?.elo_rank || 'N/A', label: 'Rank' },
    { number: user?.opr_level || 'N/A', label: 'OPR' },
  ];

  const achievements: UserAchievement[] = [
    { id: '1', name: 'Vô địch HCM 2024', emoji: '🏆', locked: false },
    { id: '2', name: 'Á quân VN Cup', emoji: '🥈', locked: false },
    { id: '3', name: 'Hạng 3 Open', emoji: '🥉', locked: false },
    { id: '4', name: 'Chưa mở khóa', emoji: '🔒', locked: true },
  ];

  const quickActions = [
    {
      icon: <MaterialCommunityIcons name="star" size={20} color="#00D9B5" />,
      name: 'Giải đấu của tôi',
      href: '/mytournament',
    },
    {
      icon: <Ionicons name="calendar" size={20} color="#FF9800" />,
      name: 'Lịch sử đặt sân',
      href: '/historybooking',
    },
    {
      icon: <Ionicons name="heart" size={20} color="#E91E63" />,
      name: 'Sân yêu thích',
      href: '/favoritefield',
    },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleMyTournament = () => {
    router.navigate('/mytournament');
  };

  const handleMyHistory = () => {
    console.log('My History pressed');
  };

  const handleMyFavorite = () => {
    console.log('My Favorite pressed');
  };

  const settingsItems: UserSettingsItem[] = [
    {
      id: '1',
      icon: 'cog',
      label: 'Cài đặt chung',
      route: '/setting',
    },
    {
      id: '3',
      icon: 'lock',
      label: 'Bảo mật & quyền riêng tư',
      route: '/securityandprivacy',
    },
    {
      id: '4',
      icon: 'bell',
      label: 'Thông báo',
      route: '/notification',
    },
    {
      id: '5',
      icon: 'help-circle',
      label: 'Trợ giúp & hỗ trợ',
      route: '/helpandsupport',
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
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', onPress: () => {}, style: 'cancel' },
      {
        text: 'Đăng xuất',
        onPress: () => {
          signOut();
        },
        style: 'destructive',
      },
    ]);
  };

  const handleEditProfile = () => {
    router.navigate('/editprofile');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.coverSection}>
          <View style={styles.cover} />
        </View>

        <View style={[styles.profileInfoSection, { backgroundColor: colors.card }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(user?.name || 'U').charAt(0).toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.profileName, { color: colors.text }]}>{user?.name || 'Người dùng'}</Text>
          <Text style={[styles.profileUsername, { color: colors.textTertiary }]}>
            {user?.email || 'Chưa cập nhật email'}
          </Text>
          <Text style={[styles.profileBio, { color: colors.textSecondary }]}>
            Role: {user?.role_type || 'User'} | Status: {user?.status || 'Active'}
          </Text>

          <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
            <Text style={styles.editBtnText}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
        </View>

        <Grid columns={4} gap={8} style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <GridItem key={idx}>
              <StatCard item={stat} />
            </GridItem>
          ))}
        </Grid>

        <Grid columns={1} gap={4} style={styles.quickActionsSection}>
          {quickActions.map((action, idx) => (
            <GridItem key={idx}>
              <TouchableOpacity
                onPress={() => router.push(action.href as Href)}
                style={[styles.quickActionItem, { backgroundColor: colors.cardSecondary }]}
              >
                {action.icon}
                <Text style={[styles.quickActionLabel, { color: colors.text }]}>{action.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            </GridItem>
          ))}
        </Grid>

        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>Thành tích</Text>
          <Grid columns={2} gap={8}>
            {achievements.map((achievement) => (
              <GridItem key={achievement.id}>
                <AchievementCard item={achievement} />
              </GridItem>
            ))}
          </Grid>
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
};

export default UserPage;
