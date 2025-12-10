import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/setting.styles';

import { useTheme, useThemedColors } from '@/hooks/use-theme';

export default function SettingScreen() {
  const { theme, toggleTheme, themeMode, setThemeMode } = useTheme();
  const colors = useThemedColors();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);

  const renderSettingsItem = (icon: string, label: string, onPress?: () => void, value?: string, isLast?: boolean) => (
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
        <Ionicons name={icon as any} size={22} color={colors.icon} style={styles.settingsIcon} />
        <Text style={[styles.settingsLabel, { color: colors.text }]}>{label}</Text>
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Cài đặt</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Tài khoản</Text>
          <View style={styles.settingsMenu}>
            {renderSettingsItem('person-outline', 'Thông tin cá nhân', () => console.log('Profile'))}
            {renderSettingsItem(
              'lock-closed-outline',
              'Đổi mật khẩu',
              () => console.log('Change password'),
              undefined,
              true
            )}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Thông báo</Text>
          <View style={styles.settingsMenu}>
            {renderToggleItem(
              'notifications-outline',
              'Thông báo push',
              'Nhận thông báo trên thiết bị',
              pushNotifications,
              setPushNotifications
            )}
            {renderToggleItem(
              'mail-outline',
              'Email thông báo',
              'Nhận email về sự kiện',
              emailNotifications,
              setEmailNotifications
            )}
            {renderToggleItem(
              'call-outline',
              'SMS nhắc nhở',
              'Nhận SMS về đặt sân',
              smsReminders,
              setSmsReminders,
              true
            )}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Hiển thị</Text>
          <View style={styles.settingsMenu}>
            <View style={[styles.toggleItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
              <View style={styles.settingsItemLeft}>
                <Ionicons name="contrast-outline" size={22} color={colors.icon} style={styles.settingsIcon} />
                <View style={styles.toggleContent}>
                  <Text style={[styles.toggleLabel, { color: colors.text }]}>Giao diện</Text>
                  <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>Chọn chế độ hiển thị</Text>
                </View>
              </View>

              <View style={[styles.themeSwitcher, { backgroundColor: colors.backgroundTertiary }]}>
                <TouchableOpacity
                  onPress={() => setThemeMode('light')}
                  style={[
                    styles.themeOption,
                    themeMode === 'light' && {
                      backgroundColor: colors.card,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                  ]}
                >
                  <Ionicons name="sunny" size={18} color={themeMode === 'light' ? '#FDB813' : colors.textTertiary} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setThemeMode('auto')}
                  style={[
                    styles.themeOption,
                    themeMode === 'auto' && {
                      backgroundColor: colors.card,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.themeOptionText,
                      { color: themeMode === 'auto' ? colors.text : colors.textTertiary },
                    ]}
                  >
                    Auto
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setThemeMode('dark')}
                  style={[
                    styles.themeOption,
                    themeMode === 'dark' && {
                      backgroundColor: colors.card,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                  ]}
                >
                  <Ionicons name="moon" size={16} color={themeMode === 'dark' ? '#9BA1A6' : colors.textTertiary} />
                </TouchableOpacity>
              </View>
            </View>
            {renderSettingsItem('language-outline', 'Ngôn ngữ', () => console.log('Language'), 'Tiếng Việt', true)}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Khác</Text>
          <View style={styles.settingsMenu}>
            {renderSettingsItem('information-circle-outline', 'Về onePickleball', () => console.log('About'), 'v1.0.0')}
            {renderSettingsItem('document-text-outline', 'Điều khoản sử dụng', () => console.log('Terms'))}
            {renderSettingsItem(
              'shield-checkmark-outline',
              'Chính sách bảo mật',
              () => console.log('Privacy'),
              undefined,
              true
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
