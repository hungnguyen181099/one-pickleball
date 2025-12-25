import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { OPRSLeaderboardQueries } from '../api/oprs-leaderboard.queries';

type Params = {
  rank?: string;
  limit?: number;
};

export const useOPRSLeaderboard = ({ rank = '', limit = 50 }: Params = {}) => {
  const queryString = qs.stringify({ limit });
  return useQuery(OPRSLeaderboardQueries.list(rank, queryString));
};
