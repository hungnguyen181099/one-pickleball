import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { Radius } from '@/constants/theme';

export const getStadiumRibbonStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      height: 24,
      borderTopLeftRadius: Radius.full,
      borderTopRightRadius: Radius.full,
      backgroundColor: colors.backgroundTertiary,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transform: [{ translateY: '-100%' }],
    },
  });
