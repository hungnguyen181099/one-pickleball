import React from 'react';

import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { SelectOption } from '@/components/ui/Select';

import { useStadium } from '@/features/stadiums/shared/hooks/useStadium';

import { useGetStyles } from '@/hooks/useGetStyles';

import { BookingFooter } from '../BookingFooter';
import { BookingForm } from '../BookingForm';
import { BookingHeader } from '../BookingHeader';
import { getBookingScreenStyles } from './BookingScreen.styles';

const BookingScreen = () => {
  const { stadiumId } = useLocalSearchParams<{ stadiumId: string }>();

  const { data, status } = useStadium(stadiumId);

  const styles = useGetStyles(getBookingScreenStyles);

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
    <View style={styles.container}>
      <BookingHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BookingForm courts={courts} />
      </ScrollView>
      <BookingFooter />
    </View>
  );
};

export default BookingScreen;
