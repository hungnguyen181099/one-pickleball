import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors } from '@/constants/theme';

export const getStadiumCourtsStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginTop: 32,
    },
    list: {
      gap: 16,
    },
    card: {
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.background,
    },
    left: {
      flex: 1,
      gap: 8,
    },
    icon: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    price: {
      flexShrink: 0,
    },
    status: {
      paddingVertical: 2,
      paddingHorizontal: 8,
      textTransform: 'uppercase',
      borderRadius: 8,
    },
    statusActive: {
      backgroundColor: `${AppColors.success}20`,
      color: AppColors.success,
    },
    statusInactive: {
      backgroundColor: `${AppColors.error}20`,
      color: AppColors.error,
    },
  });
