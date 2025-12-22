import React from 'react';

import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { BookingFormType } from '../../types';
import { getBookingFooterStyles } from './BookingFooter.styles';

const BookingFooter = () => {
  const styles = useGetStyles(getBookingFooterStyles);

  const { handleSubmit } = useFormContext<BookingFormType>();

  const onSubmit = handleSubmit((data) => {
    console.log('🚀 ~ data: ', data);
  });

  return (
    <View style={styles.container}>
      <Flex justifyContent="space-between">
        <Text color="muted">Tổng cộng:</Text>
        <Text color="primary" size="h2">
          150.000đ
        </Text>
      </Flex>
      <Button radius="full" size="lg" fullWidth onPress={onSubmit}>
        <Text color="inherit" size="h3">
          Tiếp tục
        </Text>
      </Button>
    </View>
  );
};

export default BookingFooter;
