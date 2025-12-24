import { mutationOptions } from '@tanstack/react-query';

import { CreateBookingBody } from '../types';
import { bookingAPI } from './booking.api';

export const bookingMutations = {
  booking: () =>
    mutationOptions({
      mutationFn: (body: CreateBookingBody) => bookingAPI.createBooking(JSON.stringify(body)),
    }),
};
