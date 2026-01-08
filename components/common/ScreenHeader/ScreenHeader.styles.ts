import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { TOP_BAR_HEIGHT } from '@/constants/theme';

type GetStylesProps = StyleColorsProps & {
  withBorder: boolean;
  paddingHorizontal: number;
};

export const getScreenHeaderStyles = ({ colors, withBorder, paddingHorizontal }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: TOP_BAR_HEIGHT,
      paddingHorizontal: paddingHorizontal,
      ...(withBorder && {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }),
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    back: {
      transform: [{ translateY: 1 }],
      fontSize: 20,
      width: 32,
      color: colors.text
    },
  });
