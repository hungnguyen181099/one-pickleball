import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/register.styles';
import { ThemedText, ThemedTextProps } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedView } from '@/components/themed-view';

const { width } = Dimensions.get('window');

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreeTerms: boolean;
}

export default function RegisterScreen({
  lightColor,
  darkColor,
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28}  color={color}/>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.logo}>
            <AntDesign name="check" size={40} color="#fff" />
          </View>
          <ThemedText style={styles.title}>Tạo tài khoản</ThemedText>
          <ThemedText style={styles.subtitle}>Tham gia cộng đồng Pickleball ngay hôm nay</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Full Name Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Họ và tên</ThemedText>
            <ThemedView>
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            /></ThemedView>
          </View>

          {/* Email Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedView>
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            /></ThemedView>
          </View>

          {/* Phone Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Số điện thoại</ThemedText>
            <ThemedView>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            /></ThemedView>
          </View>

          {/* Password Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Mật khẩu</ThemedText>
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Tạo mật khẩu"
                placeholderTextColor="#999"
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
                  color="#666"
                />
              </TouchableOpacity>
            </ThemedView>
          </View>

          {/* Terms Agreement */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.agreeTerms && styles.checkboxChecked,
              ]}
              onPress={() => handleInputChange('agreeTerms', !formData.agreeTerms)}
            >
              {formData.agreeTerms && (
                <Ionicons name="checkmark" size={14} color="#00D9B5" />
              )}
            </TouchableOpacity>
            <View style={styles.termsText}>
              <ThemedText style={styles.termsLabel}>
                Tôi đồng ý với{' '}
              </ThemedText>
              <TouchableOpacity>
                <Text style={styles.linkText}>Điều khoản sử dụng</Text>
              </TouchableOpacity>
              <ThemedText style={styles.termsLabel}> và </ThemedText>
              <TouchableOpacity>
                <Text style={styles.linkText}>Chính sách bảo mật</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
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

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng ký với</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Register */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialRegister('facebook')}
          >
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialRegister('google')}
          >
            <AntDesign name="google" size={20} color="#EA4335" />
            <ThemedText style={styles.socialButtonText}>Google</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Đã có tài khoản? </ThemedText>
          <TouchableOpacity onPress={() => router.navigate('/(auth)')}>
            <Text style={styles.linkTextBold}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

