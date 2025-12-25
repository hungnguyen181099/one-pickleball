import React from 'react';

import { RankingDistribution } from '@/features/leaderboard/shared/components/RankingDistribution';
import { LeaderboardDistribution } from '@/features/leaderboard/shared/types';

import { useOCRLeaderboardDistribution } from '../../hooks/useOCRLeaderboardDistribution';

const OCRDistribution = () => {
  const { data, status } = useOCRLeaderboardDistribution();

  if (status === 'pending') return;

  if (status === 'error') return;

  const distributionData: LeaderboardDistribution[] = data.data.map((item) => ({
    playerCount: item.player_count,
    maxPoint: item.max_elo,
    minPoint: item.min_elo,
    rank: item.rank,
  }));

  return <RankingDistribution data={distributionData} />;
};

export default OCRDistribution;
