import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getHomeActionsStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    line: {
      width: 6,
      backgroundColor: AppColors.primary,
      borderRadius: Radius.full,
      opacity: 1,
    },
    item: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: Radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    itemActive: {
      backgroundColor: AppColors.primary,
      
    },
  });
