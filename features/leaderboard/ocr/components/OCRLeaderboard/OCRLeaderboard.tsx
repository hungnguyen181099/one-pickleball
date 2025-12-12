import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { MyRanking } from '@/features/leaderboard/shared/components/MyRanking';
import { RankingHeader } from '@/features/leaderboard/shared/components/RankingHeader';

import { OCRTable } from '../OCRTable';

const OCRLeaderboard = () => {
  return (
    <View style={styles.container}>
      <RankingHeader />
      <ScrollView>
        <OCRTable />
      </ScrollView>
      <MyRanking />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 96,
    paddingHorizontal: 24,
  },
});

export default OCRLeaderboard;
