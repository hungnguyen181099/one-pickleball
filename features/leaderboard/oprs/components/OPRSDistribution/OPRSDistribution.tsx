import React from 'react';

import { RankingDistribution } from '@/features/leaderboard/shared/components/RankingDistribution';
import { LeaderboardDistribution } from '@/features/leaderboard/shared/types';

import useGetOPRSLeaderboardDistribution from '../../hooks/useGetOPRSLeaderboardDIstribution';

const OPRSDistribution = () => {
  const { data, status } = useGetOPRSLeaderboardDistribution();

  if (status === 'pending') return;

  if (status === 'error') return;

  const distributionData: LeaderboardDistribution[] = data.data.map((item) => ({
    playerCount: item.count,
    maxPoint: item.max_oprs,
    minPoint: item.min_oprs,
    rank: item.name,
  }));

  return <RankingDistribution data={distributionData} />;
};

export default OPRSDistribution;
