import React from 'react';

import { StyleColorsProps } from '@/types';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

type CardRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type CommonProps = {
  radius: CardRadius;
  padding: ViewStyle['padding'];
  paddingVertical: ViewStyle['paddingVertical'];
  paddingHorizontal: ViewStyle['paddingHorizontal'];
};

type CardProps = Partial<CommonProps> & {
  children?: React.ReactNode;
} & ViewProps;

type GetStylesProps = StyleColorsProps & CommonProps;

const Card = ({ children, radius = 'md', padding, paddingHorizontal, paddingVertical, style, ...props }: CardProps) => {
  const styles = useGetStyles(getStyles, { radius, padding, paddingHorizontal, paddingVertical });

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;

const getStyles = ({ colors, radius, padding, paddingHorizontal, paddingVertical }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,

      // Radius
      ...(radius === 'sm' && {
        borderRadius: Radius.sm,
      }),
      ...(radius === 'md' && {
        borderRadius: Radius.md,
      }),
      ...(radius === 'lg' && {
        borderRadius: Radius.lg,
      }),
      ...(radius === 'xl' && {
        borderRadius: Radius.xl,
      }),
      ...(radius === 'full' && {
        borderRadius: Radius.full,
      }),

      // Padding
      ...(padding && {
        padding,
      }),
      ...(paddingHorizontal && {
        paddingHorizontal,
      }),
      ...(paddingVertical && {
        paddingVertical,
      }),
    },
  });
