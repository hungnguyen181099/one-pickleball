/**
 * Convert hex color to hex with alpha (#RRGGBBAA)
 * @param hex - string input, validated at runtime
 * @param opacity - 0 → 100 (%)
 */
export const hexToHexAlpha = (hex: string, opacity: number = 10) => {
  if (typeof hex !== 'string') {
    throw new Error('Hex color must be a string');
  }

  const match = hex.trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);

  if (!match) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 100) {
    throw new Error('Opacity must be a number between 0 and 100');
  }

  let value = match[1];

  // #RGB → #RRGGBB
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // remove alpha if exists (#RRGGBBAA)
  if (value.length === 8) {
    value = value.slice(0, 6);
  }

  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `#${value.toUpperCase()}${alpha}`;
};
