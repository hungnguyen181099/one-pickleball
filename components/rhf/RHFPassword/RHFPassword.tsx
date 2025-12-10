import { PasswordInput } from '@/components/common/PasswordInput';
import { InputProps } from '@/components/ui/Input/Input';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FormWrapper } from '../FormWrapper';
import { FormWrapperProps } from '../FormWrapper/FormWrapper';

type RHFPasswordProps<T extends FieldValues> = FormWrapperProps<T> & {
  input?: Omit<InputProps, 'endIcon' | 'secureTextEntry'>;
};

const RHFPassword = <T extends FieldValues>({
  input,
  ...props
}: RHFPasswordProps<T>) => {
  return (
    <FormWrapper {...props}>
      {({ onChange, onBlur, value }) => (
        <PasswordInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...input}
        />
      )}
    </FormWrapper>
  );
};

export default RHFPassword;
