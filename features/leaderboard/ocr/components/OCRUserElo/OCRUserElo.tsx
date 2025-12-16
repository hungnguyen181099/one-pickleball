import React from 'react';

import { useSession } from '@/contexts/AuthProvider';

import { MyRanking } from '@/features/leaderboard/shared/components/MyRanking';
import { LeaderboardItem } from '@/features/leaderboard/shared/types';

import useGetOCRUserElo from '../../hooks/useGetOCRUserElo';

const OCRUserElo = () => {
  const { user } = useSession();
  const { data, status } = useGetOCRUserElo(user?.id);

  if (status === 'pending') return;

  if (status === 'error') return;

  const rankingData: LeaderboardItem = {
    avatar: data.data.name,
    rank: 0,
    name: data.data.name,
    point: String(data.data.elo_rating),
    tier: data.data.elo_rank,
  };

  return <MyRanking {...rankingData} />;
};

export default OCRUserElo;
