import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { Text } from 'react-native';

type FormDescriptionProps = {
  children: React.ReactNode;
};

const FormDescription = ({ children }: FormDescriptionProps) => {
  const colors = useThemedColors();

  if (!children) return;

  return (
    <Text
      style={{
        color: colors.textSecondary,
        fontSize: 13,
        marginTop: 4,
      }}
    >
      {children}
    </Text>
  );
};

export default FormDescription;
