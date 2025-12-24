import { useQuery } from '@tanstack/react-query';

import { homeQueries } from '../api/home.queries';

export const useHomeProfile = () => {
  return useQuery(homeQueries.profile());
};
