import React from 'react';

import { RankingTierFilter } from '@/features/leaderboard/shared/components/RankingTierFilter';
import { OCRTiers } from '@/features/leaderboard/shared/constants';

import { OCRTable } from '../OCRTable';

// Use function as children component to pass props
const OCRTableFilter = () => {
  return <RankingTierFilter data={OCRTiers}>{(tier) => <OCRTable tier={tier} />}</RankingTierFilter>;
};

export default OCRTableFilter;
