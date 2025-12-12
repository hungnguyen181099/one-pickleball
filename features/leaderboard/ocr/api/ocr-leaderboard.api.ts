import { fetchWrapper } from '@/utils/fetch.utils';

import { OCRLeaderboardResponse } from '../../shared/types';

const OCRLeaderboardAPI = {
  getAll: (filter: string) => {
    return fetchWrapper<OCRLeaderboardResponse>(`/ocr/leaderboard?${filter}`);
  },
};

export default OCRLeaderboardAPI;
