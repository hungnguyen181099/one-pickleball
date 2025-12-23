import React, { useState } from 'react';

import { dayjsExt } from '@/lib/days';
import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Pressable, PressableProps, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';
import { useUncontrolled } from '@/hooks/useUncontrolled';

import { Text } from '../Text';

type Mode = 'date' | 'time';

export type DateTimePickerProps = {
  defaultValue?: Date;
  value?: Date;
  mode?: Mode;
  disabled?: boolean;
  onDateChange?: (date: Date) => void;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
} & Omit<PressableProps, 'style'>;

const DateTimePicker = ({
  mode = 'date',
  defaultValue,
  value,
  disabled,
  onDateChange,
  styleOverrides = {},
  ...props
}: DateTimePickerProps) => {
  const [show, setShow] = useState(false);

  const [date, setDate] = useUncontrolled({
    defaultValue,
    value,
    finalValue: dayjsExt().toDate(),
    onChange: onDateChange,
  });

  const styles = useGetStyles(getStyles);

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  return (
    <>
      <Pressable
        onPress={disabled ? undefined : () => setShow(true)}
        style={[styles.container, disabled && styles.containerDisabled, styleOverrides.container]}
        {...props}
      >
        {/* Trigger */}
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color={disabled ? 'muted' : 'default'}
            style={styleOverrides.text}
          >
            {dayjsExt(date).format(mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm')}
          </Text>
        </View>

        <MaterialIcons
          name={mode === 'date' ? 'calendar-month' : 'access-time'}
          size={20}
          style={(styles.icon, disabled && styles.iconDisabled)}
        />
      </Pressable>

      {/* Picker */}
      {show && <RNDateTimePicker value={date} mode={mode} is24Hour={true} onChange={onChange} />}
    </>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.md,
      backgroundColor: colors.card,
    },
    textContainer: {
      flex: 1,
    },
    containerDisabled: {
      backgroundColor: colors.muted,
    },
    iconDisabled: {
      color: colors.mutedForeground,
    },
    icon: {
      color: colors.text,
    },
  });

export default DateTimePicker;
