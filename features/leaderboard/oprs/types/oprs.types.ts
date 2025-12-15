import { StandardAPIResponse } from '@/types';

import { OCRTier } from '../../ocr/types';

export type OPRSName = 'Beginner' | 'Novice' | 'Intermediate' | 'Upper Intermediate' | 'Advanced' | 'Pro' | 'Elite';

export type OPRSTier = '1.0' | '2.0' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0+';

export type OPRSFilterTier = OPRSTier | '';

export type OPRSLeaderboardFilter = {
  label: string;
  value: OPRSFilterTier;
};

export type OPRSLeaderboardResponse = StandardAPIResponse<
  {
    rank: number;
    user: {
      id: number;
      name: string;
    };
    oprs: string;
    oprs_name: string;
    opr_level: string;
    elo_rating: number;
    elo_rank: OCRTier;
    stats: {
      matches: number;
      wins: number;
      win_rate: number;
    };
  }[]
>;

export type OPRSLeaderboardByRankResponse = StandardAPIResponse<
  {
    rank: number;
    user: {
      id: number;
      name: string;
    };
    oprs: string;
    oprs_name: string;
    opr_level: string;
    stats: {
      matches: number;
      wins: number;
    };
  }[]
> & {
  meta: {
    level: string;
    level_info: {
      name: string;
      min: number;
      max: number;
    };
    offset: number;
    limit: number;
  };
};

export type OPRSUserEloResponse = StandardAPIResponse<{
  user_id: number;
  name: string;
  total_oprs: string;
  oprs_name: string;
  opr_level: string;
  breakdown: {
    elo: {
      raw: number;
      weight: number;
      weighted: number;
    };
    challenge: {
      raw: number;
      weight: number;
      weighted: number;
    };
    community: {
      raw: number;
      weight: number;
      weighted: number;
    };
    total: number;
    level: string;
    level_info: {
      name: string;
      min: number;
      max: number;
    };
  };
  rank: number;
  elo_rating: number;
  elo_rank: string;
  total_matches: number;
  win_rate: number;
}>;

export type OPRSLeaderboardDistributionResponse = StandardAPIResponse<
  {
    level: string;
    name: OPRSTier;
    min_oprs: number | null;
    max_oprs: number | null;
    count: number;
  }[]
>;
