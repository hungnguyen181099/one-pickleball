import { StandardAPIResponse } from '@/types';

export type OCRTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Grandmaster';

export type OCRFilterTier = OCRTier | '';

export type LeaderboardFilter = {
  label: string;
  value: OCRFilterTier;
};

export type LeaderboardItem = {
  rank: number;
  avatar: string;
  point: number;
  name: string;
  tier: string;
};

export type LeaderboardDistribution = {
  rank: OCRTier;
  minPoint: number | null;
  maxPoint: number | null;
  playerCount: number;
};

export type OCRLeaderboardResponse = StandardAPIResponse<
  {
    rank: number;
    user_id: number;
    name: string;
    elo_rating: number;
    elo_rank: string;
    total_matches: number;
    wins: number;
    losses: number;
    win_rate: number;
  }[]
>;

export type OCRLeaderboardByRankResponse = StandardAPIResponse<
  {
    rank_in_tier: number;
    user_id: number;
    name: string;
    elo_rating: number;
    elo_rank: OCRTier;
    total_matches: number;
    wins: number;
    losses: number;
    win_rate: number;
  }[]
> & {
  meta: {
    rank_tier: OCRTier;
    total_players: number;
  };
};

export type OCRUserEloResponse = StandardAPIResponse<{
  user_id: number;
  name: string;
  elo_rating: number;
  elo_rank: string;
  total_matches: number;
  wins: number;
  losses: number;
  win_rate: number;
  oprs: {
    total: string;
    level: string;
    challenge_score: string;
    community_score: string;
  };
}>;

export type OCRLeaderboardDistributionResponse = StandardAPIResponse<
  {
    rank: OCRTier;
    min_elo: number | null;
    max_elo: number | null;
    player_count: number;
  }[]
>;
