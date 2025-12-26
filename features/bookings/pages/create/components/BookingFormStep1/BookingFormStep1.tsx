import React from 'react';

import { dayjsExt } from '@/lib/days';
import { useLocalSearchParams } from 'expo-router';
import { useFormContext } from 'react-hook-form';

import { RHFDateTimePicker } from '@/components/rhf/RHFDateTimePicker';
import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFSelect } from '@/components/rhf/RHFSelect';
import { SelectOption } from '@/components/ui/Select';

import { bookingDurationHours } from '@/features/bookings/shared/constants';
import { BookingFormType } from '@/features/bookings/types';
import { useStadium } from '@/features/stadiums/shared/hooks/useStadium';

import { BookingFormTime } from '../BookingFormTime';

const BookingFormStep1 = () => {
  const { stadiumId } = useLocalSearchParams<{ stadiumId: string }>();

  const { data, status } = useStadium(stadiumId);

  const {
    control,
    formState: { errors },
  } = useFormContext<BookingFormType>();

  if (status === 'pending') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  const courts: SelectOption[] = data.data.courts.map((item) => ({
    label: item.court_name,
    value: String(item.id),
  }));

  return (
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
        dateTimePicker={{
          mode: 'date',
          minimumDate: dayjsExt().toDate(),
        }}
      />
      <RHFSelect
        controller={{ control: control, name: 'durationHours', message: errors.durationHours?.message }}
        select={{ options: bookingDurationHours }}
        label="Thời lượng (giờ)"
        withAsterisk
      />
      <BookingFormTime />
    </RHFLayout>
  );
};

export default BookingFormStep1;
