import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getHomeActionsStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 32,
    },
    section: {
      gap: 16,
    },
    line: {
      width: 6,
      backgroundColor: AppColors.primary,
      borderRadius: Radius.full,
      opacity: 1,
    },
    itemActive: {
      backgroundColor: AppColors.primary,
    },
  });
