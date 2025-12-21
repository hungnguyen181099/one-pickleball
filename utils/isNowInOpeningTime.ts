/**
 * Convert "HH:mm" time string to minutes since 00:00.
 * Special case: "24:00" is treated as 1440 minutes.
 */
const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);

  // Handle end-of-day case
  if (h === 24 && m === 0) return 24 * 60;

  return h * 60 + m;
};

/**
 * Check whether the current time is within the opening hours.
 *
 * @param openingTime - Opening time in "HH:mm" format (e.g. "05:00")
 * @param closingTime - Closing time in "HH:mm" format (e.g. "24:00")
 * @param now - Optional Date object, defaults to current local time
 *
 * @returns true if current time is within the opening range, otherwise false
 */
export const isNowInOpeningTime = (openingTime: string, closingTime: string, now: Date = new Date()) => {
  const open = toMinutes(openingTime);
  const close = toMinutes(closingTime);

  // Current time in minutes since 00:00
  const current = now.getHours() * 60 + now.getMinutes();

  // Normal range (does not cross midnight)
  if (open <= close) {
    return current >= open && current < close;
  }

  // Overnight range (crosses midnight, e.g. 18:00 → 02:00)
  return current >= open || current < close;
};
