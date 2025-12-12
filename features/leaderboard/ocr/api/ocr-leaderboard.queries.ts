import { queryOptions } from '@tanstack/react-query';

import OCRLeaderboardAPI from './ocr-leaderboard.api';

const OCRLeaderboardQueries = {
  all: () => ['ocr-leaderboard'],
  lists: () => [...OCRLeaderboardQueries.all(), 'list'],
  list: (filters: string) =>
    queryOptions({
      queryKey: [...OCRLeaderboardQueries.lists(), filters],
      queryFn: () => OCRLeaderboardAPI.getAll(filters),
    }),
};

export default OCRLeaderboardQueries;
