import { dayjsExt } from '@/lib/days';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { bookingSchema } from '../lib/schema';

export const useBookingForm = () => {
  return useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      courtId: undefined,
      bookingDate: dayjsExt().toDate(),
      durationHours: undefined,
    },
  });
};
