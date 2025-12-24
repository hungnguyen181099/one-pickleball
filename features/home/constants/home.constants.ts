import { HomeAction } from '../types';

export const homeActions: HomeAction[] = [
  {
    label: 'Tìm trận đấu',
    icon: 'search',
    backgroundColor: '#3b82f620',
    primaryColor: '#3b82f6',
    active: false,
    href: '/',
  },
  {
    label: 'Tạo trận đấu',
    icon: 'add',
    backgroundColor: '#00d9b520',
    primaryColor: '#00d9b5',
    active: true,
    href: '/',
  },
  {
    label: 'BXH OCR',
    icon: 'leaderboard',
    backgroundColor: '#f9731620',
    primaryColor: '#f97316',
    active: false,
    href: '/(stack)/leaderboard/ocr',
  },
  {
    label: 'BXH OPRS',
    icon: 'emoji-events',
    backgroundColor: '#a855f720',
    primaryColor: '#a855f7',
    active: false,
    href: '/(stack)/leaderboard/oprs',
  },
];
