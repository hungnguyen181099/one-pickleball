import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/common/ScreenHeader';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { OCRDistribution } from '../OCRDistribution';
import { OCRTableFilter } from '../OCRTableFilter';
import { OCRUserElo } from '../OCRUserElo';

const OCRLeaderboard = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Bảng xếp hạng OCR" />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OCRTableFilter />
          <OCRDistribution />
        </ScrollView>
      </View>
      <OCRUserElo />
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 160,
      backgroundColor: colors.background,
    },
    body: {
      paddingHorizontal: 16,
    },
  });

export default OCRLeaderboard;
