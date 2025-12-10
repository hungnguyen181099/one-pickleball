/**
 * Application Constants
 * Shared constants used throughout the app
 */

export const TOURNAMENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const NEWS_CATEGORIES = {
  ALL: 'all',
  TOURNAMENT: 'tournament',
  TRAINING: 'training',
  PLAYER: 'player',
  EQUIPMENT: 'equipment',
} as const;

export const COURT_TYPES = {
  INDOOR: 'indoor',
  OUTDOOR: 'outdoor',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  MOMO: 'momo',
  ZALOPAY: 'zalopay',
  BANK_TRANSFER: 'bank_transfer',
} as const;

export const USER_ROLES = {
  PLAYER: 'player',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  PHONE_REGEX: /^(0|\+84)[0-9]{9}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Date/Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm',
};
