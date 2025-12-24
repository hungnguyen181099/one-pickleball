import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumHeaderStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    courtsIcon: {
      color: colors.textSecondary,
      fontSize: 16,
      transform: [{ translateY: 1 }],
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardItemIcon: {
      color: AppColors.primary,
      fontSize: 20,
    },
    cardItemText: {
      flex: 1,
    },
    ratingIcon: {
      fontSize: 20,
      color: '#FFC107',
    },
    ratingAction: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: Radius.full,
    },
  });
