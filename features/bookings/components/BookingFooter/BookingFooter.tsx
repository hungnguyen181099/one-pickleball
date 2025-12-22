import React from 'react';

import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getBookingFooterStyles } from './BookingFooter.styles';

const BookingFooter = () => {
  const styles = useGetStyles(getBookingFooterStyles);

  return (
    <View style={styles.container}>
      <Flex justifyContent="space-between">
        <Text color="muted">Tổng cộng:</Text>
        <Text color="primary" size="h2">
          150.000đ
        </Text>
      </Flex>
      <Button radius="full" size="lg">
        <Text color="inherit" size="h3">
          Tiếp tục
        </Text>
      </Button>
    </View>
  );
};

export default BookingFooter;
