import React from 'react';

import { RankingTable } from '@/features/leaderboard/shared/components/RankingTable';
import { LeaderboardItem } from '@/features/leaderboard/shared/types';

import { useOCRLeaderboard } from '../../hooks/useOCRLeaderboard';

type OCRTableFilterProps = {
  tier: string;
};

const OCRTable = ({ tier }: OCRTableFilterProps) => {
  const { data, status } = useOCRLeaderboard({
    rank: tier,
    limit: 20,
  });

  if (status === 'pending') return;

  if (status === 'error') return;

  // Parse data
  const tableData: LeaderboardItem[] = data.data.map((item) => {
    if ('rank_in_tier' in item) {
      return {
        point: String(item.elo_rating),
        tier: item.elo_rank,
        avatar: item.name,
        name: item.name,
        rank: item.rank_in_tier,
      };
    }

    return {
      point: String(item.elo_rating),
      tier: item.elo_rank,
      avatar: item.name,
      name: item.name,
      rank: item.rank,
    };
  });

  return <RankingTable data={tableData} />;
};

export default OCRTable;
