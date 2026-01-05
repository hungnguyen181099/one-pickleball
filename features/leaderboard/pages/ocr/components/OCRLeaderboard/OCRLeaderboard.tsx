import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { OCRDistribution } from '../OCRDistribution';
import { OCRTableFilter } from '../OCRTableFilter';
import { OCRUserElo } from '../OCRUserElo';

const OCRLeaderboard = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <ScreenContainer>
      <ScreenHeader title="Bảng xếp hạng OCR" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <OCRTableFilter />
        <OCRDistribution />
      </ScrollView>
      <OCRUserElo />
    </ScreenContainer>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    body: {
      paddingHorizontal: 16,
    },
  });

export default OCRLeaderboard;
