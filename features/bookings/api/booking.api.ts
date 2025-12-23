import { fetchWrapper } from '@/utils/fetch.utils';

import { BookingAvailableSlotsResponse, CreateBookingResponse } from '../types';

export const bookingAPI = {
  getAvailableSlots: (courtId: string, filter: string) =>
    fetchWrapper<BookingAvailableSlotsResponse>(`/court/${courtId}/available-slots?${filter}`),
  createBooking: (body: string) =>
    fetchWrapper<CreateBookingResponse>('/bookings/booking', {
      method: 'POST',
      body: body,
    }),
};
