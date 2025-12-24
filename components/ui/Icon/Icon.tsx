import React from 'react';

import { StyleColorsProps } from '@/types';
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { AppColors, FontSize, Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { Text } from '../Text';

type IconVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent' | 'fit';
type IconRadius = 'sm' | 'md' | 'lg' | 'full';
type IconSize = 'sm' | 'md' | 'lg' | number;
type IconColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

type GetStylesProps = StyleColorsProps & {
  variant: IconVariant;
  size: IconSize;
  radius: IconRadius;
  disabled: PressableProps['disabled'];
  color: IconColor;
};

type IconProps = {
  children: React.ReactNode;
  variant?: IconVariant;
  size?: IconSize;
  radius?: IconRadius;
  color?: IconColor;
  styleOverrides?: {
    container?: ViewStyle;
    icon?: TextStyle;
  };
} & Omit<PressableProps, 'style'>;

const Icon = ({
  children,
  variant = 'filled',
  radius = 'full',
  size = 'md',
  color = 'primary',
  styleOverrides = {},
  disabled,
  ...props
}: IconProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius, disabled, color });

  return (
    <Pressable style={[styles.container, styleOverrides.container]} {...props}>
      <Text style={[styles.icon, styleOverrides.icon]}>{children}</Text>
    </Pressable>
  );
};

const getStyles = ({ colors, variant, size, radius, disabled, color }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,

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
      ...(variant !== 'fit' && {
        ...(size === 'sm' && {
          width: 40,
          height: 40,
        }),
        ...(size === 'md' && {
          width: 44,
          height: 44,
        }),
        ...(size === 'lg' && {
          width: 48,
          height: 48,
        }),
      }),
      ...(typeof size === 'number' && {
        width: size,
        height: size,
      }),

      // Variants
      ...(variant === 'fit' && {
        borderWidth: 0,
      }),
      ...(variant === 'default' && {
        backgroundColor: colors.card,
        borderColor: colors.border,
      }),
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
        ...(color === 'secondary' && {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }),
        ...(color === 'success' && {
          backgroundColor: AppColors.success,
          borderColor: AppColors.success,
        }),
        ...(color === 'warning' && {
          backgroundColor: AppColors.warning,
          borderColor: AppColors.warning,
        }),
        ...(color === 'error' && {
          backgroundColor: AppColors.error,
          borderColor: AppColors.error,
        }),
        ...(color === 'info' && {
          backgroundColor: AppColors.info,
          borderColor: AppColors.info,
        }),
      }),
      ...(variant === 'light' && {
        backgroundColor: AppColors.primaryAlpha20,
        borderColor: AppColors.primaryAlpha20,
        ...(color === 'secondary' && {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }),
        ...(color === 'success' && {
          backgroundColor: AppColors.successAlpha20,
          borderColor: AppColors.successAlpha20,
        }),
        ...(color === 'warning' && {
          backgroundColor: AppColors.warningAlpha20,
          borderColor: AppColors.warningAlpha20,
        }),
        ...(color === 'error' && {
          backgroundColor: AppColors.errorAlpha20,
          borderColor: AppColors.errorAlpha20,
        }),
        ...(color === 'info' && {
          backgroundColor: AppColors.infoAlpha20,
          borderColor: AppColors.infoAlpha20,
        }),
      }),
      ...(variant === 'outline' && {
        backgroundColor: colors.card,
        borderColor: AppColors.primary,
        ...(color === 'secondary' && {
          borderColor: colors.secondary,
        }),
        ...(color === 'success' && {
          borderColor: AppColors.success,
        }),
        ...(color === 'warning' && {
          borderColor: AppColors.warning,
        }),
        ...(color === 'error' && {
          borderColor: AppColors.error,
        }),
        ...(color === 'info' && {
          borderColor: AppColors.info,
        }),
      }),
      ...(variant === 'transparent' && {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }),

      // Disabled
      ...(disabled && {
        backgroundColor: colors.muted,
        borderColor: colors.muted,
      }),
    },
    icon: {
      color: AppColors.primary,

      // Colors
      ...(color === 'secondary' && {
        color: colors.secondaryForeground,
      }),
      ...(color === 'success' && {
        color: AppColors.success,
      }),
      ...(color === 'warning' && {
        color: AppColors.warning,
      }),
      ...(color === 'error' && {
        color: AppColors.error,
      }),
      ...(color === 'info' && {
        color: AppColors.info,
      }),

      // Sizes
      ...(size === 'sm' && {
        fontSize: FontSize.xs,
      }),
      ...(size === 'md' && {
        fontSize: FontSize.sm,
      }),
      ...(size === 'lg' && {
        fontSize: FontSize.md,
      }),

      // Variants
      ...(variant === 'default' && {
        color: colors.text,
      }),
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
        ...(color === 'secondary' && {
          color: colors.secondaryForeground,
        }),
        ...(color === 'success' && {
          color: AppColors.successForeground,
        }),
        ...(color === 'warning' && {
          color: AppColors.warningForeground,
        }),
        ...(color === 'error' && {
          color: AppColors.errorForeground,
        }),
        ...(color === 'info' && {
          color: AppColors.infoForeground,
        }),
      }),

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
  });

export default Icon;
