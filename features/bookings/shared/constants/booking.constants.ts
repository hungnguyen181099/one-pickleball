import { SelectOption } from '@/components/ui/Select';

import { BookingFormType } from '../../types';

export const bookingDurationHours: SelectOption[] = Array.from({ length: 6 }, (_, index) => ({
  label: `${index + 1} giờ`,
  value: `${index + 1}`,
}));

export const bookingStepFields: readonly (readonly (keyof BookingFormType)[])[] = [
  ['bookingDate', 'courtId', 'durationHours', 'startTime'],
  ['customerName', 'customerPhone', 'customerEmail', 'notes'],
];

export const bookingPaymentMethods: SelectOption[] = [
  { label: 'Tiền mặt', value: 'cash' },
  { label: 'Thẻ tín dụng', value: 'card' },
  { label: 'Chuyển khoản', value: 'transfer' },
  { label: 'Ví điện tử', value: 'wallet' },
];
