import React from 'react';

import { FieldValues } from 'react-hook-form';

import { Select, SelectOptions } from '@/components/ui/Select';

import { FormWrapper } from '../FormWrapper';
import { FormWrapperProps } from '../FormWrapper/FormWrapper';

type RHFSelectProps<T extends FieldValues> = FormWrapperProps<T> & {
  select: {
    options: SelectOptions[];
    placeholder?: string;
  };
};

const RHFSelect = <T extends FieldValues>({ select, ...props }: RHFSelectProps<T>) => {
  return (
    <FormWrapper {...props}>
      {({ onChange, value }) => <Select onChangeValue={onChange} value={value} {...select} />}
    </FormWrapper>
  );
};

export default RHFSelect;
