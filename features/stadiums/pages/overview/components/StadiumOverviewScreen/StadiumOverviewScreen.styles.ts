import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { PAGE_PADDING } from '@/constants/theme';

export const getStadiumOverviewScreenStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    scrollView: {
      padding: PAGE_PADDING,
    },
  });
