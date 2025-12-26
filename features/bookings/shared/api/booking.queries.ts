import { queryOptions } from '@tanstack/react-query';

import { bookingAPI } from './booking.api';

export const bookingQueries = {
  all: () => ['bookings'],
  slots: () => [...bookingQueries.all(), 'slots'],
  slot: (courtId: string | null, filters: string) =>
    queryOptions({
      queryKey: [...bookingQueries.slots(), courtId, filters],
      queryFn: () => bookingAPI.getAvailableSlots(courtId!, filters),
      enabled: !!courtId && !!filters,
    }),
  histories: () => [...bookingQueries.all(), 'histories'],
  history: (filters: string) =>
    queryOptions({
      queryKey: [...bookingQueries.histories(), filters],
      queryFn: () => bookingAPI.getHistory(filters),
    }),
};
