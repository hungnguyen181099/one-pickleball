import { fetchWrapper } from '@/utils/fetch.utils';

import { HomeProfileResponse } from '../types';

export const homeAPI = {
  getProfile: () => fetchWrapper<HomeProfileResponse>(`/auth/me`),
};
