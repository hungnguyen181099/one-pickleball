import React from 'react';

import { StyleColorsProps } from '@/types';
import { Pressable, PressableProps, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { AppColors, FontSize, Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { hexToHexAlpha } from '@/utils/hexToHexAlpha';

import { Text } from '../Text';

type BadgeVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent' | 'outline-light';
type BadgeRadius = 'sm' | 'md' | 'lg' | 'full';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'muted';

type GetStylesProps = StyleColorsProps & {
  variant: BadgeVariant;
  size: BadgeSize;
  radius: BadgeRadius;
  disabled: PressableProps['disabled'];
  alignSelf: ViewStyle['alignSelf'];
  color: BadgeColor;
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  withDot?: boolean;
  radius?: BadgeRadius;
  color?: BadgeColor;
  alignSelf?: ViewStyle['alignSelf'];
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
} & Omit<PressableProps, 'style'>;

const Badge = ({
  children,
  variant = 'filled',
  radius = 'full',
  size = 'md',
  color = 'primary',
  alignSelf = 'flex-start', // Make width fit content
  withDot = false,
  styleOverrides = {},
  disabled,
  ...props
}: BadgeProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius, disabled, color, alignSelf });

  return (
    <Pressable style={[styles.container, styleOverrides.container]} {...props}>
      {withDot && <View style={styles.dot}></View>}
      <Text style={[styles.text, styleOverrides.text]}>{children}</Text>
    </Pressable>
  );
};

const getStyles = ({ colors, variant, size, radius, disabled, color, alignSelf }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: alignSelf,
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
          backgroundColor: hexToHexAlpha(colors.secondary),
          borderColor: hexToHexAlpha(colors.secondary),
        }),
        ...(color === 'muted' && {
          backgroundColor: hexToHexAlpha(colors.muted),
          borderColor: hexToHexAlpha(colors.muted),
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
      ...(variant === 'outline-light' && {
        backgroundColor: hexToHexAlpha(AppColors.primary),
        borderColor: AppColors.primary,
        ...(color === 'secondary' && {
          backgroundColor: hexToHexAlpha(colors.secondary),
          borderColor: colors.secondary,
        }),
        ...(color === 'muted' && {
          backgroundColor: hexToHexAlpha(colors.muted),
          borderColor: colors.muted,
        }),
        ...(color === 'success' && {
          backgroundColor: hexToHexAlpha(AppColors.success),
          borderColor: AppColors.success,
        }),
        ...(color === 'warning' && {
          backgroundColor: hexToHexAlpha(AppColors.warning),
          borderColor: AppColors.warning,
        }),
        ...(color === 'error' && {
          backgroundColor: hexToHexAlpha(AppColors.error),
          borderColor: AppColors.error,
        }),
        ...(color === 'info' && {
          backgroundColor: hexToHexAlpha(AppColors.info),
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
    dot: {
      borderRadius: Radius.full,
      backgroundColor: AppColors.primary,

      // Colors
      ...(color === 'secondary' && {
        backgroundColor: colors.secondary,
      }),
      ...(color === 'muted' && {
        backgroundColor: colors.muted,
      }),
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
    },
  });

export default Badge;
