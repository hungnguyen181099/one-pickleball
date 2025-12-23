import React from 'react';

import { StyleColorsProps } from '@/types';
import { Text as NativeText, TextProps as NativeTextProps, StyleSheet, TextStyle } from 'react-native';

import { AppColors, fontSize as FONT_SIZE } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

type TextColors =
  | 'default'
  | 'secondary'
  | 'primary'
  | 'primaryForeground'
  | 'link'
  | 'success'
  | 'error'
  | 'warning'
  | 'muted'
  | 'inherit';

type TextSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit';

type TextProps = {
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: TextStyle['fontSize'];
  color?: TextColors;
  size?: TextSizes;
  children: React.ReactNode;
} & NativeTextProps;

type GetStylesProps = {
  fontWeight: TextStyle['fontWeight'];
  fontSize: TextStyle['fontSize'];
  color: TextColors;
  size: TextSizes;
} & StyleColorsProps;

export const fontWeightMap = {
  100: 'BeVietnamPro-Thin',
  200: 'BeVietnamPro-ExtraLight',
  300: 'BeVietnamPro-Light',
  400: 'BeVietnamPro-Regular',
  500: 'BeVietnamPro-Medium',
  600: 'BeVietnamPro-SemiBold',
  700: 'BeVietnamPro-Bold',
  800: 'BeVietnamPro-ExtraBold',
  900: 'BeVietnamPro-Black',
};

const fontFamilyImport = {
  thin: 'BeVietnamPro-Thin', // 100
  thinItalic: 'BeVietnamPro-ThinItalic',

  extralight: 'BeVietnamPro-ExtraLight', // 200
  extralightItalic: 'BeVietnamPro-ExtraLightItalic',

  light: 'BeVietnamPro-Light', // 300
  lightItalic: 'BeVietnamPro-LightItalic',

  regular: 'BeVietnamPro-Regular', // 400
  italic: 'BeVietnamPro-Italic',

  medium: 'BeVietnamPro-Medium', // 500
  mediumItalic: 'BeVietnamPro-MediumItalic',

  semibold: 'BeVietnamPro-SemiBold', // 600
  semiboldItalic: 'BeVietnamPro-SemiBoldItalic',

  bold: 'BeVietnamPro-Bold', // 700
  boldItalic: 'BeVietnamPro-BoldItalic',

  extrabold: 'BeVietnamPro-ExtraBold', // 800
  extraboldItalic: 'BeVietnamPro-ExtraBoldItalic',

  black: 'BeVietnamPro-Black', // 900
  blackItalic: 'BeVietnamPro-BlackItalic',
};

const Text = ({ color = 'default', fontWeight, size = 'md', children, style, fontSize, ...props }: TextProps) => {
  const styles = getStyles({ colors: useThemedColors(), size, color, fontWeight, fontSize });

  return (
    <NativeText style={[styles.container, style]} {...props}>
      {children}
    </NativeText>
  );
};

const getStyles = ({ colors, color, size, fontWeight, fontSize }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      fontFamily: fontFamilyImport.regular,

      // Variants
      ...(color !== 'inherit' && {
        ...(color === 'primary' && { color: AppColors.primary }),
        ...(color === 'primaryForeground' && { color: AppColors.primaryForeground }),
        ...(color === 'secondary' && { color: colors.secondaryForeground }),
        ...(color === 'muted' && { color: colors.mutedForeground }),
        ...(color === 'warning' && { color: AppColors.warning }),
        ...(color === 'success' && { color: AppColors.success }),
        ...(color === 'error' && { color: AppColors.error }),
        ...(color === 'link' && { color: '#007AFF' }),
        ...(color === 'default' && { color: colors.text }),
      }),

      // Sizes
      ...(size !== 'inherit' && {
        ...(size === 'h1' && { fontSize: 24, fontWeight: 700, fontFamily: fontWeightMap['700'] }),
        ...(size === 'h2' && { fontSize: 20, fontWeight: 600, fontFamily: fontWeightMap['600'] }),
        ...(size === 'h3' && { fontSize: 18, fontWeight: 600, fontFamily: fontWeightMap['600'] }),
        ...(size === 'h4' && { fontSize: 16, fontWeight: 500, fontFamily: fontWeightMap['500'] }),
        ...(size === 'h5' && { fontSize: 14, fontWeight: 500, fontFamily: fontWeightMap['500'] }),
        ...(size === 'h6' && { fontSize: 12, fontWeight: 500, fontFamily: fontWeightMap['500'] }),

        ...(size === 'xs' && { fontSize: FONT_SIZE.xs }),
        ...(size === 'sm' && { fontSize: FONT_SIZE.sm }),
        ...(size === 'md' && { fontSize: FONT_SIZE.md }),
        ...(size === 'lg' && { fontSize: FONT_SIZE.lg }),
        ...(size === 'xl' && { fontSize: FONT_SIZE.xl }),
      }),

      // Font weight
      ...(fontWeight && {
        fontFamily: fontWeightMap[fontWeight as keyof typeof fontWeightMap] ?? fontFamilyImport.regular,
      }),

      // Font size
      ...(fontSize && {
        fontSize,
      }),
    },
  });

export default Text;
