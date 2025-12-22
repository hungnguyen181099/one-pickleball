import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getBookingFooterStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 16,
    },
  });
