import { fetchWrapper } from '@/utils/fetch.utils';

import { StadiumDetailResponse, StadiumListResponse } from '../types';

export const stadiumAPI = {
  getAll: (filter: string) => fetchWrapper<StadiumListResponse>(`/stadiums?${filter}`),
  getDetail: (id: string) => fetchWrapper<StadiumDetailResponse>(`/stadiums/${id}`),
};
