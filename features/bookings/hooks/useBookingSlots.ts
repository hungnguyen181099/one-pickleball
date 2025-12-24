import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { bookingQueries } from '../api/booking.queries';

type Filters = {
  date?: string;
};

export const useBookingSlots = (courtId: string | null, filters: Filters = {}) => {
  const queryString = qs.stringify(filters);
  return useQuery(bookingQueries.slot(courtId, queryString));
};
