import React from 'react';

import { TextStyle } from 'react-native';

import { Text } from '@/components/ui/Text';

type FormLabelProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

const FormLabel = ({ children, style }: FormLabelProps) => {
  if (!children) return;

  return (
    <Text
      size="h5"
      style={[
        {
          marginBottom: 8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default FormLabel;
