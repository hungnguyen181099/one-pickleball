export type Ranking = {
  rank: number;
  avatar: string;
  elo: number;
  tier: string;
  winRate: number;
  name: string;
};

export type OCRLeaderboardUser = {
  rank: number;
  user_id: number;
  name: string;
  elo_rating: number;
  elo_rank: string;
  total_matches: number;
  wins: number;
  losses: number;
  win_rate: number;
};
