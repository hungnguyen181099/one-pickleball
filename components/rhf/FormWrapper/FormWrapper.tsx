import React from 'react';

import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { TextStyle, View, ViewProps } from 'react-native';

import { Text } from '@/components/ui/Text';

import { FormDescription } from '../FormDescription';
import { FormLabel } from '../FormLabel';
import { FormMessage } from '../FormMessage';

export type FormWrapperProps<T extends FieldValues> = {
  controller: {
    control: Control<T>;
    name: Path<T>;
    message?: string;
  };
  container?: ViewProps;
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  styleOverrides?: {
    label?: TextStyle;
    description?: TextStyle;
    message?: TextStyle;
  };
};

type FormWrapperWithChildProps<T extends FieldValues> = {
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactElement;
} & FormWrapperProps<T>;

const FormWrapper = <T extends FieldValues>({
  children,
  label,
  description,
  container,
  withAsterisk = false,
  styleOverrides = {},
  controller: { control, name, message },
}: FormWrapperWithChildProps<T>) => {
  return (
    <View {...container}>
      <FormLabel style={styleOverrides.label}>
        {label} {withAsterisk && <Text color="error">*</Text>}
      </FormLabel>

      <Controller control={control} render={({ field }) => children(field)} name={name} />

      <FormDescription style={styleOverrides.description}>{description}</FormDescription>

      <FormMessage style={styleOverrides.message}>{message}</FormMessage>
    </View>
  );
};

export default FormWrapper;
