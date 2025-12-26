import { useMutation } from '@tanstack/react-query';

import { bookingMutations } from '../api/booking.mutations';

export const useCreateBooking = () => {
  return useMutation(bookingMutations.booking());
};
