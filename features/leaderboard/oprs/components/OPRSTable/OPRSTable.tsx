import React from 'react';

import { RankingTable } from '@/features/leaderboard/shared/components/RankingTable';
import { LeaderboardItem } from '@/features/leaderboard/shared/types';

import useGetOPRSLeaderboard from '../../hooks/useGetOPRSLeaderboard';

type OPRSTableFilterProps = {
  tier: string;
};

const OPRSTable = ({ tier }: OPRSTableFilterProps) => {
  const { data, status } = useGetOPRSLeaderboard({
    rank: tier,
  });

  if (status === 'pending') return;

  if (status === 'error') return;

  // Parse data
  const tableData: LeaderboardItem[] = data.data.map((item) => {
    return {
      point: item.oprs,
      tier: item.oprs_name,
      avatar: item.user.name,
      name: item.user.name,
      rank: item.rank,
    };
  });

  return <RankingTable data={tableData} />;
};

export default OPRSTable;
