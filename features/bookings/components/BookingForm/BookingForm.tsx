import React from 'react';

import { View } from 'react-native';

import { useGetStyles } from '@/hooks/useGetStyles';

import { BookingFormStep1 } from '../BookingFormStep1';
import { BookingFormStep2 } from '../BookingFormStep2';
import { BookingFormStep3 } from '../BookingFormStep3';
import { getBookingFormStyles } from './BookingForm.styles';

type BookingFormProps = {
  step: number;
};

const BookingForm = ({ step }: BookingFormProps) => {
  const styles = useGetStyles(getBookingFormStyles);

  return (
    <View style={styles.container}>
      {step === 1 && <BookingFormStep1 />}
      {step === 2 && <BookingFormStep2 />}
      {step === 3 && <BookingFormStep3 />}
    </View>
  );
};

export default BookingForm;
