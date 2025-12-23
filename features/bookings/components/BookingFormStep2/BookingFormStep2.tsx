import React from 'react';

import { useFormContext } from 'react-hook-form';

import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFTextInput } from '@/components/rhf/RHFTextInput';

import { BookingFormType } from '../../types';

const BookingFormStep2 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookingFormType>();

  return (
    <RHFLayout>
      <RHFTextInput
        controller={{ control: control, name: 'customerName', message: errors.customerName?.message }}
        label="Họ tên"
        withAsterisk
        input={{
          placeholder: 'Nguyễn Văn A',
        }}
      />
      <RHFTextInput
        controller={{ control: control, name: 'customerPhone', message: errors.customerPhone?.message }}
        label="Số điện thoại"
        withAsterisk
        input={{
          placeholder: '0987654321',
        }}
      />
      <RHFTextInput
        controller={{ control: control, name: 'customerEmail', message: errors.customerEmail?.message }}
        label="Địa chỉ email"
        input={{
          placeholder: 'a@gmail.com',
        }}
      />
      <RHFTextInput
        controller={{ control: control, name: 'notes', message: errors.notes?.message }}
        label="Ghi chú"
        input={{
          multiline: true,
          numberOfLines: 3,
          placeholder: 'Viết gì đó ...',
        }}
      />
    </RHFLayout>
  );
};

export default BookingFormStep2;
