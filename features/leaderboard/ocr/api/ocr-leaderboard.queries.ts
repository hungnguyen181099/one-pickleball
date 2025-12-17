import { queryOptions } from '@tanstack/react-query';

import { OCRLeaderboardAPI } from './ocr-leaderboard.api';

export const OCRLeaderboardQueries = {
  all: () => ['ocr-leaderboard'],
  lists: () => [...OCRLeaderboardQueries.all(), 'list'],
  list: (rank: string, filters: string) =>
    queryOptions({
      queryKey: [...OCRLeaderboardQueries.lists(), rank, filters],
      queryFn: async () => {
        if (rank) {
          return await OCRLeaderboardAPI.getByRank(rank, filters);
        } else {
          return await OCRLeaderboardAPI.getAll(filters);
        }
      },
    }),
  distribution: () =>
    queryOptions({
      queryKey: [...OCRLeaderboardQueries.all(), 'distribution'],
      queryFn: OCRLeaderboardAPI.getDistribution,
    }),
  elo: () => [...OCRLeaderboardQueries.all(), 'user-elo'],
  userElo: (id?: number) =>
    queryOptions({
      queryKey: [...OCRLeaderboardQueries.elo(), id],
      queryFn: () => OCRLeaderboardAPI.getUserElo(id!),
      enabled: !!id,
    }),
};
