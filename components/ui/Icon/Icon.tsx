import React from 'react';

import { StyleColorsProps } from '@/types';
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { AppColors, FontSize, Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { hexToHexAlpha } from '@/utils/hexToHexAlpha';

import { Text } from '../Text';

type IconVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent' | 'fit';
type IconRadius = 'sm' | 'md' | 'lg' | 'full';
type IconSize = 'sm' | 'md' | 'lg' | number;
type IconColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'muted' | 'inherit';

type GetStylesProps = StyleColorsProps & {
  variant: IconVariant;
  size: IconSize;
  radius: IconRadius;
  disabled: PressableProps['disabled'];
  color: IconColor;
  translateY: number;
};

type IconProps = {
  children: React.ReactNode;
  variant?: IconVariant;
  size?: IconSize;
  radius?: IconRadius;
  color?: IconColor;
  translateY?: number;
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
  translateY = 0,
  styleOverrides = {},
  disabled,
  ...props
}: IconProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius, disabled, color, translateY });

  return (
    <Pressable style={[styles.container, styleOverrides.container]} {...props}>
      <Text style={[styles.icon, styleOverrides.icon]}>{children}</Text>
    </Pressable>
  );
};

const getStyles = ({ colors, variant, size, radius, disabled, color, translateY }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      transform: [{ translateY }],

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
        ...(color === 'muted' && {
          backgroundColor: colors.muted,
          borderColor: colors.muted,
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
        backgroundColor: hexToHexAlpha(AppColors.primary),
        borderColor: hexToHexAlpha(AppColors.primary),
        ...(color === 'secondary' && {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }),
        ...(color === 'muted' && {
          backgroundColor: colors.muted,
          borderColor: colors.muted,
        }),
        ...(color === 'success' && {
          backgroundColor: hexToHexAlpha(AppColors.success),
          borderColor: hexToHexAlpha(AppColors.success),
        }),
        ...(color === 'warning' && {
          backgroundColor: hexToHexAlpha(AppColors.warning),
          borderColor: hexToHexAlpha(AppColors.warning),
        }),
        ...(color === 'error' && {
          backgroundColor: hexToHexAlpha(AppColors.error),
          borderColor: hexToHexAlpha(AppColors.error),
        }),
        ...(color === 'info' && {
          backgroundColor: hexToHexAlpha(AppColors.info),
          borderColor: hexToHexAlpha(AppColors.info),
        }),
      }),
      ...(variant === 'outline' && {
        backgroundColor: colors.card,
        borderColor: AppColors.primary,
        ...(color === 'secondary' && {
          borderColor: colors.secondary,
        }),
        ...(color === 'muted' && {
          borderColor: colors.muted,
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
      // Colors
      ...(color !== 'inherit' && {
        color: AppColors.primary,

        ...(color === 'secondary' && {
          color: colors.secondaryForeground,
        }),
        ...(color === 'muted' && {
          color: colors.mutedForeground,
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
        ...(color === 'muted' && {
          color: colors.mutedForeground,
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
