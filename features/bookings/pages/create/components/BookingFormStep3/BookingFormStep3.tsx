import React from 'react';

import { useFormContext } from 'react-hook-form';

import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFSelect } from '@/components/rhf/RHFSelect';

import { bookingPaymentMethods } from '@/features/bookings/shared/constants';
import { BookingFormType } from '@/features/bookings/types';

const BookingFormStep3 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookingFormType>();

  return (
    <RHFLayout>
      <RHFSelect
        controller={{ control: control, name: 'paymentMethod', message: errors.paymentMethod?.message }}
        select={{ options: bookingPaymentMethods, placeholder: '-- Chọn phương thức --' }}
        label="Phương thức thanh toán"
        withAsterisk
      />
    </RHFLayout>
  );
};

export default BookingFormStep3;
