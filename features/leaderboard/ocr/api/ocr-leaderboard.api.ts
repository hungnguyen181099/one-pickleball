import APIClient from '@/services/api/client';

import { OCRLeaderboardUser } from '../../shared/types';

const OCRLeaderboardAPI = {
  getAll: (filter: string) => {
    return APIClient.get<{ data: OCRLeaderboardUser[] }>(`ocr/leaderboard?${filter}`);
  },
};

export default OCRLeaderboardAPI;
