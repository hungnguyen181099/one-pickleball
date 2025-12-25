import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius, Spacing } from '@/constants/theme';

import { hexToHexAlpha } from '@/utils/hexToHexAlpha';

export const getStadiumListStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    // Search
    searchContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
    },
    searchButtonText: {
      fontWeight: 500,
      fontSize: 14,
    },
    searchButtonContainer: {
      alignSelf: 'stretch',
    },
    // List
    list: {
      paddingHorizontal: 4,
      marginHorizontal: -4,
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
      backgroundColor: hexToHexAlpha(AppColors.primary),
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
