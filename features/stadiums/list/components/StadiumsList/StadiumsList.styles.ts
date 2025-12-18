import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { AppColors, Radius, Shadows } from '@/constants/theme';

export const getStadiumListStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 8,
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
    searchButton: {
      backgroundColor: `${AppColors.primary}20`,
      borderRadius: Radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: AppColors.primary,
    },
    input: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    // List
    list: {
      paddingHorizontal: 4,
      marginHorizontal: -4,
    },
    card: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      backgroundColor: colors.card,
      ...Shadows.sm,
    },
    image: {
      aspectRatio: 16 / 9,
      maxHeight: 256,
    },
    body: {
      padding: 16,
      gap: 4,
    },
    separator: {
      height: 16,
    },
    name: {
      fontSize: 18,
      fontWeight: 500,
      marginBottom: 4,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    address: {
      flexDirection: 'row',
      gap: 8,
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
    time: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
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
      padding: 4,
      paddingHorizontal: 8,
      borderRadius: Radius.full,
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    btn: {
      marginTop: 8,
      padding: 12,
      borderRadius: Radius.sm,
      backgroundColor: AppColors.primary,
      alignItems: 'center',
    },
    btnText: {
      color: AppColors.white,
      fontWeight: 500,
    },
    // Pagination
    pagination: {
      paddingVertical: 16,
    },
  });
