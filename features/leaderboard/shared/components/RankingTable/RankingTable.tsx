import React from 'react';

import { StyleSheet, View } from 'react-native';

import { LeaderboardItem } from '../../types';
import { OtherRanking } from '../OtherRanking';
import { TopRanking } from '../TopRanking';

type RankingTableProps = {
  data: LeaderboardItem[];
};

const RankingTable = ({ data }: RankingTableProps) => {
  const topRankings = [data[1], data[0], data[2]].filter((item) => item);
  const otherRankings = data.slice(3);

  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 64 }}></View>
      <TopRanking data={topRankings} />
      {otherRankings.length > 0 && (
        <>
          <View style={{ marginBottom: 16 }}></View>
          <OtherRanking data={otherRankings} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 64,
  },
});

export default RankingTable;
