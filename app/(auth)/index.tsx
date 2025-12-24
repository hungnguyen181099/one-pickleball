import React, { useState } from 'react';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFPassword } from '@/components/rhf/RHFPassword';
import { RHFTextInput } from '@/components/rhf/RHFTextInput';

import { phoneRegex } from '@/constants/global.constants';
import { styles } from '@/constants/styles/login.styles';

import { useSession } from '@/contexts/AuthProvider';

import { useTheme, useThemedColors } from '@/hooks/use-theme';

const loginSchema = z.object({
  username: z.union([
    z.email('Vui lòng nhập đúng định dạng').min(1, 'Không được để trống'),
    z.string().min(1, 'Không được để trống').regex(phoneRegex, 'Vui lòng nhập đúng định dạng'),
  ]),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export default function LoginScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const colors = useThemedColors();
  const { signIn } = useSession();
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response = await signIn({
        email: data.username,
        password: data.password,
      });

      if (!response.success) {
        alert(response.error || 'Đăng nhập thất bại');
      }
    } catch {
      alert('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  });

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Image style={styles.image} source={require('@/assets/images/logo.png')} />
              </View>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Chào mừng trở lại</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Đăng nhập để tiếp tục</Text>
          </View>

          <RHFLayout>
            <RHFTextInput
              controller={{
                control: control,
                name: 'username',
                message: errors.username?.message,
              }}
              label="Email hoặc số điện thoại"
              input={{
                placeholder: 'onepickleball@gmail.com',
              }}
            />

            <RHFPassword
              controller={{
                control: control,
                name: 'password',
                message: errors.password?.message,
              }}
              label="Mật khẩu"
              input={{
                placeholder: '********',
              }}
            />

            <Pressable>
              <Text style={styles.linkText}>Quên mật khẩu?</Text>
            </Pressable>

            <Pressable
              onPress={onSubmit}
              disabled={loading}
              style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
            </Pressable>
          </RHFLayout>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>Hoặc đăng nhập với</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialLogin('facebook')}
            >
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialLogin('google')}
            >
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.navigate('/(auth)/register')}>
              <Text style={styles.linkTextBold}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
