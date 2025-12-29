import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { StatusBar } from 'expo-status-bar';

export const StatusBarWrapper = () => {
  const { theme } = useTheme();
  return (
    <StatusBar
      style={theme === 'dark' ? 'light' : 'dark'}
    />
  );
};
