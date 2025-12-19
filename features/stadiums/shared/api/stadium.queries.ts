import { queryOptions } from '@tanstack/react-query';

import { stadiumAPI } from './stadium.api';

export const stadiumQueries = {
  all: () => ['stadiums'],
  lists: () => [...stadiumQueries.all(), 'list'],
  list: (filters: string) =>
    queryOptions({
      queryKey: [...stadiumQueries.lists(), filters],
      queryFn: () => stadiumAPI.getAll(filters),
    }),
  details: () => [...stadiumQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...stadiumQueries.details(), id],
      queryFn: () => stadiumAPI.getDetail(id),
    }),
};
