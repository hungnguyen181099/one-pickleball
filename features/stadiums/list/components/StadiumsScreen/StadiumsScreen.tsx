import React from 'react';

import { StyleColorsProps } from '@/types';
import { StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { useThemedColors } from '@/hooks/use-theme';

import { StadiumsList } from '../StadiumsList';

const StadiumsScreen = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sân thi đấu" showBack={false} />
      <StadiumsList />
    </View>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
  });

export default StadiumsScreen;
