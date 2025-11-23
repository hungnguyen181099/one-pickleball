import { styles } from '@/assets/styles/register.styles';
import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreeTerms: boolean;
}

export default function RegisterScreen() {
  const { theme } = useTheme();
  const colors = useThemedColors();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản sử dụng và Chính sách bảo mật');
      return;
    }

    setLoading(true);
    try {
      console.log('Register attempt:', formData);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    console.log('Register with:', provider);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.titleSection}>
            <View style={styles.logo}>
              <AntDesign name="check" size={40} color="#fff" />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Tạo tài khoản</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Tham gia cộng đồng Pickleball ngay hôm nay</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Họ và tên</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
                placeholder="Nhập họ và tên"
                placeholderTextColor={colors.textTertiary}
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
              />
            </View>


            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
                placeholder="Nhập email"
                placeholderTextColor={colors.textTertiary}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>


            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Số điện thoại</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
                placeholder="Nhập số điện thoại"
                placeholderTextColor={colors.textTertiary}
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Mật khẩu</Text>
              <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.border }]}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder="Tạo mật khẩu"
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


            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  { borderColor: colors.border },
                  formData.agreeTerms && styles.checkboxChecked,
                ]}
                onPress={() => handleInputChange('agreeTerms', !formData.agreeTerms)}
              >
                {formData.agreeTerms && (
                  <Ionicons name="checkmark" size={14} color="#00D9B5" />
                )}
              </TouchableOpacity>
              <View style={styles.termsText}>
                <Text style={[styles.termsLabel, { color: colors.text }]}>
                  Tôi đồng ý với{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Điều khoản sử dụng</Text>
                </TouchableOpacity>
                <Text style={[styles.termsLabel, { color: colors.text }]}> và </Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Chính sách bảo mật</Text>
                </TouchableOpacity>
              </View>
            </View>


            <TouchableOpacity
              style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Text>
            </TouchableOpacity>
          </View>


          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>Hoặc đăng ký với</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Social Register */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialRegister('facebook')}
            >
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialRegister('google')}
            >
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Google</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.navigate('/(auth)')}>
              <Text style={styles.linkTextBold}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

