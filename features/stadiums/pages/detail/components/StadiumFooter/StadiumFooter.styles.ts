import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { FontSize } from '@/constants/theme';

export const getStadiumFooterStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.inputBorder,
    },
    button: {
      flex: 1,
    },
    buttonText: {
      fontWeight: 600,
      fontSize: FontSize.xl,
    },
  });
