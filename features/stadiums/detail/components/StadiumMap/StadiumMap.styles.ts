import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumMapStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
    },
    map: {
      height: 256,
      borderRadius: 24,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      borderRadius: Radius.full,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    buttonIcon: {
      fontSize: 24,
      color: AppColors.primary,
      transform: [{ translateY: 1 }],
    },
  });
