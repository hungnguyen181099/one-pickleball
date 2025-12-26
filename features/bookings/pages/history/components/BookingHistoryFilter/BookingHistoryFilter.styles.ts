import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { PAGE_PADDING } from '@/constants/theme';

export const getBookingHistoryFilterStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: PAGE_PADDING,
      paddingBottom: PAGE_PADDING,
    },
  });
