import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/login.styles';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { width } = Dimensions.get('window');

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log('Login attempt:', formData);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <AntDesign name="check" size={40} color="#fff" />
            </View>
          </View>
          <ThemedText style={styles.title}>Chào mừng trở lại</ThemedText>
          <ThemedText style={styles.subtitle}>Đăng nhập để tiếp tục</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email hoặc số điện thoại</ThemedText>
            <ThemedView>
              <TextInput
                style={styles.input}
                placeholder="Nhập email hoặc số điện thoại"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </ThemedView>
          </View>

          {/* Password Input */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Mật khẩu</ThemedText>
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu"
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

          {/* Remember & Forgot Password */}
          <View style={styles.rowBetween}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  formData.rememberMe && styles.checkboxChecked,
                ]}
                onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
              >
                {formData.rememberMe && (
                  <Ionicons name="checkmark" size={14} color="#00D9B5" />
                )}
              </TouchableOpacity>
              <ThemedText style={styles.checkboxLabel}>Ghi nhớ đăng nhập</ThemedText>
            </View>
            <TouchableOpacity>
              <ThemedText style={styles.linkText}>Quên mật khẩu?</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
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

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('facebook')}
          >
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('google')}
          >
            <AntDesign name="google" size={20} color="#EA4335" />
            <ThemedText style={styles.socialButtonText}>Google</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Chưa có tài khoản? </ThemedText>
          <TouchableOpacity onPress={() => router.navigate('/(auth)/register')}>
            <ThemedText style={styles.linkTextBold}>Đăng ký ngay</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

