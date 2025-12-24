import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getHomeScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    body: {
      padding: 16,
      gap: 32,
    },
  });
