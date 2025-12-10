import { RHFTextInput } from '@/components/rhf/RHFTextInput';
import { styles } from '@/constants/styles/login.styles';
import { useSession } from '@/contexts/AuthProvider';
import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { z } from 'zod';

const loginSchema = z.object({
  username: z.union([
    z.email('Vui lòng nhập đúng định dạng').min(1, 'Không được để trống'),
    z
      .string()
      .min(1, 'Không được để trống')
      .regex(
        /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g,
        'Vui lòng nhập đúng định dạng'
      ),
  ]),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
            <RHFTextInput
              controller={{
                control: control,
                name: 'username',
                message: errors.username?.message,
              }}
              label='Email hoặc số điện thoại'
              input={{
                style: [
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ],
                placeholder: 'op@gmail.com',
              }}
            />

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
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={[styles.passwordInput, { color: colors.text }]}
                      placeholder='Nhập mật khẩu'
                      placeholderTextColor={colors.textTertiary}
                      secureTextEntry={!showPassword}
                    />
                  )}
                  name='password'
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
              {errors.password && (
                <Text style={{ color: colors.error, marginTop: 8 }}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View style={styles.rowBetween}>
              <TouchableOpacity>
                <Text style={styles.linkText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
              // onPress={handleLogin}
              onPress={onSubmit}
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
