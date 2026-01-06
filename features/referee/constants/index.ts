import { ApiEndpoints } from '@/types';

export const SYNC_THRESHOLD = 10;
export const WIN_SCORE = 11;
export const MAX_HISTORY_LENGTH = 20;
export const MAX_EVENT_LOG_LENGTH = 50;
export const TIMEOUT_DURATION = 60;
export const TIMEOUTS_PER_GAME = 2;
export const TOAST_DURATION = 3000;

export const API_ENDPOINTS: ApiEndpoints = {
  syncEvents: 'http://localhost:8000/referee/matches/3/sync-events',
  endMatch: 'http://localhost:8000/referee/matches/3/end',
  getState: 'http://localhost:8000/referee/matches/3/state',
  backUrl: 'http://localhost:8000/referee/matches',
};

// Color palette matching original CSS
export const COLORS = {
  primary: '#008bb9',
  primaryLight: '#00a8e0',
  primaryDark: '#006d91',
  secondary: '#00d4aa',
  accent: '#f0b429',
  accentLight: '#ffd166',
  bgDark: '#0a1628',
  bgDarker: '#060d18',
  bgCard: '#0f2140',
  bgCardLight: '#152a4a',
  borderColor: 'rgba(0, 139, 185, 0.2)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  textWhite: '#ffffff',
  textLight: '#e2e8f0',
  textMuted: '#94a3b8',
  teamBlue: '#3b82f6',
  teamRed: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  transparent: 'transparent',
} as const;

// Border radius values
export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
} as const;

export const ICONS = {
  BALL: '[BALL]',
  COURT: '[COURT]',
  REFEREE: '[REFEREE]',
  LOGO: '[LOGO]',
  BLUE_TEAM: '[BLUE]',
  RED_TEAM: '[RED]',
  TROPHY: '[TROPHY]',
  TIMER: '[TIMER]',
  COIN: '[COIN]',
  UNDO: '[UNDO]',
  FAULT: '[FAULT]',
  SWITCH: '[SWITCH]',
  BACK: '[BACK]',
  PLAY: '[PLAY]',
  PAUSE: '[PAUSE]',
  STOP: '[STOP]',
  CHECK: '[CHECK]',
  CROWN: '[CROWN]',
  USERS: '[USERS]',
  USER: '[USER]',
  PIN: '[PIN]',
  DICE: '[DICE]',
  LIGHTNING: '[LIGHTNING]',
  CLOCK: '[CLOCK]',
  TRASH: '[TRASH]',
} as const;
