import React from 'react';

import { RankingTierFilter } from '@/features/leaderboard/shared/components/RankingTierFilter';
import { OPRSTiers } from '@/features/leaderboard/shared/constants';

import { OPRSTable } from '../OPRSTable';

// Use function as children component to pass props
const OPRSTableFilter = () => {
  return <RankingTierFilter data={OPRSTiers}>{(tier) => <OPRSTable tier={tier} />}</RankingTierFilter>;
};

export default OPRSTableFilter;
