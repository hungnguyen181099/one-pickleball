import React from 'react';

import { Text, View } from 'react-native';

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
    return <Text>Không có dữ liệu</Text>;
  }

  return (
    <View>
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

export default RankingTable;
