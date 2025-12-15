export type LeaderboardItem = {
  rank: number;
  avatar: string;
  point: string;
  name: string;
  tier: string;
};

export type LeaderboardDistribution = {
  rank: string;
  minPoint: number | null;
  maxPoint: number | null;
  playerCount: number;
};

export type LeaderboardDistributionStatLabels = {
  [K in keyof LeaderboardDistribution]: string;
};
