import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

export const getStadiumListStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    // Search
    searchContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 8,
    },
    searchInput: {
      flex: 1,
    },
    searchButtonText: {
      fontWeight: 500,
      fontSize: 14,
    },
    // List
    list: {
      paddingHorizontal: 4,
      marginHorizontal: -4,
    },
    card: {
      borderRadius: 24,
      overflow: 'hidden',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    image: {
      aspectRatio: 4 / 3,
      maxHeight: 512,
    },
    body: {
      padding: 16,
      gap: 8,
    },
    separator: {
      height: 16,
    },
    textItem: {
      flex: 1,
    },
    iconSecondary: {
      color: colors.textSecondary,
    },
    iconTranslate: {
      transform: [{ translateY: 2 }],
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    amenity: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 4,
    },
    amenityItem: {
      padding: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: AppColors.primaryAlpha20,
    },
    btn: {
      paddingVertical: 16,
      borderRadius: Radius.full,
    },
    btnText: {
      fontWeight: 500,
    },
    // Pagination
    pagination: {
      paddingVertical: 16,
    },
    rating: {
      position: 'absolute',
      right: 16,
      top: 16,
      backgroundColor: AppColors.black,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: Radius.full,
    },
    ratingIcon: {
      color: AppColors.primary,
      fontSize: 18,
    },
    ratingText: {
      color: AppColors.white,
    },
  });
