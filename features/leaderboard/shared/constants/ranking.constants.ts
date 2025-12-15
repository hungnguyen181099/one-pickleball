import { OCRLeaderboardFilter } from '../../ocr/types';
import { OPRSLeaderboardFilter } from '../../oprs/types';
import { LeaderboardDistributionStatLabels } from '../types';

export const OCRTiers: OCRLeaderboardFilter[] = [
  { label: 'Tất cả', value: '' },
  { label: 'Bronze', value: 'Bronze' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Platinum', value: 'Platinum' },
  { label: 'Diamond', value: 'Diamond' },
  { label: 'Master', value: 'Master' },
  { label: 'Grandmaster', value: 'Grandmaster' },
];

export const OPRSTiers: OPRSLeaderboardFilter[] = [
  { label: 'Tất cả', value: '' },
  { label: 'Beginner', value: '1.0' },
  { label: 'Novice', value: '2.0' },
  { label: 'Intermediate', value: '3.0' },
  { label: 'Upper Intermediate', value: '3.5' },
  { label: 'Advanced', value: '4.0' },
  { label: 'Pro', value: '4.5' },
  { label: 'Elite', value: '5.0+' },
];

export const leaderboardDistributionStatLabels: LeaderboardDistributionStatLabels = {
  rank: 'Hạng',
  playerCount: 'Số người',
  minPoint: 'Điểm thấp',
  maxPoint: 'Điểm cao',
};
