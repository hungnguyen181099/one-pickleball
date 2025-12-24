/**
 * Format Utilities
 * Helper functions for formatting data
 */

/**
 * Format currency (VND)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatCurrencyWithoutUnit = (amount: number | string): string => {
  const value = typeof amount === 'string' ? Number(amount.replace(/[^\d.-]/g, '')) : amount;

  if (Number.isNaN(value)) return '';

  return new Intl.NumberFormat('vi-VN').format(value);
};

export const formatCurrencyWithUnit = (amount: number | string): string => {
  const value = typeof amount === 'string' ? Number(amount.replace(/[^\d.-]/g, '')) : amount;

  if (Number.isNaN(value)) return '';

  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`;
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert to title case
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as: 0xxx xxx xxx
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};

/**
 * Remove Vietnamese diacritics
 */
export const removeDiacritics = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

/**
 * Generate initials from name
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Mask email (e.g., "user@example.com" -> "u***@example.com")
 */
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;

  const masked = username.charAt(0) + '***' + username.charAt(username.length - 1);
  return `${masked}@${domain}`;
};

/**
 * Mask phone number (e.g., "0123456789" -> "012***6789")
 */
export const maskPhone = (phone: string): string => {
  if (phone.length < 7) return phone;

  const start = phone.slice(0, 3);
  const end = phone.slice(-4);
  return `${start}***${end}`;
};
