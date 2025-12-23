import React from 'react';

import { FieldValues } from 'react-hook-form';

import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { DateTimePickerProps } from '@/components/ui/DateTimePicker/DateTimePicker';

import { FormWrapper } from '../FormWrapper';
import { FormWrapperProps } from '../FormWrapper/FormWrapper';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type RHFDateTimePickerProps<T extends FieldValues> = FormWrapperProps<T> & {
  dateTimePicker?: DistributiveOmit<DateTimePickerProps, 'value' | 'onDateChange'>;
};

const RHFDateTimePicker = <T extends FieldValues>({ dateTimePicker, ...props }: RHFDateTimePickerProps<T>) => {
  return (
    <FormWrapper {...props}>
      {({ onChange, value }) => <DateTimePicker onDateChange={onChange} value={value} {...dateTimePicker} />}
    </FormWrapper>
  );
};

export default RHFDateTimePicker;
