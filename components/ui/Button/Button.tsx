import React from 'react';

import { StyleColorsProps } from '@/types';
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { Text } from '../Text';

type ButtonVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent';
type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';
type ButtonSize = 'sm' | 'md' | 'lg';

type GetStylesProps = StyleColorsProps & {
  variant: ButtonVariant;
  size: ButtonSize;
  radius: ButtonRadius;
};

type ButtonProps = {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
} & PressableProps;

const Button = ({
  children,
  endIcon,
  startIcon,
  variant = 'filled',
  radius = 'md',
  size = 'md',
  styleOverrides = {},
  ...props
}: ButtonProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius });

  return (
    <Pressable style={[styles.container, styleOverrides.container]} {...props}>
      {startIcon && <Text style={styles.icon}>{startIcon}</Text>}
      <Text style={[styles.text, styleOverrides.text]}>{children}</Text>
      {endIcon && <Text style={styles.icon}>{endIcon}</Text>}
    </Pressable>
  );
};

const getStyles = ({ colors, variant, size, radius }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

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
      ...(radius === 'full' && {
        borderRadius: Radius.full,
      }),

      // Sizes
      ...(size === 'sm' && {
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 4,
      }),
      ...(size === 'md' && {
        paddingVertical: 12,
        paddingHorizontal: 24,
        gap: 6,
      }),
      ...(size === 'lg' && {
        paddingVertical: 16,
        paddingHorizontal: 32,
        gap: 8,
      }),

      // Variants
      ...(variant === 'default' && {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }),
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primary,
      }),
      ...(variant === 'light' && {
        backgroundColor: AppColors.primaryAlpha20,
      }),
      ...(variant === 'outline' && {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: AppColors.primary,
      }),
      ...(variant === 'transparent' && {
        backgroundColor: 'transparent',
      }),
    },
    text: {
      color: colors.text,

      // Variants
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),
      ...(variant === 'light' && {
        color: AppColors.primary,
      }),
      ...(variant === 'outline' && {
        color: AppColors.primary,
      }),
      ...(variant === 'transparent' && {
        color: AppColors.primary,
      }),
    },
    icon: {
      color: colors.text,

      // Variants
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),
      ...(variant === 'light' && {
        color: AppColors.primary,
      }),
      ...(variant === 'outline' && {
        color: AppColors.primary,
      }),
      ...(variant === 'transparent' && {
        color: AppColors.primary,
      }),
    },
  });

export default Button;
