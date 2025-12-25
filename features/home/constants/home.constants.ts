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
    color: '#00d9b5',
    href: '/',
  },
  {
    label: 'BXH OCR',
    icon: 'leaderboard',
    color: '#f97316',
    href: '/(stack)/leaderboard/ocr',
  },
  {
    label: 'BXH OPRS',
    icon: 'emoji-events',
    color: '#a855f7',
    href: '/(stack)/leaderboard/oprs',
  },
];
