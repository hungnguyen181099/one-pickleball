import React from 'react';

import { Text, TextStyle } from 'react-native';

import { useThemedColors } from '@/hooks/use-theme';

type FormMessageProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

const FormMessage = ({ children, style }: FormMessageProps) => {
  const colors = useThemedColors();

  if (!children) return;

  return (
    <Text
      style={[
        {
          color: colors.error,
          fontSize: 14,
          marginTop: 4,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default FormMessage;
