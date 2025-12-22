import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getBookingFormStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
  });
