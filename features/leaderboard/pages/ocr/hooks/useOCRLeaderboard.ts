import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { OCRLeaderboardQueries } from '../api/ocr-leaderboard.queries';

type Params = {
  rank?: string;
  limit?: number;
};

export const useOCRLeaderboard = ({ rank = '', limit = 50 }: Params = {}) => {
  const queryString = qs.stringify({ limit });
  return useQuery(OCRLeaderboardQueries.list(rank, queryString));
};
