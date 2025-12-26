import React from 'react';

import { dayjsExt } from '@/lib/days';
import { useFormContext, useWatch } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { Grid, GridItem } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';

import { useBookingSlots } from '@/features/bookings/shared/hooks/useBookingSlots';
import { BookingFormType } from '@/features/bookings/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { formatCurrencyWithUnit } from '@/utils/format.utils';

import { getBookingFormTimeStyles } from './BookingFormTime.styles';

const BookingFormTime = () => {
  const styles = useGetStyles(getBookingFormTimeStyles);

  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<BookingFormType>();

  const startTime = useWatch({ control, name: 'startTime' });
  const date = useWatch({ control, name: 'bookingDate' });
  const courtId = useWatch({ control, name: 'courtId' });

  const { data, status } = useBookingSlots(courtId, {
    date: dayjsExt(date).format('YYYY-MM-DD'),
  });

  const handleSelect = (time: string, price: number) => {
    clearErrors('startTime');
    setValue('startTime', time);
    setValue('price', price);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text size="h5">
          <Text>Chọn giờ </Text>
          <Text color="error">*</Text>
        </Text>
        {courtId && errors.startTime?.message && (
          <Text color="error" size="sm">
            {errors.startTime.message}
          </Text>
        )}
      </View>

      {!courtId && <Text color="muted">Vui lòng chọn sân trước</Text>}

      {status === 'success' && (
        <Grid columns={2} gap={8} style={styles.grid}>
          {data.available_slots?.map((item) => {
            const isSelected = item.time === startTime;
            const isDisabled = item.is_pending || item.is_booked;

            if (isDisabled) {
              return (
                <GridItem key={item.time}>
                  <Pressable style={[styles.item, styles.itemDisabled]}>
                    <Text color="muted" size="h4">
                      {item.time}
                    </Text>
                    <Text color="muted" size="h4">
                      {formatCurrencyWithUnit(item.price)}
                    </Text>
                  </Pressable>
                </GridItem>
              );
            }

            return (
              <GridItem key={item.time}>
                <Pressable
                  onPress={() => handleSelect(item.time, item.price)}
                  style={[styles.item, isSelected && styles.itemSelected]}
                >
                  <Text color={isSelected ? 'primaryForeground' : 'default'} size="h4">
                    {item.time}
                  </Text>
                  <Text color={isSelected ? 'primaryForeground' : 'primary'} size="h4">
                    {formatCurrencyWithUnit(item.price)}
                  </Text>
                </Pressable>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </View>
  );
};

export default BookingFormTime;
