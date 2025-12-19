import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumMapStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      marginTop: 8,
    },
    map: {
      height: 256,
      backgroundColor: `${AppColors.primary}20`,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: AppColors.primary,
    },
    button: {
      padding: 12,
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      borderRadius: Radius.full,
    },
    buttonIcon: {
      fontSize: 24,
      color: AppColors.primary,
      transform: [{ translateY: 1 }],
    },
  });
