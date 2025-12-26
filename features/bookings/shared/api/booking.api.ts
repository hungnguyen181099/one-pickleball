import { fetchWrapper } from '@/utils/fetch.utils';

import { BookingAvailableSlotsResponse, BookingHistoriesResponse, CreateBookingResponse } from '../../types';

export const bookingAPI = {
  getAvailableSlots: (courtId: string, filter: string) =>
    fetchWrapper<BookingAvailableSlotsResponse>(`/court/${courtId}/available-slots?${filter}`),
  getHistory: (filter: string) => fetchWrapper<BookingHistoriesResponse>(`/bookings/history?${filter}`),
  createBooking: (body: string) =>
    fetchWrapper<CreateBookingResponse>('/bookings/booking', {
      method: 'POST',
      body: body,
    }),
};
