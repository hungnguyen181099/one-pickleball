import { useQuery } from '@tanstack/react-query';

import OPRSLeaderboardQueries from '../api/oprs-leaderboard.queries';

const useGetOPRSLeaderboardDistribution = () => {
  return useQuery(OPRSLeaderboardQueries.distribution());
};

export default useGetOPRSLeaderboardDistribution;
