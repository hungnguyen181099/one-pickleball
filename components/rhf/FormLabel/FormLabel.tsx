import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { Text } from 'react-native';

type FormLabelProps = {
  children: React.ReactNode;
};

const FormLabel = ({ children }: FormLabelProps) => {
  const colors = useThemedColors();

  if (!children) return;

  return (
    <Text
      style={{
        color: colors.text,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
};

export default FormLabel;
