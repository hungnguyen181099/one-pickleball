import { LeaderboardDistribution, LeaderboardDistributionStatLabels, LeaderboardFilter } from '../types';

export const OCRTiers: LeaderboardFilter[] = [
  { label: 'Tất cả', value: '' },
  { label: 'Bronze', value: 'Bronze' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Platinum', value: 'Platinum' },
  { label: 'Diamond', value: 'Diamond' },
  { label: 'Master', value: 'Master' },
  { label: 'Grandmaster', value: 'Grandmaster' },
];

export const OCRDistributions: LeaderboardDistribution[] = [
  {
    rank: 'Bronze',
    minPoint: 0,
    maxPoint: 1099,
    playerCount: 2,
  },
  {
    rank: 'Silver',
    minPoint: 1100,
    maxPoint: 1299,
    playerCount: 0,
  },
  {
    rank: 'Gold',
    minPoint: 1300,
    maxPoint: 1499,
    playerCount: 0,
  },
  {
    rank: 'Platinum',
    minPoint: 1500,
    maxPoint: 1699,
    playerCount: 0,
  },
  {
    rank: 'Diamond',
    minPoint: 1700,
    maxPoint: 1899,
    playerCount: 0,
  },
  {
    rank: 'Master',
    minPoint: 1900,
    maxPoint: 2099,
    playerCount: 0,
  },
  {
    rank: 'Grandmaster',
    minPoint: 2100,
    maxPoint: null,
    playerCount: 0,
  },
];

export const leaderboardDistributionStatLabels: LeaderboardDistributionStatLabels = {
  rank: 'Hạng',
  playerCount: 'Số người',
  minPoint: 'Điểm thấp',
  maxPoint: 'Điểm cao',
};
