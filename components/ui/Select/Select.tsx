import React, { Fragment, useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { BottomSheet, BottomSheetProps } from '../BottomSheet';
import { Separator } from '../Separator';
import { Text } from '../Text';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
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
        <View style={styles.textTrigger}>
          <Text numberOfLines={1} ellipsizeMode="tail" color={finalValue === null ? 'secondary' : 'default'}>
            {finalValue === null ? placeholder : label}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={18} style={finalValue === null && styles.colorSecondary} />
      </Pressable>

      {/* Sheet */}
      <BottomSheet visible={visible} onVisibleChange={setVisible} fullSize={fullSize} {...props}>
        {options.map((item, index) => {
          const isSelected = item.value === finalValue;

          return (
            <Fragment key={item.value}>
              <Pressable onPress={() => handleSelect(item.value)} style={styles.item}>
                <Text style={styles.label}>{renderLabel ? renderLabel(item.label) : item.label}</Text>
                <MaterialIcons name="check-circle" style={[styles.icon, isSelected && styles.iconSelected]} />
              </Pressable>

              {index < options.length - 1 && <Separator />}
            </Fragment>
          );
        })}
      </BottomSheet>
    </>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    trigger: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.md,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textTrigger: {
      flex: 1,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      minHeight: 56,
    },
    colorSecondary: {
      color: colors.secondaryForeground,
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
