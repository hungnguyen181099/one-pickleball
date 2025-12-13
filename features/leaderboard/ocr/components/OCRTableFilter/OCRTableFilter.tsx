import React from 'react';

import { OCRTiers } from '@/features/leaderboard/shared/constants';

import { RankingTierFilter } from '../../../shared/components/RankingTierFilter';
import { OCRTable } from '../OCRTable';

// Use function as children component to pass props
const OCRTableFilter = () => {
  return <RankingTierFilter data={OCRTiers}>{(tier) => <OCRTable tier={tier} />}</RankingTierFilter>;
};

export default OCRTableFilter;
