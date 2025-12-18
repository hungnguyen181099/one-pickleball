import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Input, InputProps } from '@/components/ui/Input';

import { useThemedColors } from '@/hooks/use-theme';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';

type DebouncedSearchProps = {
  delay?: number; // ms
  onDebouncedChange?: (value: string) => void;
} & Omit<InputProps, 'value' | 'onChangeText'>;

const DebouncedSearch = ({ delay = 500, onDebouncedChange, ...props }: DebouncedSearchProps) => {
  const colors = useThemedColors();

  const debounced = useDebouncedCallback((value) => {
    onDebouncedChange?.(value);
  }, delay);

  return (
    <Input
      onChangeText={(text) => debounced(text)}
      placeholder="Search"
      size="sm"
      startIcon={<MaterialCommunityIcons name="magnify" size={20} color={colors.icon} />}
      {...props}
    />
  );
};

export default DebouncedSearch;
