import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { PAGE_PADDING, Radius } from '@/constants/theme';

export const getBookingHistoryListStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: PAGE_PADDING,
      paddingBottom: 32,
    },
    list: {
      gap: 16,
    },
    image: {
      width: 96,
      height: 96,
      borderRadius: Radius.lg,
    },
    content: {
      flex: 1,
      gap: 4,
    },
  });
