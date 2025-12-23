import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getStadiumsScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: colors.backgroundSecondary,
    },
  });
