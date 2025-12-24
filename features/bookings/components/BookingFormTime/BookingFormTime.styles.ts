import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getBookingFormTimeStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    grid: {
      marginTop: 0,
    },
    item: {
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.lg,
      backgroundColor: colors.card,
      gap: 4,
    },
    itemSelected: {
      backgroundColor: AppColors.primary,
      borderColor: AppColors.primary,
    },
    itemDisabled: {
      backgroundColor: colors.muted,
      borderColor: colors.muted,
      opacity: 0.5,
    },
  });
