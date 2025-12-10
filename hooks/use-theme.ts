import { useContext } from 'react';

import { Colors } from '@/constants/theme';

import { ThemeContext } from '@/contexts/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function useThemedColors() {
  const { theme } = useTheme();
  return Colors[theme];
}
