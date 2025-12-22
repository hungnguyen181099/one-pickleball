import * as z from 'zod';

export const bookingSchema = z.object({
  courtId: z.string('Không được để trống').min(1, 'Không được để trống'),
  bookingDate: z.date(),
  durationHours: z.string('Không được để trống').min(1, 'Không được để trống'),
});
