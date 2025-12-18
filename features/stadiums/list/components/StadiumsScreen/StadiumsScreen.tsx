import React from 'react';

import { StyleColorsProps } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

import { useThemedColors } from '@/hooks/use-theme';

import { StadiumsList } from '../StadiumsList';

const StadiumsScreen = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <Text>StadiumsScreen</Text>
      <StadiumsList />
    </View>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
  });

export default StadiumsScreen;
