import { useQuery } from '@tanstack/react-query';

import { OPRSLeaderboardQueries } from '../api/oprs-leaderboard.queries';

export const useOPRSLeaderboardDistribution = () => {
  return useQuery(OPRSLeaderboardQueries.distribution());
};
