import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/setting.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function SecurityAndPrivacyScreen() {
  const colors = useThemedColors();

  // Security settings
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [shareLocation, setShareLocation] = useState(false);

  // Data settings
  const [dataCollection, setDataCollection] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  const renderSettingsItem = (
    icon: string,
    label: string,
    onPress?: () => void,
    value?: string,
    isLast?: boolean,
    isDanger?: boolean
  ) => (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
        isLast && styles.settingsItemLast,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <Ionicons
          name={icon as any}
          size={22}
          color={isDanger ? colors.error : colors.icon}
          style={styles.settingsIcon}
        />
        <Text style={[styles.settingsLabel, { color: isDanger ? colors.error : colors.text }]}>{label}</Text>
      </View>
      <View style={styles.settingsItemRight}>
        {value && <Text style={[styles.settingsValue, { color: colors.textSecondary }]}>{value}</Text>}
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </View>
    </TouchableOpacity>
  );

  const renderToggleItem = (
    icon: string,
    label: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
    isLast?: boolean
  ) => (
    <View
      style={[
        styles.toggleItem,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
        isLast && styles.settingsItemLast,
      ]}
    >
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon as any} size={22} color={colors.icon} style={styles.settingsIcon} />
        <View style={styles.toggleContent}>
          <Text style={[styles.toggleLabel, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: '#00D9B580' }}
        thumbColor={value ? '#00D9B5' : colors.backgroundTertiary}
        style={styles.toggleSwitch}
      />
    </View>
  );

  const handleChangePassword = () => {
    console.log('Change password');
  };

  const handleManageSessions = () => {
    console.log('Manage sessions');
  };

  const handleBlockedAccounts = () => {
    console.log('Blocked accounts');
  };

  const handleDownloadData = () => {
    Alert.alert('Tải xuống dữ liệu', 'Chúng tôi sẽ gửi một bản sao dữ liệu của bạn qua email trong vòng 48 giờ.', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xác nhận',
        onPress: () => console.log('Download data confirmed'),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Xóa tài khoản', 'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa tài khoản',
        style: 'destructive',
        onPress: () => console.log('Delete account confirmed'),
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Bảo mật & quyền riêng tư</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Security Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>BẢO MẬT</Text>
          <View style={styles.settingsMenu}>
            {renderSettingsItem('lock-closed-outline', 'Đổi mật khẩu', handleChangePassword)}
            {renderToggleItem(
              'finger-print',
              'Xác thực sinh trắc học',
              'Sử dụng vân tay hoặc Face ID',
              biometricAuth,
              setBiometricAuth
            )}
            {renderToggleItem(
              'shield-checkmark-outline',
              'Xác thực hai yếu tố',
              'Bảo vệ tài khoản với mã OTP',
              twoFactorAuth,
              setTwoFactorAuth
            )}
            {renderToggleItem(
              'notifications-outline',
              'Cảnh báo đăng nhập',
              'Thông báo khi có đăng nhập mới',
              loginAlerts,
              setLoginAlerts
            )}
            {renderSettingsItem(
              'phone-portrait-outline',
              'Quản lý phiên đăng nhập',
              handleManageSessions,
              undefined,
              true
            )}
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>QUYỀN RIÊNG TƯ</Text>
          <View style={styles.settingsMenu}>
            {renderToggleItem(
              'eye-outline',
              'Hiển thị hồ sơ công khai',
              'Cho phép người khác xem hồ sơ',
              profileVisibility,
              setProfileVisibility
            )}
            {renderToggleItem(
              'radio-button-on-outline',
              'Hiển thị trạng thái online',
              'Người khác thấy bạn đang online',
              showOnlineStatus,
              setShowOnlineStatus
            )}
            {renderToggleItem(
              'chatbubble-outline',
              'Cho phép tin nhắn',
              'Nhận tin nhắn từ người khác',
              allowMessages,
              setAllowMessages
            )}
            {renderToggleItem(
              'location-outline',
              'Chia sẻ vị trí',
              'Hiển thị vị trí trong tìm kiếm sân',
              shareLocation,
              setShareLocation
            )}
            {renderSettingsItem('ban-outline', 'Tài khoản đã chặn', handleBlockedAccounts, undefined, true)}
          </View>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>DỮ LIỆU & LƯU TRỮ</Text>
          <View style={styles.settingsMenu}>
            {renderToggleItem(
              'analytics-outline',
              'Thu thập dữ liệu',
              'Giúp cải thiện trải nghiệm',
              dataCollection,
              setDataCollection
            )}
            {renderToggleItem(
              'megaphone-outline',
              'Quảng cáo cá nhân hóa',
              'Hiển thị quảng cáo phù hợp',
              personalizedAds,
              setPersonalizedAds
            )}
            {renderSettingsItem('download-outline', 'Tải xuống dữ liệu của bạn', handleDownloadData, undefined, true)}
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>PHÁP LÝ</Text>
          <View style={styles.settingsMenu}>
            {renderSettingsItem('document-text-outline', 'Điều khoản sử dụng', () => console.log('Terms of service'))}
            {renderSettingsItem('shield-outline', 'Chính sách bảo mật', () => console.log('Privacy policy'))}
            {renderSettingsItem(
              'information-circle-outline',
              'Quyền của bạn',
              () => console.log('Your rights'),
              undefined,
              true
            )}
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.error }]}>VÙNG NGUY HIỂM</Text>
          <View style={styles.settingsMenu}>
            {renderSettingsItem('trash-outline', 'Xóa tài khoản', handleDeleteAccount, undefined, true, true)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
