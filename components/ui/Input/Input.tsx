import React, { useState } from 'react';

import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

type InputVariant = 'default' | 'filled' | 'unstyled';
type InputRadius = 'sm' | 'md' | 'lg';

export type InputProps = TextInputProps & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: InputVariant;
  radius?: InputRadius;
  value?: string;
  onChangeText?: (text: string) => void;
};

type StyleProps = {
  variant: InputVariant;
  color: ThemeColor;
  radius: InputRadius;
};

const Input = ({
  variant = 'filled',
  radius = 'md',
  startIcon,
  endIcon,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const colors = useThemedColors();

  const styles = getStyles({ variant, color: colors, radius });
  const isControlled = value !== undefined;
  const finalValue = isControlled ? value : internalValue;

  const handleChange = (text: string) => {
    if (!isControlled) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };

  return (
    <View style={styles.container}>
      {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
      <TextInput value={finalValue} onChangeText={handleChange} {...props} style={styles.input} />
      {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
    </View>
  );
};

const getStyles = ({ variant, color, radius }: StyleProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: radius === 'sm' ? 4 : radius === 'md' ? 8 : 16,
      flexDirection: 'row',
      ...(variant === 'default' && {
        borderWidth: 1,
        borderColor: color.inputBorder,
      }),
      ...(variant === 'filled' && {
        borderWidth: 1,
        backgroundColor: color.input,
        borderColor: color.inputBorder,
      }),
    },
    endIcon: {
      paddingRight: 16,
      ...(variant === 'unstyled' && {
        paddingLeft: 4,
      }),
    },
    input: {
      flex: 1,
      padding: 16,
      ...(variant === 'unstyled' && {
        paddingHorizontal: 0,
      }),
    },
    startIcon: {
      paddingLeft: 16,
      ...(variant === 'unstyled' && {
        paddingRight: 4,
      }),
    },
  });

export default Input;
