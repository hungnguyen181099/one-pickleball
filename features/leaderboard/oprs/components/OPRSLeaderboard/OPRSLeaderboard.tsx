import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { OPRSDistribution } from '../OPRSDistribution';
import { OPRSTableFilter } from '../OPRSTableFilter';
import { OPRSUserElo } from '../OPRSUserElo';

const OPRSLeaderboard = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Bảng xếp hạng OPRS" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <OPRSTableFilter />
        <OPRSDistribution />
      </ScrollView>
      <OPRSUserElo />
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 96,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
  });

export default OPRSLeaderboard;
