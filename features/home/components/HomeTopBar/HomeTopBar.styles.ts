import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { TOP_BAR_HEIGHT } from '@/constants/theme';

export const getHomeTopBarStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      height: TOP_BAR_HEIGHT,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });
