import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getStadiumScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundTertiary,
    },
    body: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });
