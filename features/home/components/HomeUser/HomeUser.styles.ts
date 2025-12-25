import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';
import { hexToHexAlpha } from '@/utils/hexToHexAlpha';

export const getHomeUserStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    corner: {
      width: 200,
      aspectRatio: 1 / 1,
      backgroundColor: hexToHexAlpha(AppColors.primary),
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: Radius.full,
      transform: [{ translateX: 100 }, { translateY: -100 }],
    },
    avatar: {
      borderWidth: 4,
      borderColor: hexToHexAlpha(AppColors.primary),
      borderRadius: Radius.full,
      padding: 4,
    },
    badgeContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transform: [{ translateY: 8 }],
    },
    badge: {
      borderWidth: 4,
      borderColor: colors.card,
    },
    name: {
      marginTop: 24,
    },
    nameBadge: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: Radius.full,
      backgroundColor: colors.secondary,
    },
    ocrItem: {
      paddingTop: 12,
      paddingBottom: 8,
      borderRadius: Radius.full,
      borderWidth: 1,
    },
    ocrItemSecondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    ocrItemSuccess: {
      backgroundColor: hexToHexAlpha(AppColors.success),
      borderColor: hexToHexAlpha(AppColors.success),
    },
    ocrItemError: {
      backgroundColor: hexToHexAlpha(AppColors.error),
      borderColor: hexToHexAlpha(AppColors.error),
    },
    oprContainer: {
      borderWidth: 1,
      borderColor: colors.secondary,
      backgroundColor: colors.secondary,
      borderRadius: Radius.full,
      paddingVertical: 8,
      marginTop: 24,
    },
    oprItem: {
      flex: 1,
    },
  });
