/**
 * Type Definitions
 * Centralized type definitions for the application
 */
import { ThemeColors } from '@/constants/theme';

// User Types
export interface User {
  id: number; // id might be missing in the provided example, keeping optional or assuming it might come
  name: string;
  email: string;
  phone: string;
  role_type: string;
  status: string;
  elo_rating: number;
  elo_rank: string;
  total_ocr_matches: number;
  ocr_wins: number;
  ocr_losses: number;
  challenge_score: string;
  community_score: string;
  total_oprs: string;
  opr_level: string;
  avatar?: string; // Keeping for UI compatibility if needed
  created_at: string;
  updated_at: string;
}

// Tournament Types
export interface Tournament {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  location: string;
  organizer: string | null;
  organizer_email: string | null;
  organizer_hotline: string | null;
  price: number;
  prizes: number | null;
  max_participants: number;
  participants_count: number;
  image_url: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface TournamentCategory {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'mixed';
  ageGroup?: string;
  skillLevel?: string;
  maxTeams: number;
}

// Court Types
export interface Court {
  id: string;
  name: string;
  address: string;
  type: 'indoor' | 'outdoor';
  numberOfCourts: number;
  pricePerHour: number;
  amenities: string[];
  images: string[];
  rating: number;
  openingHours: {
    open: string;
    close: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

// Booking Types
export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
}

// News Types
export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'tournament' | 'training' | 'player' | 'equipment';
  imageUrl?: string;
  author: string;
  publishedAt: string;
  views: number;
  tags: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CategoriesResponse<T> {
  categories: T[];
  success: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
}

// ============================================
// Theme & Context Types
// ============================================
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// ============================================
// User Profile Types
// ============================================
export interface UserStatCardProps {
  number: string;
  label: string;
}

export interface UserAchievement {
  id: string;
  name: string;
  emoji: string;
  locked: boolean;
}

export interface UserSettingsItem {
  id: string;
  icon: string;
  label: string;
  route?: string;
  onPress?: () => void;
  isLogout?: boolean;
}

// ============================================
// News Types (Extended)
// ============================================

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string | null;
    status: boolean;
    order: number;
    created_at: string;
    updated_at: string;
  } | null;
  category_id: number | null;
  status?: string | null;
  author: string;
  image: string;
  is_featured: boolean;
  views?: number;
  user_id?: number | null;
  created_at: string;
  updated_at: string;
}

