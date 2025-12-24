import React from 'react';

import { ScrollView, View } from 'react-native';

import { useGetStyles } from '@/hooks/useGetStyles';

import { HomeActions } from '../HomeActions';
import { HomeTopBar } from '../HomeTopBar';
import { HomeUser } from '../HomeUser';
import { getHomeScreenStyles } from './HomeScreen.styles';

const HomeScreen = () => {
  const styles = useGetStyles(getHomeScreenStyles);

  return (
    <View style={styles.container}>
      <HomeTopBar />
      <ScrollView>
        <View style={styles.body}>
          <HomeUser />
          <HomeActions />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
