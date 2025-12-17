import { useQuery } from '@tanstack/react-query';

import { OCRLeaderboardQueries } from '../api/ocr-leaderboard.queries';

export const useOCRLeaderboardDistribution = () => {
  return useQuery(OCRLeaderboardQueries.distribution());
};
