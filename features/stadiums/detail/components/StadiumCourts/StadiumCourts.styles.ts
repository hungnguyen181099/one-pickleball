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
      flexDirection: 'row',
      alignItems: 'center',
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
    statusActive: {
      backgroundColor: `${AppColors.success}20`,
      color: AppColors.success,
    },
    statusInactive: {
      backgroundColor: `${AppColors.error}20`,
      color: AppColors.error,
    },
  });
