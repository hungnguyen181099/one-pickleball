/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from 'react-native';

const tintColorLight = '#00D9B5';
const tintColorDark = '#00D9B5';

export type ThemeColor = {
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
};

type ThemeColors = {
  light: ThemeColor;
  dark: ThemeColor;
};

export const Colors: ThemeColors = {
  light: {
    text: '#11181C',
    textSecondary: '#666',
    textTertiary: '#999',
    background: '#fff',
    backgroundSecondary: '#f9f9f9',
    backgroundTertiary: '#f5f5f5',
    card: '#fff',
    cardSecondary: '#f9f9f9',
    border: '#f0f0f0',
    borderSecondary: '#e0e0e0',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    input: '#f5f5f5',
    inputBorder: '#e0e0e0',
    shadow: '#000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    error: '#EF4444',
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
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    input: '#1E293B',
    inputBorder: '#334155',
    shadow: '#000',
    overlay: 'rgba(0, 0, 0, 0.7)',
    error: '#EF4444',
  },
};

export const AppColors = {
  primary: '#00D9B5',
  primaryDark: '#00B399',
  primaryLight: '#33E4C6',
  secondary: '#0099CC',
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
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
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

export const ZIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
