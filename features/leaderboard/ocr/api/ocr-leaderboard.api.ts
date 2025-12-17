import { fetchWrapper } from '@/utils/fetch.utils';

import {
  OCRLeaderboardByRankResponse,
  OCRLeaderboardDistributionResponse,
  OCRLeaderboardResponse,
  OCRUserEloResponse,
} from '../types';

export const OCRLeaderboardAPI = {
  getAll: (filter: string) => {
    return fetchWrapper<OCRLeaderboardResponse>(`/ocr/leaderboard?${filter}`);
  },
  getByRank: (rank: string, filter: string) => {
    return fetchWrapper<OCRLeaderboardByRankResponse>(`/ocr/leaderboard/${rank}?${filter}`);
  },
  getDistribution: () => {
    return fetchWrapper<OCRLeaderboardDistributionResponse>(`/ocr/leaderboard/distribution`);
  },
  getUserElo: (id: number) => {
    return fetchWrapper<OCRUserEloResponse>(`/ocr/users/${id}/elo`);
  },
};
