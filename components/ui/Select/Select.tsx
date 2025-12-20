import React, { useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { BottomSheet, BottomSheetProps } from '../BottomSheet';

export type SelectOptions = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOptions[];
  placeholder?: string;
  value?: string | null;
  onChangeValue?: (value: string | null) => void;
  renderLabel?: (label: string) => React.ReactNode;
} & Pick<BottomSheetProps, 'styleOverrides' | 'fullSize'>;

const Select = ({
  value,
  options,
  placeholder = 'Chọn',
  fullSize = false,
  onChangeValue,
  renderLabel,
  ...props
}: SelectProps) => {
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
        <Text numberOfLines={1} ellipsizeMode="tail" style={finalValue === null && styles.triggerText}>
          {finalValue === null ? placeholder : label}
        </Text>
      </Pressable>

      {/* Sheet */}
      <BottomSheet visible={visible} onVisibleChange={setVisible} fullSize={fullSize} {...props}>
        {options.map((item) => {
          const isSelected = item.value === finalValue;

          return (
            <Pressable key={item.value} onPress={() => handleSelect(item.value)} style={styles.item}>
              <Text style={styles.label}>{renderLabel ? renderLabel(item.label) : item.label}</Text>
              <MaterialIcons name="check-circle" style={[styles.icon, isSelected && styles.iconSelected]} />
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
      paddingVertical: 8,
      paddingHorizontal: 16,
      minHeight: 56,
      borderBottomWidth: 1,
      borderColor: colors.border,
      gap: 16,
    },
    triggerText: {
      color: colors.textSecondary,
    },
    label: {
      flex: 1,
    },
    icon: {
      color: AppColors.primary,
      fontSize: 24,
      flexShrink: 0,
      opacity: 0,
    },
    iconSelected: {
      opacity: 1,
    },
  });

export default Select;
