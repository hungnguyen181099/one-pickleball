import { fetchWrapper } from '@/utils/fetch.utils';

import {
  OPRSLeaderboardByRankResponse,
  OPRSLeaderboardDistributionResponse,
  OPRSLeaderboardResponse,
  OPRSUserEloResponse,
} from '../types';

export const OPRSLeaderboardAPI = {
  getAll: (filter: string) => {
    return fetchWrapper<OPRSLeaderboardResponse>(`/oprs/leaderboard?${filter}`);
  },
  getByRank: (rank: string, filter: string) => {
    return fetchWrapper<OPRSLeaderboardByRankResponse>(`/oprs/leaderboard/level/${rank}?${filter}`);
  },
  getDistribution: () => {
    return fetchWrapper<OPRSLeaderboardDistributionResponse>(`/oprs/leaderboard/distribution`);
  },
  getUserElo: (id: number) => {
    return fetchWrapper<OPRSUserEloResponse>(`/oprs/users/${id}`);
  },
};
