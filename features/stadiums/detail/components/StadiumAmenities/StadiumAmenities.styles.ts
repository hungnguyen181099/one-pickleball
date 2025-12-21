import { Radius } from '@/constants/theme';
import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

export const getStadiumAmenitiesStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginTop: 32,
    },
    item: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.background,
      flexGrow: 1,
    },
  });
