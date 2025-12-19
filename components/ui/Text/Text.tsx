import React from 'react';

import { StyleColorsProps } from '@/types';
import { Text as NativeText, TextProps as NativeTextProps, StyleSheet, TextStyle } from 'react-native';

import { AppColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

type TextColors = 'default' | 'secondary' | 'primary' | 'link' | 'success' | 'error' | 'warning';

type TextSizes = 'title' | 'subtitle' | 'sm' | 'md' | 'lg';

type TextProps = {
  fontWeight?: TextStyle['fontWeight'];
  color?: TextColors;
  size?: TextSizes;
  children: React.ReactNode;
} & NativeTextProps;

type GetStylesProps = {
  fontWeight: TextStyle['fontWeight'];
  color: TextColors;
  size: TextSizes;
} & StyleColorsProps;

const Text = ({ color = 'default', fontWeight = '400', size = 'md', children, style, ...props }: TextProps) => {
  const styles = getStyles({ colors: useThemedColors(), size, color, fontWeight });

  return (
    <NativeText style={[styles.container, style]} {...props}>
      {children}
    </NativeText>
  );
};

const getStyles = ({ colors, color, size, fontWeight }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      fontWeight,

      // Variants
      ...(color === 'secondary' && { color: colors.textSecondary }),
      ...(color === 'primary' && { color: AppColors.primary }),
      ...(color === 'warning' && { color: AppColors.warning }),
      ...(color === 'success' && { color: AppColors.success }),
      ...(color === 'error' && { color: AppColors.error }),
      ...(color === 'link' && { color: '#007AFF' }),
      ...(color === 'default' && { color: colors.text }),

      // Sizes
      ...(size === 'subtitle' && { fontSize: 20, fontWeight: 600 }),
      ...(size === 'title' && { fontSize: 24, fontWeight: 700 }),
      ...(size === 'sm' && { fontSize: 14 }),
      ...(size === 'md' && { fontSize: 16 }),
      ...(size === 'lg' && { fontSize: 18 }),
    },
  });

export default Text;
