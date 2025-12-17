import { useQuery } from '@tanstack/react-query';

import { OCRLeaderboardQueries } from '../api/ocr-leaderboard.queries';

export const useOCRUserElo = (id?: number) => {
  return useQuery(OCRLeaderboardQueries.userElo(id));
};
