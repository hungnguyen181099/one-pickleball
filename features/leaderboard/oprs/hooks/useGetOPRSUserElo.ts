import { useQuery } from '@tanstack/react-query';

import OPRSLeaderboardQueries from '../api/oprs-leaderboard.queries';

const useGetOPRSUserElo = (id?: number) => {
  return useQuery(OPRSLeaderboardQueries.userElo(id));
};

export default useGetOPRSUserElo;
