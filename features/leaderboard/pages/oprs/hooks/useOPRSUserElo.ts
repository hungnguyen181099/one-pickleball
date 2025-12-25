import { useQuery } from '@tanstack/react-query';

import { OPRSLeaderboardQueries } from '../api/oprs-leaderboard.queries';

export const useOPRSUserElo = (id?: number) => {
  return useQuery(OPRSLeaderboardQueries.userElo(id));
};
