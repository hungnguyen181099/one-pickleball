import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import z from 'zod';

import { RHFProvider } from '@/components/rhf/RHFProvider';
import { RHFSelect } from '@/components/rhf/RHFSelect';
import { SelectOption } from '@/components/ui/Select';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getBookingFormStyles } from './BookingForm.styles';

const bookingSchema = z.object({
  court_id: z.string().nullable(),
});

type BookingFormProps = {
  courts: SelectOption[];
};

const BookingForm = ({ courts }: BookingFormProps) => {
  const styles = useGetStyles(getBookingFormStyles);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      court_id: null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log('🚀 ~ data: ', data);
  });

  return (
    <View style={styles.container}>
      <RHFProvider>
        <RHFSelect
          controller={{ control: control, name: 'court_id', message: errors.court_id?.message }}
          select={{ options: courts }}
          label="Chọn sân"
          withAsterisk
        />
      </RHFProvider>
    </View>
  );
};

export default BookingForm;
