import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { rankings } from '../../constants';
import { MyRanking } from '../MyRanking';
import { OtherRanking } from '../OtherRanking';
import { RankingHeader } from '../RankingHeader';
import { TopRanking } from '../TopRanking';

const topRankings = [rankings[1], rankings[0], rankings[2]];

const otherRankings = rankings.slice(3);

const RankingScreen = () => {
  return (
    <View style={styles.container}>
      <RankingHeader />
      <ScrollView>
        <View style={styles.content}>
          <View style={{ marginBottom: 64 }}></View>
          <TopRanking data={topRankings} />
          <View style={{ marginBottom: 16 }}></View>
          <OtherRanking data={otherRankings} />
          <View style={{ marginBottom: 96 }}></View>
        </View>
      </ScrollView>
      <MyRanking />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
});

export default RankingScreen;
