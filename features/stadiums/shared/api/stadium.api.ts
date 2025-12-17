import { fetchWrapper } from '@/utils/fetch.utils';

export const stadiumAPI = {
  getAll: (filter: string) => fetchWrapper(`/stadiums?${filter}`),
  getDetail: (id: number) => fetchWrapper(`/stadiums/${id}`),
};
