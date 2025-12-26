import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { bookingQueries } from '../api/booking.queries';

type Filters = {
  start_date?: string;
  end_date?: string;
  per_page?: number;
  page?: number;
};

export const useBookingHistory = (filters: Filters = {}) => {
  const queryString = qs.stringify(filters);
  return useQuery(bookingQueries.history(queryString));
};
