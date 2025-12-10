import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { Text } from 'react-native';

type FormMessageProps = {
  children: React.ReactNode;
};

const FormMessage = ({ children }: FormMessageProps) => {
  const colors = useThemedColors();

  if (!children) return;

  return (
    <Text
      style={{
        color: colors.error,
        fontSize: 14,
        marginTop: 4,
      }}
    >
      {children}
    </Text>
  );
};

export default FormMessage;
