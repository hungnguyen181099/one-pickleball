import { styles } from '@/constants/styles/login.styles';
import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { LoginFormData } from '@/types';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { useSession } from '@/contexts/AuthProvider';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const { theme } = useTheme();
  const colors = useThemedColors();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await signIn({
        email: formData.email,
        password: formData.password
      });

      if (!response.success) {
        alert(response.error || 'Đăng nhập thất bại');
      }
      
    } catch (error) {
      alert('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                {/* <AntDesign name="check" size={40} color="#fff" /> */}
                <Image
                  style={styles.image}
                  source={require('@/assets/images/logo.png')}
                />
              </View>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Chào mừng trở lại
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Đăng nhập để tiếp tục
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Email hoặc số điện thoại
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder='Nhập email hoặc số điện thoại'
                placeholderTextColor={colors.textTertiary}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Mật khẩu
              </Text>
              <View
                style={[
                  styles.passwordContainer,
                  { backgroundColor: colors.input, borderColor: colors.border },
                ]}
              >
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder='Nhập mật khẩu'
                  placeholderTextColor={colors.textTertiary}
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={colors.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rowBetween}>
              <View style={styles.checkboxContainer}>
                {/* <TouchableOpacity
                style={[
                  styles.checkbox,
                  { borderColor: colors.border },
                  formData.rememberMe && styles.checkboxChecked,
                ]}
                onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
              >
                {formData.rememberMe && (
                  <Ionicons name="checkmark" size={14} color="#00D9B5" />
                )}
              </TouchableOpacity>
              <Text style={[styles.checkboxLabel, { color: colors.text }]}>Ghi nhớ đăng nhập</Text> */}
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View
              style={[styles.dividerLine, { backgroundColor: colors.border }]}
            />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
              Hoặc đăng nhập với
            </Text>
            <View
              style={[styles.dividerLine, { backgroundColor: colors.border }]}
            />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => handleSocialLogin('facebook')}
            >
              <FontAwesome name='facebook' size={20} color='#1877F2' />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>
                Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => handleSocialLogin('google')}
            >
              <AntDesign name='google' size={20} color='#EA4335' />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>
                Google
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Chưa có tài khoản?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => router.navigate('/(auth)/register')}
            >
              <Text style={styles.linkTextBold}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
