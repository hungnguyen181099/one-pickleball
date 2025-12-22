import React from 'react';

import { View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getBookingHeaderStyles } from './BookingHeader.styles';

const BookingHeader = () => {
  const styles = useGetStyles(getBookingHeaderStyles);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Đặt sân" />
    </View>
  );
};

export default BookingHeader;
