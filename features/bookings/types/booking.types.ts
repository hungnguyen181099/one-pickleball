import * as z from 'zod';

import { bookingSchema } from '../lib/schema';

export type BookingFormType = z.infer<typeof bookingSchema>;

export type BookingAvailableSlotsResponse = {
  success: boolean;
  available_slots: {
    time: string;
    hour: number;
    end_hour: number;
    price: number;
    is_booked: boolean;
    is_pending: boolean;
  }[];
  booked_slots: {
    start_time: string;
    end_time: string;
    status: string;
  }[];
};

export type CreateBookingResponse = {
  success: boolean;
  message: string;
  booking?: { id: number; booking_id: string; status: string };
};

export type CreateBookingBody = {
  court_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  booking_date: string;
  start_time: string;
  duration_hours: string;
  payment_method: string;
  notes: string;
};
