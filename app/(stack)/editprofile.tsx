import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/constants/styles/editprofile.styles';

import { useThemedColors } from '@/hooks/use-theme';

export default function EditProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const colors = useThemedColors();
  const [name, setName] = useState('Minh Tuấn');
  const [username, setUsername] = useState('minhtuan_pb');
  const [email, setEmail] = useState('minhtuan@example.com');
  const [phone, setPhone] = useState('0975241204');
  const [bio, setBio] = useState('🏓 Pickleball enthusiast | 🏆 Level 4.5 | 📍 TP.HCM');
  const [location, setLocation] = useState('TP. Hồ Chí Minh');
  const [skillLevel, setSkillLevel] = useState('4.5');

  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên của bạn');
      return;
    }

    if (!username.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên người dùng');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    }, 1000);
  };

  const handleChangeAvatar = () => {
    Alert.alert('Thay đổi ảnh đại diện', 'Chọn nguồn ảnh', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Chụp ảnh', onPress: () => console.log('Camera') },
      { text: 'Chọn từ thư viện', onPress: () => pickImage() },
    ]);
  };

  const handleChangeCover = () => {
    Alert.alert('Thay đổi ảnh bìa', 'Chọn nguồn ảnh', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Chụp ảnh', onPress: () => console.log('Camera') },
      { text: 'Chọn từ thư viện', onPress: () => console.log('Gallery') },
    ]);
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' = 'default',
    multiline: boolean = false,
    maxLength?: number
  ) => (
    <View style={styles.inputGroup}>
      <View style={styles.inputLabel}>
        <Ionicons name={icon as any} size={18} color={colors.icon} />
        <Text style={[styles.labelText, { color: colors.text }]}>{label}</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          {
            backgroundColor: colors.backgroundTertiary,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        maxLength={maxLength}
      />
      {maxLength && (
        <Text style={[styles.charCount, { color: colors.textTertiary }]}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Chỉnh sửa trang cá nhân</Text>
        <TouchableOpacity style={styles.backBtn} onPress={handleSave} disabled={isLoading}>
          <Text style={[styles.saveText, { color: isLoading ? colors.textTertiary : colors.tint }]}>
            {isLoading ? 'Đang lưu...' : 'Lưu'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cover & Avatar Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={[styles.coverPhoto, { backgroundColor: colors.backgroundTertiary }]}
            onPress={handleChangeCover}
          >
            <Ionicons name="camera" size={32} color={colors.textTertiary} />
            <Text style={[styles.photoText, { color: colors.textSecondary }]}>Thay đổi ảnh bìa</Text>
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <TouchableOpacity style={[styles.avatar, { backgroundColor: colors.tint }]} onPress={handleChangeAvatar}>
              <Text style={styles.avatarText}>MT</Text>
              {image && <Image source={{ uri: image }} style={styles.avatarImage} />}
              <View style={styles.avatarOverlay}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Section */}
        <View style={[styles.settingsSection, { marginTop: 60 }]}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>THÔNG TIN CƠ BẢN</Text>
          <View style={[styles.settingsMenu, { backgroundColor: colors.card }]}>
            {renderInput('Họ và tên', name, setName, 'Nhập họ và tên', 'person-outline')}
            {renderInput('Tên người dùng', username, setUsername, 'Nhập tên người dùng', 'at', 'default')}
            {renderInput('Email', email, setEmail, 'Nhập email', 'mail-outline', 'email-address')}
            {renderInput('Số điện thoại', phone, setPhone, 'Nhập số điện thoại', 'call-outline', 'phone-pad')}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>GIỚI THIỆU</Text>
          <View style={[styles.settingsMenu, { backgroundColor: colors.card }]}>
            {renderInput('Tiểu sử', bio, setBio, 'Viết vài dòng về bạn...', 'create-outline', 'default', true, 150)}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>PICKLEBALL</Text>
          <View style={[styles.settingsMenu, { backgroundColor: colors.card }]}>
            {renderInput('Trình độ', skillLevel, setSkillLevel, 'VD: 4.5', 'trophy-outline', 'numeric')}
            {renderInput('Vị trí', location, setLocation, 'Nhập vị trí', 'location-outline')}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
