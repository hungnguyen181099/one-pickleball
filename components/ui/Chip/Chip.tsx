import React from 'react';

import { StyleColorsProps } from '@/types';
import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { AppColors, Radius, fontSize } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';
import { useUncontrolled } from '@/hooks/useUncontrolled';

import { Text } from '../Text';

type ChipVariant = 'filled' | 'light' | 'outline';
type ChipRadius = 'sm' | 'md' | 'lg' | 'full';
type ChipSize = 'sm' | 'md' | 'lg';

type GetStylesProps = StyleColorsProps & {
  variant: ChipVariant;
  size: ChipSize;
  radius: ChipRadius;
  disabled: PressableProps['disabled'];
};

type ChipProps = {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  radius?: ChipRadius;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & PressableProps;

const Chip = ({
  children,
  endIcon,
  startIcon,
  variant = 'filled',
  radius = 'full',
  size = 'md',
  styleOverrides = {},
  disabled,
  defaultChecked,
  checked,
  onPress,
  onCheckedChange,
  ...props
}: ChipProps) => {
  const [value, setValue] = useUncontrolled({
    defaultValue: defaultChecked,
    value: checked,
    finalValue: false,
    onChange: onCheckedChange,
  });

  const styles = useGetStyles(getStyles, { variant, size, radius, disabled });

  const handlePress = (event: GestureResponderEvent) => {
    setValue(!value);
    onPress?.(event);
  };

  return (
    <Pressable
      style={[styles.container, value && styles.containerChecked, styleOverrides.container]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, value && styles.textChecked, styleOverrides.text]}>{children}</Text>
    </Pressable>
  );
};

export default Chip;

const getStyles = ({ colors, disabled, radius, size, variant }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: colors.muted,
      borderColor: colors.muted,

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
      }),
      ...(size === 'md' && {
        paddingVertical: 12,
        paddingHorizontal: 24,
      }),
      ...(size === 'lg' && {
        paddingVertical: 16,
        paddingHorizontal: 32,
      }),

      // Variants
      ...(variant === 'outline' && {
        backgroundColor: colors.card,
        borderColor: colors.border,
      }),

      // Disabled
      ...(disabled && {
        backgroundColor: colors.muted,
        borderColor: colors.muted,
      }),
    },
    text: {
      color: colors.text,

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

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
    containerChecked: {
      borderColor: AppColors.primary,

      // Variants
      ...(variant === 'filled' && {
        backgroundColor: AppColors.primary,
      }),
      ...(variant === 'light' && {
        backgroundColor: AppColors.primaryAlpha20,
        borderColor: AppColors.primaryAlpha20,
      }),

      // Disabled
      ...(disabled && {
        backgroundColor: colors.muted,
        borderColor: colors.muted,
      }),
    },
    textChecked: {
      // Variants
      ...(variant === 'filled' && {
        color: AppColors.primaryForeground,
      }),
      ...(variant === 'light' && {
        color: AppColors.primary,
      }),

      // Disabled
      ...(disabled && {
        color: colors.mutedForeground,
      }),
    },
  });
