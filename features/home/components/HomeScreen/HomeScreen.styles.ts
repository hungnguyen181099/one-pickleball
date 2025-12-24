import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getHomeScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginTop: 32,
    },
  });
