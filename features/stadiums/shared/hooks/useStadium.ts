import { useQuery } from '@tanstack/react-query';

import { stadiumQueries } from '../api/stadium.queries';

export const useStadium = (id: string) => {
  return useQuery(stadiumQueries.detail(id));
};
