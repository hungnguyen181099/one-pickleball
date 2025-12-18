import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { stadiumQueries } from '../api/stadium.queries';

type Params = {
  direction?: 'asc' | 'desc';
  province_id?: string;
  per_page?: number;
  search?: string;
  sort?: string;
  page?: number;
};

export const useStadiums = (params: Params = {}) => {
  const queryString = qs.stringify(params);
  return useQuery(stadiumQueries.list(queryString));
};
