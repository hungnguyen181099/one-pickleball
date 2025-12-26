import React, { useState } from 'react';

import { dayjsExt } from '@/lib/days';
import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';
import { useUncontrolled } from '@/hooks/useUncontrolled';

import { Icon } from '../Icon';
import { Text } from '../Text';

type DateMode = {
  mode?: 'date';
  minimumDate?: Date;
  maximumDate?: Date;
};

type TimeMode = {
  mode?: 'time';
};

type Mode = DateMode | TimeMode;

export type DateTimePickerProps = Mode & {
  defaultValue?: Date | null;
  value?: Date | null;
  disabled?: boolean;
  onDateChange?: (date: Date | null) => void;
  styleOverrides?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
};

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
    finalValue: null,
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
      >
        {/* Trigger */}
        <View style={styles.textContainer}>
          {date ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              color={disabled ? 'muted' : 'default'}
              style={styleOverrides.text}
            >
              {dayjsExt(date).format(mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm')}
            </Text>
          ) : (
            <Text color="muted">Chọn ngày</Text>
          )}
        </View>

        <Icon variant="fit" color={disabled || !date ? 'muted' : 'inherit'}>
          <MaterialIcons name={mode === 'date' ? 'calendar-month' : 'access-time'} size={20} />
        </Icon>
      </Pressable>

      {/* Picker */}
      {show && (
        <RNDateTimePicker
          value={date || dayjsExt().toDate()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          {...props}
        />
      )}
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
