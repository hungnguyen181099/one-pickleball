import { queryOptions } from '@tanstack/react-query';

import { OPRSLeaderboardAPI } from './oprs-leaderboard.api';

export const OPRSLeaderboardQueries = {
  all: () => ['oprs-leaderboard'],
  lists: () => [...OPRSLeaderboardQueries.all(), 'list'],
  list: (rank: string, filters: string) =>
    queryOptions({
      queryKey: [...OPRSLeaderboardQueries.lists(), rank, filters],
      queryFn: async () => {
        if (rank) {
          return await OPRSLeaderboardAPI.getByRank(rank, filters);
        } else {
          return await OPRSLeaderboardAPI.getAll(filters);
        }
      },
    }),
  distribution: () =>
    queryOptions({
      queryKey: [...OPRSLeaderboardQueries.all(), 'distribution'],
      queryFn: OPRSLeaderboardAPI.getDistribution,
    }),
  elo: () => [...OPRSLeaderboardQueries.all(), 'user-elo'],
  userElo: (id?: number) =>
    queryOptions({
      queryKey: [...OPRSLeaderboardQueries.elo(), id],
      queryFn: () => OPRSLeaderboardAPI.getUserElo(id!),
      enabled: !!id,
    }),
};
