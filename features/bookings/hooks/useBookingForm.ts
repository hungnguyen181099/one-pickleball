import { dayjsExt } from '@/lib/days';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSession } from '@/contexts/AuthProvider';

import { bookingSchema } from '../lib/schema';

export const useBookingForm = () => {
  const { user } = useSession();

  return useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      courtId: null,
      bookingDate: dayjsExt().toDate(),
      durationHours: null,
      startTime: '',
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerEmail: user?.email || '',
      notes: '',
      paymentMethod: '',
      price: 0,
    },
    mode: 'onChange',
  });
};
