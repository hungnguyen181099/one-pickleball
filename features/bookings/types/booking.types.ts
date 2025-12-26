import * as z from 'zod';

import { bookingSchema } from '../pages/create/lib/schema';

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

export type BookingHistoriesResponse = {
  success: boolean;
  data: {
    id: number;
    court_id: number;
    user_id: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    duration_hours: number;
    hourly_rate: number;
    total_price: number;
    status: string;
    payment_method: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    service_fee: number;
    court: {
      id: number;
      stadium_id: number;
      tournament_id: number | null;
      court_name: string;
      court_number: string;
      court_type: string;
      surface_type: string;
      capacity: number;
      size: string | null;
      status: string;
      description: string | null;
      amenities: string | null;
      is_active: boolean;
      daily_matches: number;
      created_at: string;
      updated_at: string;
      rental_price: number;
      stadium: {
        id: number;
        name: string;
        slug: string;
      };
    };
  }[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};
