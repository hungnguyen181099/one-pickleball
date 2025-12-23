import { SelectOption } from '@/components/ui/Select';

export const bookingDurationHours: SelectOption[] = Array.from({ length: 24 }, (_, index) => ({
  label: `${index + 1} giờ`,
  value: `${index + 1}`,
}));
