import React from 'react';

import { StyleColorsProps } from '@/types';
import { Pressable, PressableProps, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { AppColors, Radius, fontSize } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { Text } from '../Text';

type BadgeVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent';
type BadgeRadius = 'sm' | 'md' | 'lg' | 'full';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'info';

type GetStylesProps = StyleColorsProps & {
  variant: BadgeVariant;
  size: BadgeSize;
  radius: BadgeRadius;
  disabled: PressableProps['disabled'];
  color: BadgeColor;
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  withDot?: boolean;
  radius?: BadgeRadius;
  color?: BadgeColor;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
} & PressableProps;

const Badge = ({
  children,
  variant = 'filled',
  radius = 'full',
  size = 'md',
  color = 'primary',
  withDot = false,
  styleOverrides = {},
  disabled,
  ...props
}: BadgeProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius, disabled, color });

  return (
    <Pressable style={[styles.container, styleOverrides.container]} {...props}>
      {withDot && <View style={styles.dot}></View>}
      <Text style={[styles.text, styleOverrides.text]}>{children}</Text>
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
      ...(size === 'sm' && {
        paddingVertical: 2,
        paddingHorizontal: 8,
        gap: 6,
      }),
      ...(size === 'md' && {
        paddingVertical: 4,
        paddingHorizontal: 16,
        gap: 8,
      }),
      ...(size === 'lg' && {
        paddingVertical: 6,
        paddingHorizontal: 24,
        gap: 10,
      }),

      // Variants
      ...(variant === 'default' && {
        backgroundColor: colors.card,
        borderColor: colors.border,
      }),
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
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
    text: {
      color: AppColors.primary,

      // Colors
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
        fontSize: fontSize.xs,
      }),
      ...(size === 'md' && {
        fontSize: fontSize.sm,
      }),
      ...(size === 'lg' && {
        fontSize: fontSize.md,
      }),

      // Variants
      ...(variant === 'default' && {
        color: colors.text,
      }),
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
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
    dot: {
      borderRadius: Radius.full,
      backgroundColor: AppColors.primary,

      // Colors
      ...(color === 'success' && {
        backgroundColor: AppColors.success,
      }),
      ...(color === 'warning' && {
        backgroundColor: AppColors.warning,
      }),
      ...(color === 'error' && {
        backgroundColor: AppColors.error,
      }),
      ...(color === 'info' && {
        backgroundColor: AppColors.info,
      }),

      // Sizes
      ...(size === 'sm' && {
        width: 6,
        height: 6,
      }),
      ...(size === 'md' && {
        width: 8,
        height: 8,
      }),
      ...(size === 'lg' && {
        width: 10,
        height: 10,
      }),

      // Variants
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primaryForeground,
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
    },
  });

export default Badge;
