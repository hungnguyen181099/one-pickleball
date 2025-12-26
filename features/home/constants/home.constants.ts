import { HomeAction } from '../types';

export const homeActions: HomeAction[] = [
  {
    label: 'Tìm trận đấu',
    icon: 'search',
    color: '#3b82f6',
    href: '/',
  },
  {
    label: 'Tạo trận đấu',
    icon: 'add',
    color: '#FFD400',
    href: '/',
  },
  {
    label: 'BXH OCR',
    icon: 'leaderboard',
    color: '#f97316',
    href: '/(stack)/leaderboard/ocr',
  },
  {
    label: 'BXH OPS',
    icon: 'emoji-events',
    color: '#a855f7',
    href: '/(stack)/leaderboard/oprs',
  },
];
