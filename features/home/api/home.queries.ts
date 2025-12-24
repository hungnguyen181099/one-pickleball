import { queryOptions } from '@tanstack/react-query';

import { homeAPI } from './home.api';

export const homeQueries = {
  all: () => ['home'],
  profile: () =>
    queryOptions({
      queryKey: [...homeQueries.all(), 'profile'],
      queryFn: () => homeAPI.getProfile(),
    }),
};
