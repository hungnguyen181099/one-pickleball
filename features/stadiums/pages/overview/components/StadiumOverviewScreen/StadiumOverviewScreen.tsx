import React from 'react';

import { ScrollView } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';

import { useGetStyles } from '@/hooks/useGetStyles';

import { StadiumOverviewTrend } from '../StadiumOverviewTrend';
import { getStadiumOverviewScreenStyles } from './StadiumOverviewScreen.styles';

const StadiumOverviewScreen = () => {
  const styles = useGetStyles(getStadiumOverviewScreenStyles);

  return (
    <ScreenContainer>
      <ScreenHeader title="Sân đấu" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StadiumOverviewTrend />
      </ScrollView>
    </ScreenContainer>
  );
};

export default StadiumOverviewScreen;
