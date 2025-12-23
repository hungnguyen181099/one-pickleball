import React, { useEffect } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { AppColors, Radius, fontSize } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

import { Text } from '../Text';

type ButtonVariant = 'default' | 'filled' | 'light' | 'outline' | 'transparent';
type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';
type ButtonSize = 'sm' | 'md' | 'lg';

type GetStylesProps = StyleColorsProps & {
  variant: ButtonVariant;
  size: ButtonSize;
  radius: ButtonRadius;
  disabled: PressableProps['disabled'];
  fullWidth?: boolean;
};

type ButtonProps = {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  loading?: boolean;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
} & Omit<PressableProps, 'style'>;

const Button = ({
  children,
  endIcon,
  startIcon,
  variant = 'filled',
  radius = 'md',
  size = 'md',
  styleOverrides = {},
  disabled,
  loading,
  fullWidth,
  ...props
}: ButtonProps) => {
  const styles = useGetStyles(getStyles, { variant, size, radius, disabled, fullWidth });

  const rotation = useSharedValue<number>(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Pressable disabled={disabled} style={[styles.container, styleOverrides.container]} {...props}>
      {loading && (
        <Animated.Text style={loadingIconStyle}>
          <MaterialCommunityIcons name="loading" style={styles.loadingIcon} />
        </Animated.Text>
      )}
      {startIcon && <Text style={styles.icon}>{startIcon}</Text>}
      <Text style={[styles.text, styleOverrides.text]}>{children}</Text>
      {endIcon && <Text style={styles.icon}>{endIcon}</Text>}
    </Pressable>
  );
};

const getStyles = ({ colors, variant, size, radius, disabled, fullWidth }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      ...(!fullWidth && { alignSelf: 'flex-start' }),

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
        borderColor: colors.border,
      }),
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
      }),
      ...(variant === 'light' && {
        backgroundColor: AppColors.primaryAlpha20,
        borderColor: AppColors.primaryAlpha20,
      }),
      ...(variant === 'outline' && {
        backgroundColor: colors.card,
        borderColor: AppColors.primary,
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

      // Sizes
      ...(size === 'sm' && {
        fontSize: fontSize.sm,
      }),
      ...(size === 'md' && {
        fontSize: fontSize.md,
      }),
      ...(size === 'lg' && {
        fontSize: fontSize.lg,
      }),

      // Variants
      ...(variant === 'default' && {
        color: colors.text,
      }),
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
    icon: {
      color: AppColors.primary,

      // Variants
      ...(variant === 'default' && {
        color: colors.text,
      }),
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
    loadingIcon: {
      color: AppColors.primary,

      // Sizes
      ...(size === 'sm' && {
        fontSize: fontSize.md,
      }),
      ...(size === 'md' && {
        fontSize: fontSize.lg,
      }),
      ...(size === 'lg' && {
        fontSize: fontSize.xl,
      }),

      // Variants
      ...(variant === 'default' && {
        color: colors.text,
      }),
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
  });

export default Button;
