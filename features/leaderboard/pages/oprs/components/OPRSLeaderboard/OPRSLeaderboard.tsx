import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { OPRSDistribution } from '../OPRSDistribution';
import { OPRSTableFilter } from '../OPRSTableFilter';
import { OPRSUserElo } from '../OPRSUserElo';

const OPRSLeaderboard = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <ScreenContainer>
      <ScreenHeader title="Bảng xếp hạng OPS" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <OPRSTableFilter />
        <OPRSDistribution />
      </ScrollView>
      <OPRSUserElo />
    </ScreenContainer>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    body: {
      paddingHorizontal: 16,
      paddingBottom: 112,
    },
  });

export default OPRSLeaderboard;
