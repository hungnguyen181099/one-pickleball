import React from 'react';

import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { StadiumSkeleton } from '@/components/ui/Skeleton';

import { useStadium } from '@/features/stadiums/shared/hooks/useStadium';

import { useThemedColors } from '@/hooks/use-theme';

import { StadiumAmenities } from '../StadiumAmenities';
import { StadiumCourts } from '../StadiumCourts';
import { StadiumFooter } from '../StadiumFooter';
import { StadiumHeader } from '../StadiumHeader';
import { StadiumHero } from '../StadiumHero';
import { StadiumMap } from '../StadiumMap';
import { StadiumRibbon } from '../StadiumRibbon';
import { getStadiumScreenStyles } from './StadiumScreen.styles';

const StadiumScreen = () => {
  const { stadiumId } = useLocalSearchParams<{ stadiumId: string }>();

  const { data, status } = useStadium(stadiumId);

  const styles = getStadiumScreenStyles({ colors: useThemedColors() });

  if (status === 'pending') {
    return <StadiumSkeleton />;
  }

  if (status === 'error') {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StadiumHero image={data.data.image} />
        <View style={styles.body}>
          <StadiumRibbon />
          <StadiumHeader {...data.data} />
          <StadiumAmenities items={data.data.amenities} />
          <StadiumCourts items={data.data.courts} />
          <StadiumMap link={data.data.maps_link} />
        </View>
      </ScrollView>
      <StadiumFooter courts={data.data.courts} />
    </View>
  );
};

export default StadiumScreen;
