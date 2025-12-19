import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumHeaderStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    openState: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: AppColors.success,
      backgroundColor: `${AppColors.success}20`,
      borderRadius: Radius.full,
      gap: 8,
    },
    openStateDot: {
      width: 8,
      height: 8,
      borderRadius: Radius.full,
      backgroundColor: AppColors.success,
    },
    openStateText: {
      color: AppColors.success,
      fontWeight: 600,
    },
    courtsIcon: {
      color: colors.textSecondary,
      fontSize: 16,
      transform: [{ translateY: 1 }],
    },
    contact: {
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.background,
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    contactIcon: {
      color: AppColors.primary,
      fontSize: 24,
      transform: [{ translateY: 1 }],
    },
    card: {
      borderRadius: 32,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.background,
      padding: 24,
    },
    cardIcon: {
      width: 48,
      height: 48,
      backgroundColor: `${AppColors.primary}20`,
      borderRadius: Radius.full,
    },
    cardItemIcon: {
      color: AppColors.primary,
      fontSize: 20,
    },
    cardItemText: {
      flex: 1,
    },
    cardDivider: {
      height: 1,
      marginVertical: 16,
      backgroundColor: colors.border,
    },
    ratingIcon: {
      fontSize: 20,
      color: '#FFC107',
    },
    ratingAction: {
      backgroundColor: colors.backgroundTertiary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: Radius.full,
    },
  });
