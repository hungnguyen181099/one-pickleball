import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumFooterStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.inputBorder,
    },
    button: {
      padding: 16,
      backgroundColor: AppColors.primary,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonText: {
      color: AppColors.white,
    },
    buttonDisabled: {
      backgroundColor: colors.muted,
    },
    buttonTextDisabled: {
      color: colors.mutedForeground,
    },
  });
