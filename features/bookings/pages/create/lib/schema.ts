import * as z from 'zod';

import { phoneRegex } from '@/constants/global.constants';

export const bookingSchema = z.object({
  // Step 1
  courtId: z.preprocess((v) => v ?? undefined, z.string('Không được để trống').min(1, 'Không được để trống')),
  bookingDate: z.preprocess((v) => v ?? undefined, z.date('Không được để trống')),
  durationHours: z.preprocess((v) => v ?? undefined, z.string('Không được để trống').min(1, 'Không được để trống')),
  startTime: z.string().min(1, 'Không được để trống'),

  // Step 2
  customerName: z.string().min(1, 'Không được để trống'),
  customerPhone: z.string().min(1, 'Không được để trống').regex(phoneRegex, 'Vui lòng nhập đúng định dạng'),
  customerEmail: z.preprocess((v) => (v === '' ? undefined : v), z.email('Email không hợp lệ').optional()),
  notes: z.string(),

  // Step 3
  paymentMethod: z.preprocess((v) => v ?? undefined, z.string('Không được để trống').min(1, 'Không được để trống')),

  // Field to save state
  price: z.number(),
});
