import React, { useMemo } from 'react';

import { dayjsExt } from '@/lib/days';
import { router } from 'expo-router';
import { useFormContext, useWatch } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { formatCurrencyWithUnit } from '@/utils/format.utils';

import { bookingStepFields } from '../../constants';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import { BookingFormType, CreateBookingBody } from '../../types';
import { getBookingFooterStyles } from './BookingFooter.styles';

type BookingFooterProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingFooter = ({ step, setStep }: BookingFooterProps) => {
  const { mutate: createBooking } = useCreateBooking();
  const styles = useGetStyles(getBookingFooterStyles);

  const { control, trigger, handleSubmit } = useFormContext<BookingFormType>();
  const price = useWatch({ control, name: 'price' });
  const durationHours = useWatch({ control, name: 'durationHours' });

  const totalPrice = useMemo(() => formatCurrencyWithUnit(price * Number(durationHours)), [price, durationHours]);

  const onSubmit = handleSubmit((data) => {
    const body: CreateBookingBody = {
      court_id: data.courtId,
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      customer_email: data.customerEmail || '',
      booking_date: dayjsExt(data.bookingDate).format('YYYY-MM-DD'),
      start_time: data.startTime,
      duration_hours: data.durationHours,
      payment_method: data.paymentMethod,
      notes: data.notes,
    };

    createBooking(body, {
      onSuccess: (data) => {
        if (data.success) {
          Alert.alert('Thành công', 'Bạn đã đặt sân thành công');
          router.replace('/stadiums');
        } else {
          Alert.alert('Thất bại', 'Đã có lỗi xảy ra, vui lòng thử lại');
        }
      },
    });
  });

  const handleNext = async () => {
    const fields = bookingStepFields[step - 1];
    const isValid = await trigger(fields);
    if (!isValid) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  return (
    <View style={styles.container}>
      <Flex justifyContent="space-between">
        <Text color="muted">Tổng cộng:</Text>
        <Text color="primary" size="h2">
          {totalPrice}
        </Text>
      </Flex>

      {step === 1 && (
        <Button radius="full" size="lg" fullWidth onPress={handleNext}>
          <Text color="inherit" size="h3">
            Tiếp tục
          </Text>
        </Button>
      )}

      {step === 2 && (
        <Grid columns={2} gap={4}>
          <GridItem>
            <Button radius="full" variant="light" size="lg" fullWidth onPress={handleBack}>
              <Text color="inherit" size="h3">
                Trở về
              </Text>
            </Button>
          </GridItem>
          <GridItem>
            <Button radius="full" size="lg" fullWidth onPress={handleNext}>
              <Text color="inherit" size="h3">
                Tiếp tục
              </Text>
            </Button>
          </GridItem>
        </Grid>
      )}

      {step === 3 && (
        <Grid columns={2} gap={4}>
          <GridItem>
            <Button radius="full" variant="light" size="lg" fullWidth onPress={handleBack}>
              <Text color="inherit" size="h3">
                Trở về
              </Text>
            </Button>
          </GridItem>
          <GridItem>
            <Button radius="full" size="lg" fullWidth onPress={onSubmit}>
              <Text color="inherit" size="h3">
                Xác nhận
              </Text>
            </Button>
          </GridItem>
        </Grid>
      )}
    </View>
  );
};

export default BookingFooter;
