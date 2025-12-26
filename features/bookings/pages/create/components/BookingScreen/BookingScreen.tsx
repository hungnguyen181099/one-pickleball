import React, { useState } from 'react';

import { FormProvider } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { useBookingForm } from '@/features/bookings/shared/hooks/useBookingForm';

import { useGetStyles } from '@/hooks/useGetStyles';

import { BookingFooter } from '../BookingFooter';
import { BookingForm } from '../BookingForm';
import { getBookingScreenStyles } from './BookingScreen.styles';

const BookingScreen = () => {
  const form = useBookingForm();
  const [step, setStep] = useState<number>(1);

  const styles = useGetStyles(getBookingScreenStyles);

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <ScreenHeader title="Đặt sân" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <BookingForm step={step} />
        </ScrollView>
        <BookingFooter step={step} setStep={setStep} />
      </FormProvider>
    </View>
  );
};

export default BookingScreen;
