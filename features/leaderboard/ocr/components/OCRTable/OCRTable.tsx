import React from 'react';

import { RankingTable } from '@/features/leaderboard/shared/components/RankingTable';
import { Ranking } from '@/features/leaderboard/shared/types';

import useGetOCRLeaderboard from '../../hooks/useGetOCRLeaderboard';

const OCRTable = () => {
  const { data, status } = useGetOCRLeaderboard();

  if (status === 'pending') return;

  if (status === 'error') return;

  const tableData: Ranking[] =
    data.data?.data.map((item) => ({
      avatar: item.name,
      rank: item.rank,
      name: item.name,
      elo: item.elo_rating,
      tier: item.elo_rank,
      winRate: item.win_rate,
    })) || [];

  return <RankingTable data={tableData} />;
};

export default OCRTable;
