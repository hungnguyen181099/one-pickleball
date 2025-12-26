import React from 'react';

import { ScrollView, View } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';

import { useGetStyles } from '@/hooks/useGetStyles';

import { HomeActions } from '../HomeActions';
import { HomeTopBar } from '../HomeTopBar';
import { HomeUser } from '../HomeUser';
import { getHomeScreenStyles } from './HomeScreen.styles';

const HomeScreen = () => {
  const styles = useGetStyles(getHomeScreenStyles);

  return (
    <ScreenContainer>
      <HomeTopBar />
      <ScrollView>
        <View style={styles.body}>
          <HomeUser />
          <HomeActions />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
