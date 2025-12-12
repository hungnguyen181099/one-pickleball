import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import OCRLeaderboardQueries from '../api/ocr-leaderboard.queries';

const useGetOCRLeaderboard = (limit: number = 50) => {
  const queryString = qs.stringify({ limit });
  return useQuery(OCRLeaderboardQueries.list(queryString));
};

export default useGetOCRLeaderboard;
