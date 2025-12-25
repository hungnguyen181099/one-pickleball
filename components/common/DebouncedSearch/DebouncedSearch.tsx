import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

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
      placeholder="Tìm kiếm ..."
      size="sm"
      startIcon={<MaterialIcons name="search" size={20} color={colors.mutedForeground} />}
      {...props}
    />
  );
};

export default DebouncedSearch;
