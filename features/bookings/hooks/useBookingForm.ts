import { dayjsExt } from '@/lib/days';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { bookingSchema } from '../lib/schema';

export const useBookingForm = () => {
  return useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      courtId: null,
      bookingDate: dayjsExt().toDate(),
      durationHours: null,
      startTime: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      notes: '',
      paymentMethod: '',
      price: 0,
    },
    mode: 'onChange',
  });
};
