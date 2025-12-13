import { useQuery } from '@tanstack/react-query';

import OCRLeaderboardQueries from '../api/ocr-leaderboard.queries';

const useGetOCRLeaderboardDistribution = () => {
  return useQuery(OCRLeaderboardQueries.distribution());
};

export default useGetOCRLeaderboardDistribution;
