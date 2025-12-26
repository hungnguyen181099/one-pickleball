/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Dimensions, Platform } from 'react-native';

export type ThemeColors = {
  text: string;
  textSecondary: string;
  textTertiary: string;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  card: string;
  cardSecondary: string;
  border: string;
  borderSecondary: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  input: string;
  inputBorder: string;
  shadow: string;
  overlay: string;
  error: string;
  muted: string;
  mutedForeground: string;
  secondary: string;
  secondaryForeground: string;
  backgroundInverse: string;
  backgroundInverseForeground: string;
};

type ColorsType = Record<'light' | 'dark', ThemeColors>;

export const TOP_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const PAGE_PADDING = 16;

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Colors: ColorsType = {
  light: {
    text: '#11181C',
    textSecondary: '#666',
    textTertiary: '#999',
    background: '#f0f4f4',
    backgroundSecondary: '#f0f4f4',
    backgroundTertiary: '#f5f5f5',
    card: '#fff',
    cardSecondary: '#f9f9f9',
    border: '#e0e0e0',
    borderSecondary: '#e0e0e0',
    tint: '#00D9B5',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#00D9B5',
    input: '#f5f5f5',
    inputBorder: '#e0e0e0',
    shadow: '#000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    error: '#EF4444',

    // New
    muted: '#ECEFF1',
    mutedForeground: '#6B7280',
    secondary: '#F1F3F5',
    secondaryForeground: '#1C1F23',
    backgroundInverse: '#000000',
    backgroundInverseForeground: '#ffffff',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textTertiary: '#687076',
    background: '#151718',
    backgroundSecondary: '#1E293B',
    backgroundTertiary: '#0F172A',
    card: '#1E293B',
    cardSecondary: '#1E293B',
    border: '#334155',
    borderSecondary: '#475569',
    tint: '#00D9B5',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#00D9B5',
    input: '#1E293B',
    inputBorder: '#334155',
    shadow: '#000',
    overlay: 'rgba(0, 0, 0, 0.7)',
    error: '#EF4444',

    // New
    muted: '#262B31',
    mutedForeground: '#9CA3AF',
    secondary: '#1F2328',
    secondaryForeground: '#E6E8EB',
    backgroundInverse: '#ffffff',
    backgroundInverseForeground: '#000000',
  },
};

export const AppColors = {
  primary: '#00D9B5',
  primaryForeground: '#ffffff',
  primaryDark: '#00B399',
  primaryLight: '#33E4C6',

  accent: '#FF6B6B',

  // Gradient
  gradientPrimary: ['#00D9B5', '#0099CC'],
  gradientWarm: ['#FF6B6B', '#FF8E53'],
  gradientPurple: ['#667eea', '#764ba2'],
  gradientPink: ['#f093fb', '#f5576c'],
  gradientBlue: ['#4facfe', '#00f2fe'],

  /* Neutral Colors */
  white: '#FFFFFF',
  black: '#0A0E27',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',

  /* Status Colors */
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  successForeground: '#ffffff',
  warningForeground: '#ffffff',
  errorForeground: '#ffffff',
  infoForeground: '#ffffff',
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
};

export const Shadows = {
  '2xs': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 12,
  },
};
