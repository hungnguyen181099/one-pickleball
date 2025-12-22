import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getBookingHeaderStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });
