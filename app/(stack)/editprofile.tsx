import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFTextInput } from '@/components/rhf/RHFTextInput';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { phoneRegex } from '@/constants/global.constants';

const editProfileSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên của bạn'),
  email: z.email('Email không hợp lệ'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại').regex(phoneRegex, 'Số điện thoại không hợp lệ'),
});

import { Text } from '@/components/ui/Text';
import { styles } from '@/constants/styles/editprofile.styles';
import { useSession } from '@/contexts/AuthProvider';
import { useThemedColors } from '@/hooks/use-theme';

export default function EditProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const colors = useThemedColors();
  const { user: sessionUser, isLoading: isSessionLoading } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showSheet, setShowSheet] = useState<boolean>(false);
  const [previewType, setPreviewType] = useState<'avatar' | 'cover'>('avatar');

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // Watch name for avatar fallback
  const watchedName = watch('name');

  useEffect(() => {
    if (sessionUser) {
      reset({
        name: sessionUser.name,
        email: sessionUser.email,
        phone: sessionUser.phone || '',
      });
      if (sessionUser.avatar) {
        setImage(sessionUser.avatar);
      }
    }
  }, [sessionUser, reset]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: previewType === 'avatar' ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (previewType === 'avatar') {
        setImage(uri);
      } else {
        setCoverImage(uri);
      }
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the camera is required.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: previewType === 'avatar' ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (previewType === 'avatar') {
        setImage(uri);
      } else {
        setCoverImage(uri);
      }
    }
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    // Simulate API call for now as update endpoint is not yet defined in auth service/confirmed
    // In a real scenario, you would call authService.updateProfile(user) here
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
      console.log('Saving user data:', { ...data, avatar: image });
    }, 1000);
  });

  const handleChangeAvatar = () => {
    setPreviewType('avatar');
    setShowSheet(true);
  };

  const handleChangeCover = () => {
    setPreviewType('cover');
    setShowSheet(true);
  };

  const handleDeletePhoto = () => {
    if (previewType === 'avatar') {
      setImage(null);
    } else {
      setCoverImage(null);
    }
  };


  if (!sessionUser && isSessionLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Đang tải...</Text>
      </View>
    );
  }

  // Fallback if no user is found/not logged in, though protected routes usually prevent this
  if (!sessionUser) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Không tìm thấy thông tin người dùng.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.tint }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <TouchableOpacity style={styles.backBtn} onPress={onSubmit} disabled={isLoading}>
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
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={StyleSheet.absoluteFill} />
            ) : (
              <>
                <Ionicons name="camera" size={32} color={colors.textTertiary} />
                <Text style={[styles.photoText, { color: colors.textSecondary }]}>Thay đổi ảnh bìa</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <TouchableOpacity style={[styles.avatar, { backgroundColor: colors.tint }]} onPress={handleChangeAvatar}>
              <Text style={styles.avatarText}>{watchedName ? watchedName.substring(0, 1).toUpperCase() : '??'}</Text>
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
          <View style={[styles.settingsMenu, { backgroundColor: colors.card, padding: 16 }]}>
            <RHFLayout>
              <RHFTextInput
                controller={{
                  control: control,
                  name: 'name',
                  message: errors.name?.message,
                }}
                label="Họ và tên"
                input={{
                  placeholder: 'Phạm Thảo',
                }}
              />
              <RHFTextInput
                controller={{
                  control: control,
                  name: 'email',
                  message: errors.email?.message,
                }}
                label="Email"
                input={{
                  placeholder: 'phamthao@gmail.com',
                  keyboardType: 'email-address',
                }}
              />
              <RHFTextInput
                controller={{
                  control: control,
                  name: 'phone',
                  message: errors.phone?.message,
                }}
                label="Số điện thoại"
                input={{
                  placeholder: '0987654321',
                  keyboardType: 'phone-pad',
                }}
              />
            </RHFLayout>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>PICKLEBALL</Text>
          <View style={[styles.settingsMenu, { backgroundColor: colors.card, padding: 16 }]}>
            {/* OPR Level - Mapped to Skill Level, assuming edible or at least visible */}
            <View>
              <Text style={{ marginBottom: 8, color: colors.text }}>OPR Level </Text>
              <Text style={{ padding: 12, backgroundColor: colors.backgroundSecondary, borderRadius: 8, color: colors.textTertiary, borderWidth: 1, borderColor: colors.border }}>
                {sessionUser.opr_level?.toString() || '0'}
              </Text>
            </View>

            {/* ELO Rating - Read only example */}
            <View>
              <Text style={{ marginBottom: 8, color: colors.text }}>ELO Rating</Text>
              <Text style={{ padding: 12, backgroundColor: colors.backgroundSecondary, borderRadius: 8, color: colors.textTertiary, borderWidth: 1, borderColor: colors.border }}>
                {sessionUser.elo_rating?.toString() || '0'}
              </Text>
            </View>
            <View>
              <Text style={{ marginBottom: 8, color: colors.text }}>ELO Rank</Text>
              <Text style={{ padding: 12, backgroundColor: colors.backgroundSecondary, borderRadius: 8, color: colors.textTertiary, borderWidth: 1, borderColor: colors.border }}>
                {sessionUser.elo_rank?.toString() || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheet visible={showSheet} onVisibleChange={setShowSheet} >
        <View style={{ paddingHorizontal: 16, gap: 4 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              gap: 12,
            }}
            onPress={() => {
              setShowSheet(false);
              takePhoto();
            }}
          >
            <Ionicons name="camera-outline" size={24} color={colors.text} />
            <Text style={{ fontSize: 16, color: colors.text }}>Chụp ảnh</Text>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: colors.border, opacity: 0.5 }} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              gap: 12,
            }}
            onPress={() => {
              setShowSheet(false);
              pickImage();
            }}
          >
            <Ionicons name="image-outline" size={24} color={colors.text} />
            <Text style={{ fontSize: 16, color: colors.text }}>Chọn từ thư viện</Text>
          </TouchableOpacity>
          {((previewType === 'avatar' && image) || (previewType === 'cover' && coverImage)) && (
            <>
              <View style={{ height: 1, backgroundColor: colors.border, opacity: 0.5 }} />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  gap: 12,
                }}
                onPress={() => {
                  setShowSheet(false);
                  handleDeletePhoto();
                }}
              >
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                <Text style={{ fontSize: 16, color: "#FF3B30" }}>Xóa ảnh</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
