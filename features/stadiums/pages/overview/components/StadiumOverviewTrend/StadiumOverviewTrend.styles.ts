import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { PAGE_PADDING, Radius, SCREEN_WIDTH, Spacing } from '@/constants/theme';

const cardGap = 16;

const cardWidth = (SCREEN_WIDTH - PAGE_PADDING * 2 - cardGap) * (4 / 5);

export const getStadiumOverviewTrendStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    header: {
      marginBottom: 16,
    },
    scrollView: {
      padding: PAGE_PADDING,
    },
    card: {
      width: cardWidth,
      gap: 8,
      flexDirection: 'column',
    },
    cardGap: {
      marginRight: cardGap,
    },
    image: {
      maxHeight: 196,
      aspectRatio: 3 / 2,
      borderRadius: Radius.lg,
    },
    rating: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: colors.backgroundInverse,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: Radius.full,
    },
    ratingText: {
      color: colors.backgroundInverseForeground,
    },

    buttonContainer: {
      marginTop: 'auto',
    },
  });
