import React, { useState } from 'react';

import { StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

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
  styleFor?: {
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
  styleFor = {},
  radius = 'md',
  size = 'md',
  startIcon,
  endIcon,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const colors = useThemedColors();

  const styles = getStyles({ variant, colors, radius, size });
  const isControlled = value !== undefined;
  const finalValue = isControlled ? value : internalValue;

  const handleChange = (text: string) => {
    if (!isControlled) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };

  return (
    <View style={[styles.container, styleFor.container]}>
      {startIcon && <View style={[styles.startIcon, styleFor.startIcon]}>{startIcon}</View>}

      <TextInput value={finalValue} onChangeText={handleChange} {...props} style={[styles.input, styleFor.input]} />

      {endIcon && <View style={[styles.endIcon, styleFor.endIcon]}>{endIcon}</View>}
    </View>
  );
};

const getStyles = ({ variant, colors, radius, size }: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      ...(radius === 'sm' && {
        borderRadius: 8,
      }),
      ...(radius === 'md' && {
        borderRadius: 12,
      }),
      ...(radius === 'lg' && {
        borderRadius: 16,
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
