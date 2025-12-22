import React from 'react';

import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { RHFDateTimePicker } from '@/components/rhf/RHFDateTimePicker';
import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFSelect } from '@/components/rhf/RHFSelect';
import { SelectOption } from '@/components/ui/Select';

import { useGetStyles } from '@/hooks/useGetStyles';

import { bookingDurationHours } from '../../constants';
import { BookingFormType } from '../../types';
import { getBookingFormStyles } from './BookingForm.styles';

type BookingFormProps = {
  courts: SelectOption[];
};

const BookingForm = ({ courts }: BookingFormProps) => {
  const styles = useGetStyles(getBookingFormStyles);

  const {
    control,
    formState: { errors },
  } = useFormContext<BookingFormType>();

  return (
    <View style={styles.container}>
      <RHFLayout>
        <RHFSelect
          controller={{ control: control, name: 'courtId', message: errors.courtId?.message }}
          select={{ options: courts }}
          label="Chọn sân"
          withAsterisk
        />
        <RHFDateTimePicker
          controller={{ control: control, name: 'bookingDate', message: errors.bookingDate?.message }}
          label="Ngày đặt sân"
          withAsterisk
        />
        <RHFSelect
          controller={{ control: control, name: 'durationHours', message: errors.durationHours?.message }}
          select={{ options: bookingDurationHours }}
          label="Thời lượng (giờ)"
          withAsterisk
        />
      </RHFLayout>
    </View>
  );
};

export default BookingForm;
