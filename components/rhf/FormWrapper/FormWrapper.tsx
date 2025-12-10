import React from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { View, ViewProps } from 'react-native';
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
};

type FormWrapperWithChildProps<T extends FieldValues> = {
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactElement;
} & FormWrapperProps<T>;

const FormWrapper = <T extends FieldValues>({
  children,
  label,
  description,
  container,
  controller: { control, name, message },
}: FormWrapperWithChildProps<T>) => {
  return (
    <View {...container}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        render={({ field }) => children(field)}
        name={name}
      />
      <FormDescription>{description}</FormDescription>
      <FormMessage>{message}</FormMessage>
    </View>
  );
};

export default FormWrapper;