export interface NewsApiResponse {
  data: NewsArticle[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

// ============================================
// Court/Area Types (Extended)
// ============================================

export interface FavoriteCourt {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  distance: number;
  courts: number;
  features: string[];
  status: 'open' | 'busy' | 'closed';
  statusText: string;
  image: string;
  isPremium?: boolean;
  lastVisited?: string;
  totalBookings?: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  description: string;
}

// ============================================
// Notification Types
// ============================================
export interface NotificationItem {
  id: string;
  type: 'booking' | 'event' | 'social' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  actions?: {
    label: string;
    primary?: boolean;
    onPress: () => void;
  }[];
}

// ============================================
// Search Types
// ============================================
export interface SearchResult {
  id: string;
  type: 'court' | 'event' | 'news' | 'player';
  title: string;
  description: string;
  image: string;
  meta?: {
    location?: string;
    rating?: number;
    price?: string;
    date?: string;
    views?: number;
  };
}

// ============================================
// Event Detail Types
// ============================================
export interface EventInfoCard {
  icon: string;
  label: string;
  value: string;
}

export interface EventFeeItem {
  id: number;
  category_name: string;
  category_type: string;
  age_group: string;
  max_participants: number;
  status: string;
  current_participants: number;
}

// ============================================
// Help & Support Types
// ============================================
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'tournament' | 'account' | 'payment';
}

export interface ContactMethod {
  id: string;
  icon: string;
  label: string;
  value: string;
  action: () => void;
  color: string;
}

// ============================================
// Auth Types (Extended)
// ============================================

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

// ============================================
// Filter & Sort Types
// ============================================

export type FavoriteCourtSortType = 'recent' | 'rating' | 'distance' | 'price';

export type StandardAPIResponse<T> = {
  success: boolean;
  data: T;
};

export interface GetUserTournamentResponse {
  success: boolean;
  data: {
    registration_id: number;
    status: string;
    payment_status: string;
    registered_at: string | null;
    category: {
      id: number;
      name: string | null;
    };
    tournament: {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      location: string;
      status: boolean;
    };
  }[];
}

export type StyleColorsProps = {
  colors: ThemeColors;
};

export type registration = {
  registration_id: number;
  status: string;
  payment_status: string;
  registered_at: string | null;
  category: {
    id: number;
    name: string | null;
  };
  tournament: {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    location: string;
    status: boolean;
  };
};

export interface TournamentApiResponse {
  data: {
    id: number;
    name: string;
    description: string | null;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    location: string;
    organizer: string | null;
    organizer_email: string | null;
    organizer_hotline: string | null;
    price: number;
    prizes: number | null;
    max_participants: number;
    participants_count: number;
    image_url: string;
    status: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  status: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  success: boolean;
  data: NewsCategory[];
}

// TypeScript interfaces for Referee Match Screen

export type MatchStatus = 'waiting' | 'playing' | 'paused' | 'finished';
export type TeamSide = 'left' | 'right';
export type CourtSide = 'left' | 'right';
export type GameMode = 'singles' | 'doubles';
export type ModalType = 'coinFlip' | 'teamAssign' | 'serveOrder' | 'timeout' | null;

export interface TournamentRef {
  name: string;
}

export interface Category {
  name: string;
}

export interface Round {
  name: string;
}

export interface CourtRef {
  name: string;
  number: string;
}

export interface Athlete {
  id: number;
  name: string;
  partnerName?: string;
  pairName?: string;
}

export interface Referee {
  id: number;
  name: string;
  level: string;
}

export interface GameScore {
  game: number;
  athlete1: number;
  athlete2: number;
}

export interface SetScore {
  set: number;
  athlete1: number;
  athlete2: number;
}

export interface MatchData {
  id: number;
  status: string;
  isCompleted: boolean;
  bestOf: number;
  gameMode: GameMode;
  tournament: TournamentRef;
  category: Category;
  round: Round;
  court: CourtRef;
  athlete1: Athlete;
  athlete2: Athlete;
  referee: Referee;
  existingState: unknown;
  gameScores: GameScore[];
  setScores: SetScore[];
  currentGame: number;
  gamesWonAthlete1: number;
  gamesWonAthlete2: number;
  timerSeconds: number;
  servingTeam: 'athlete1' | 'athlete2';
  serverNumber: number;
}

export interface ApiEndpoints {
  syncEvents: string;
  endMatch: string;
  getState: string;
  backUrl: string;
}

export interface Player {
  name: string;
  courtSide: CourtSide;
}

export interface Team {
  name: string;
  athleteId: number;
  score: number;
  gamesWon: number;
  players: Player[];
}

export interface Teams {
  left: Team;
  right: Team;
}

export interface Serving {
  team: TeamSide;
  serverIndex: number;
  serverNumber: number;
  isFirstServeOfGame: boolean;
}

export interface TimeoutState {
  active: boolean;
  team: TeamSide | null;
  remaining: number;
  leftRemaining: number;
  rightRemaining: number;
}

export interface ToastState {
  show: boolean;
  icon: string;
  message: string;
}

export interface EventLogItem {
  time: string;
  message: string;
  score: string;
}

export interface HistoryItem {
  leftScore: number;
  rightScore: number;
  servingTeam: TeamSide;
  serverIndex: number;
  serverNumber: number;
  isFirstServeOfGame: boolean;
  leftPlayers: Player[];
  rightPlayers: Player[];
}

export interface MatchEvent {
  type: string;
  team: TeamSide | null;
  data: {
    leftScore: number;
    rightScore: number;
    gameNumber: number;
    [key: string]: unknown;
  };
  timer_seconds: number;
  created_at: string;
}

export interface MatchState {
  currentGame: number;
  gamesWonAthlete1: number;
  gamesWonAthlete2: number;
  gameScores: GameScore[];
  servingTeam: 'athlete1' | 'athlete2';
  serverNumber: number;
  timerSeconds: number;
}

export interface FinalMatchState {
  winner: TeamSide;
  winnerId: number;
  gameScores: GameScore[];
  finalScore: string;
  totalTimer: number;
  teams: {
    left: { gamesWon: number; athleteId: number };
    right: { gamesWon: number; athleteId: number };
  };
}
