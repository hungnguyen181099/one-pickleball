import React from 'react';

import { RankingDistribution } from '@/features/leaderboard/shared/components/RankingDistribution';
import { OCRDistributions } from '@/features/leaderboard/shared/constants';
import { LeaderboardDistribution } from '@/features/leaderboard/shared/types';

import useGetOCRLeaderboardDistribution from '../../hooks/useGetOCRLeaderboardDIstribution';

const OCRDistribution = () => {
  const { data, status } = useGetOCRLeaderboardDistribution();

  if (status === 'pending') return;

  if (status === 'error') return;

  const distributionData: LeaderboardDistribution[] = data.data.map((item) => ({
    playerCount: item.player_count,
    maxPoint: item.max_elo,
    minPoint: item.min_elo,
    rank: item.rank,
  }));

  return <RankingDistribution data={OCRDistributions} />;
};

export default OCRDistribution;
