import React from 'react';

import { Text } from 'react-native';

import { useThemedColors } from '@/hooks/use-theme';

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
