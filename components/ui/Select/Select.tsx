import React, { Fragment, useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';
import { useUncontrolled } from '@/hooks/useUncontrolled';

import { BottomSheet, BottomSheetProps } from '../BottomSheet';
import { Icon } from '../Icon';
import { Separator } from '../Separator';
import { Text } from '../Text';

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  value?: string | null;
  disabled?: boolean;
  onChangeValue?: (value: string | null) => void;
  renderLabel?: (label: string) => React.ReactNode;
} & Pick<BottomSheetProps, 'styleOverrides' | 'fullSize'>;

type GetStylesProps = {
  disabled: boolean;
} & StyleColorsProps;

const Select = ({
  value,
  options,
  placeholder = 'Chọn',
  fullSize = false,
  disabled = false,
  onChangeValue,
  renderLabel,
  ...props
}: SelectProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const styles = useGetStyles(getStyles, { disabled });

  const [selectedValue, setSelectedValue] = useUncontrolled({
    defaultValue: null,
    value,
    finalValue: null,
    onChange: onChangeValue,
  });

  const label = options.find((item) => item.value === selectedValue)?.label || placeholder;

  const handleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue === value ? null : selectedValue);
    setVisible(false);
  };

  return (
    <>
      {/* Trigger */}
      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
        style={[styles.container, disabled && styles.containerDisabled]}
      >
        <View style={styles.textTrigger}>
          <Text numberOfLines={1} ellipsizeMode="tail" color={selectedValue === null ? 'muted' : 'default'}>
            {selectedValue === null ? placeholder : label}
          </Text>
        </View>

        <Icon variant="fit" color={selectedValue === null ? 'muted' : 'inherit'}>
          <MaterialIcons name="keyboard-arrow-down" size={20} />
        </Icon>
      </Pressable>

      {/* Sheet */}
      <BottomSheet visible={visible} onVisibleChange={setVisible} fullSize={fullSize} {...props}>
        {options.map((item, index) => {
          const isSelected = item.value === selectedValue;
          const isDisabled = item.disabled;

          if (isDisabled) {
            return (
              <Fragment key={item.value}>
                <Pressable style={[styles.item, styles.itemDisabled]}>
                  <Text style={[styles.label, styles.labelDisabled]}>
                    {renderLabel ? renderLabel(item.label) : item.label}
                  </Text>
                  <MaterialIcons name="check-circle" style={[styles.icon, styles.iconDisabled]} />
                </Pressable>

                {index < options.length - 1 && <Separator />}
              </Fragment>
            );
          }

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

const getStyles = ({ colors, disabled }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.md,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerDisabled: {
      backgroundColor: colors.muted,
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
    itemDisabled: {
      backgroundColor: colors.muted,
      opacity: 0.5,
    },
    iconDisabled: {
      color: colors.mutedForeground,
    },
    labelDisabled: {
      color: colors.mutedForeground,
    },
    colorMuted: {
      color: colors.mutedForeground,
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
