import React from 'react';

import { StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { Radius, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';
import { useUncontrolled } from '@/hooks/useUncontrolled';

type InputVariant = 'default' | 'filled' | 'unstyled';
type InputRadius = 'sm' | 'md' | 'lg';
type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = TextInputProps & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: InputVariant;
  radius?: InputRadius;
  size?: InputSize;
  value?: string;
  styleOverrides?: {
    container?: ViewStyle;
    input?: TextStyle;
    endIcon?: ViewStyle;
    startIcon?: ViewStyle;
  };
  onChangeText?: (text: string) => void;
};

type StyleProps = {
  variant: InputVariant;
  colors: ThemeColors;
  radius: InputRadius;
  size: InputSize;
};

const Input = ({
  variant = 'default',
  styleOverrides = {},
  radius = 'md',
  size = 'md',
  startIcon,
  endIcon,
  value: controlledValue,
  defaultValue,
  onChangeText,
  ...props
}: InputProps) => {
  const colors = useThemedColors();

  const [value, setValue] = useUncontrolled({
    defaultValue: defaultValue,
    value: controlledValue,
    finalValue: '',
    onChange: onChangeText,
  });

  const styles = getStyles({ variant, colors, radius, size });

  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <View style={[styles.container, styleOverrides.container]}>
      {startIcon && <View style={[styles.startIcon, styleOverrides.startIcon]}>{startIcon}</View>}

      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholderTextColor={colors.secondaryForeground}
        style={[styles.input, styleOverrides.input]}
        {...props}
      />

      {endIcon && <View style={[styles.endIcon, styleOverrides.endIcon]}>{endIcon}</View>}
    </View>
  );
};

const getStyles = ({ variant, colors, radius, size }: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      ...(radius === 'sm' && {
        borderRadius: Radius.sm,
      }),
      ...(radius === 'md' && {
        borderRadius: Radius.md,
      }),
      ...(radius === 'lg' && {
        borderRadius: Radius.lg,
      }),
      ...(variant === 'default' && {
        borderWidth: 1,
        backgroundColor: colors.card,
        borderColor: colors.inputBorder,
      }),
      ...(variant === 'filled' && {
        borderWidth: 1,
        backgroundColor: colors.input,
        borderColor: colors.inputBorder,
      }),
    },
    endIcon: {
      ...(size === 'sm' && {
        paddingRight: 12,
      }),
      ...(size === 'md' && {
        paddingRight: 16,
      }),
      ...(size === 'lg' && {
        paddingRight: 20,
      }),
    },
    startIcon: {
      ...(size === 'sm' && {
        paddingLeft: 12,
      }),
      ...(size === 'md' && {
        paddingLeft: 16,
      }),
      ...(size === 'lg' && {
        paddingLeft: 20,
      }),
    },
    input: {
      flex: 1,
      color: colors.text,

      ...(size === 'sm' && {
        paddingVertical: 12,
        paddingHorizontal: 12,
      }),
      ...(size === 'md' && {
        paddingVertical: 16,
        paddingHorizontal: 16,
      }),
      ...(size === 'lg' && {
        paddingVertical: 20,
        paddingHorizontal: 20,
      }),
    },
  });

export default Input;
