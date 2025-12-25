import React from 'react';

import { View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { useThemedColors } from '@/hooks/use-theme';

import { StadiumsList } from '../StadiumsList';
import { getStadiumsScreenStyles } from './StadiumsScreen.styles';

const StadiumsScreen = () => {
  const styles = getStadiumsScreenStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sân thi đấu" showBack={false} withBorder={false} />
      <StadiumsList />
    </View>
  );
};

export default StadiumsScreen;
