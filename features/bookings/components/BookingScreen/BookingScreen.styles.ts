import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getBookingScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundTertiary,
    },
  });
