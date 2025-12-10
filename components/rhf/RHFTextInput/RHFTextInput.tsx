import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { FormDescription } from '../FormDescription';
import { FormLabel } from '../FormLabel';
import { FormMessage } from '../FormMessage';

type RHFTextInputProps<T extends FieldValues> = {
  controller: {
    control: Control<T>;
    name: Path<T>;
    message?: string;
  };
  input?: TextInputProps;
  container?: ViewProps;
  label?: string;
  description?: string;
};

const RHFTextInput = <T extends FieldValues>({
  controller: { control, name, message },
  input,
  label,
  description,
  container,
}: RHFTextInputProps<T>) => {
  return (
    <View {...container}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...input}
          />
        )}
        name={name}
      />
      <FormDescription>{description}</FormDescription>
      <FormMessage>{message}</FormMessage>
    </View>
  );
};

export default RHFTextInput;
