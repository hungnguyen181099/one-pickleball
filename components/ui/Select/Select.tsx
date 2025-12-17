import React, { useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { BottomSheet } from '../BottomSheet';

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOptions[];
  placeholder?: string;
  value?: string | null;
  onChangeValue?: (value: string | null) => void;
  renderLabel?: (label: string) => React.ReactNode;
};

const Select = ({ value, options, placeholder = 'Chọn', onChangeValue, renderLabel }: SelectProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(null);

  const styles = getStyles({ colors: useThemedColors() });

  const isControlled = value !== undefined;
  const finalValue = isControlled ? value : uncontrolledValue;

  const label = options.find((item) => item.value === finalValue)?.label || placeholder;

  const handleSelect = (selectedValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(selectedValue === finalValue ? null : selectedValue);
    }
    onChangeValue?.(selectedValue === finalValue ? null : selectedValue);
    setVisible(false);
  };

  return (
    <>
      {/* Trigger */}
      <Pressable onPress={() => setVisible(true)} style={styles.trigger}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {finalValue === null ? placeholder : label}
        </Text>
      </Pressable>

      {/* Sheet */}
      <BottomSheet visible={visible} onVisibleChange={setVisible}>
        {options.map((item) => {
          const isSelected = item.value === finalValue;

          return (
            <Pressable key={item.value} onPress={() => handleSelect(item.value)} style={styles.item}>
              <Text style={styles.label}>{renderLabel ? renderLabel(item.label) : item.label}</Text>
              {isSelected && <MaterialIcons name="check-circle" style={styles.icon} />}
            </Pressable>
          );
        })}
      </BottomSheet>
    </>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    trigger: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: Radius.md,
      backgroundColor: colors.input,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 56,
      borderBottomWidth: 1,
      borderColor: colors.border,
      gap: 16,
    },
    label: {
      flex: 1,
    },
    icon: {
      color: AppColors.primary,
      fontSize: 24,
      flexShrink: 0,
    },
  });

export default Select;
