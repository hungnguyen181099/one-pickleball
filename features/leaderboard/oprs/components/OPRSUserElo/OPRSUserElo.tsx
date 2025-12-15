import React from 'react';

import { useSession } from '@/contexts/AuthProvider';

import { MyRanking } from '@/features/leaderboard/shared/components/MyRanking';
import { LeaderboardItem } from '@/features/leaderboard/shared/types';

import useGetOPRSUserElo from '../../hooks/useGetOPRSUserElo';

const OPRSUserElo = () => {
  const { user } = useSession();
  const { data, status } = useGetOPRSUserElo(user?.id);

  if (status === 'pending') return;

  if (status === 'error') return;

  const rankingData: LeaderboardItem = {
    avatar: data.data.name,
    rank: 0,
    name: data.data.name,
    point: data.data.total_oprs,
    tier: data.data.oprs_name,
  };

  return <MyRanking {...rankingData} />;
};

export default OPRSUserElo;
