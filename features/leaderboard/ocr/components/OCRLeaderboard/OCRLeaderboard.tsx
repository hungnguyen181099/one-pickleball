import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { OCRDistribution } from '../OCRDistribution';
import { OCRTableFilter } from '../OCRTableFilter';
import { OCRUserElo } from '../OCRUserElo';

const OCRLeaderboard = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Bảng xếp hạng OCR" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <OCRTableFilter />
        <OCRDistribution />
      </ScrollView>
      <OCRUserElo />
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 96,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
  });

export default OCRLeaderboard;
