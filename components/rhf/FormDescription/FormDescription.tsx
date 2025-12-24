import React from 'react';

import { TextStyle } from 'react-native';

import { Text } from '@/components/ui/Text';

type FormDescriptionProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

const FormDescription = ({ children, style }: FormDescriptionProps) => {
  if (!children) return;

  return (
    <Text
      color="muted"
      size="sm"
      style={[
        {
          marginTop: 4,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default FormDescription;
