/**
 * Type Definitions
 * Centralized type definitions for the application
 */
import { ThemeColors } from '@/constants/theme';

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role_type: string[];
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
export type GameMode = string;
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
  avatar: string;
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
  gameScores: GameScore[];
  setScores: SetScore[];
  currentGame: number;
  gamesWonAthlete1: number;
  gamesWonAthlete2: number;
  timerSeconds: number;
  servingTeam: string;
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

export type TournamentStatus = 'ongoing' | 'upcoming' | 'completed';

export type Status = {
  label: string;
  value: TournamentStatus | undefined;
};

export const statuses: Status[] = [
  {
    label: 'Tất cả',
    value: undefined,
  },
  {
    label: 'Sắp diễn ra',
    value: 'upcoming',
  },
  {
    label: 'Đang diễn ra',
    value: 'ongoing',
  },
  {
    label: 'Đã hoàn thành',
    value: 'completed',
  },
];

export interface RefereeData {
  success: boolean;
  data: {
    matches: {
      current_page: number;
      data: {
        id: number;
        tournament_id: number;
        category_id: number;
        round_id: number;
        court_id: number | null;
        group_id: number;
        match_number: string;
        bracket_position: number | null;
        athlete1_id: number;
        athlete1_name: string;
        athlete1_score: number;
        athlete2_id: number;
        athlete2_name: string;
        athlete2_score: number;
        winner_id: number | null;
        referee_id: number;
        referee_name: string;
        match_date: string;
        match_time: string | null;
        actual_start_time: string;
        actual_end_time: string | null;
        status: string;
        best_of: number;
        points_per_set: number;
        set_scores: any | null;
        final_score: any | null;
        notes: string | null;
        match_state: {
          gameScores: {
            game: number;
            athlete1: number;
            athlete2: number;
          }[];
          currentGame: number;
          servingTeam: string;
          serverNumber: number;
          timerSeconds: number;
          gamesWonAthlete1: number;
          gamesWonAthlete2: number;
        };
        current_game: number;
        games_won_athlete1: number;
        games_won_athlete2: number;
        game_scores: {
          game: number;
          athlete1: number;
          athlete2: number;
        }[];
        serving_team: string;
        server_number: number;
        timer_seconds: number;
        next_match_id: number | null;
        winner_advances_to: number | null;
        created_at: string;
        updated_at: string;
        tournament: {
          id: number;
          user_id: number;
          name: string;
          slug: string;
          tournament_code: string | null;
          description: string;
          start_date: string;
          end_date: string;
          registration_deadline: string;
          location: string;
          max_participants: number;
          price: number;
          rules: string | null;
          prizes: number;
          competition_format: string | null;
          format_type: string;
          seeding_enabled: number;
          auto_bracket_generation: number;
          balanced_groups: number;
          group_count: number | null;
          players_per_group: number;
          bracket_data: any | null;
          tournament_rank: string;
          registration_benefits: string;
          competition_rules: string;
          event_timeline: string;
          social_information: string;
          organizer_email: string;
          organizer_hotline: string;
          competition_schedule: any | null;
          results: any | null;
          gallery: any | null;
          banner: any | null;
          status: boolean;
          tournament_courts: any | null;
          tournament_stage: string;
          total_matches: number;
          completed_matches: number;
          image: string | null;
          created_at: string;
          updated_at: string;
          is_watch: boolean;
          is_ocr: boolean;
        };
        athlete1: {
          id: number;
          tournament_id: number;
          user_id: number;
          athlete_name: string;
          email: string;
          phone: string;
          status: string;
          payment_status: string;
          registration_fee: string;
          amount_paid: string;
          registered_at: string | null;
          confirmed_at: string | null;
          position: number | null;
          matches_played: number;
          matches_won: number;
          matches_lost: number;
          win_rate: string;
          total_points: number;
          sets_won: number;
          sets_lost: number;
          created_at: string;
          updated_at: string;
          category_id: number;
          partner_id: number;
          group_id: number;
          seed_number: number;
        };
        athlete2: {
          id: number;
          tournament_id: number;
          user_id: number;
          athlete_name: string;
          email: string;
          phone: string;
          status: string;
          payment_status: string;
          registration_fee: string;
          amount_paid: string;
          registered_at: string | null;
          confirmed_at: string | null;
          position: number | null;
          matches_played: number;
          matches_won: number;
          matches_lost: number;
          win_rate: string;
          total_points: number;
          sets_won: number;
          sets_lost: number;
          created_at: string;
          updated_at: string;
          category_id: number;
          partner_id: number;
          group_id: number;
          seed_number: number;
        };
        category: {
          id: number;
          tournament_id: number;
          category_name: string;
          category_type: string;
          age_group: string;
          max_participants: number;
          prize_money: string;
          description: string | null;
          status: string;
          current_participants: number;
          created_at: string;
          updated_at: string;
        };
        court: any | null;
      }[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
    tournaments: Array<{
      id: number;
      user_id: number;
      name: string;
      slug: string;
      tournament_code: string | null;
      description: string;
      start_date: string;
      end_date: string;
      registration_deadline: string;
      location: string;
      max_participants: number;
      price: number;
      rules: string | null;
      prizes: number;
      competition_format: string | null;
      format_type: string;
      seeding_enabled: number;
      auto_bracket_generation: number;
      balanced_groups: number;
      group_count: number | null;
      players_per_group: number;
      bracket_data: any | null;
      tournament_rank: string;
      registration_benefits: string;
      competition_rules: string;
      event_timeline: string | null;
      social_information: string;
      organizer_email: string | null;
      organizer_hotline: string;
      competition_schedule: any | null;
      results: any | null;
      gallery: any | null;
      banner: any | null;
      status: boolean;
      tournament_courts: any | null;
      tournament_stage: string;
      total_matches: number;
      completed_matches: number;
      image: string | null;
      created_at: string;
      updated_at: string;
      is_watch: boolean;
      is_ocr: boolean;
      pivot: {
        user_id: number;
        tournament_id: number;
        assigned_at: string;
        assigned_by: number;
        status: string;
        created_at: string;
        updated_at: string;
      };
    }>;
  };
}

export interface MatchDetailResponse {
  success: boolean;
  data: {
    id: number;
    tournament_id: number;
    category_id: number;
    round_id: number;
    court_id: number | null;
    group_id: number;
    match_number: string;
    bracket_position: number | null;
    athlete1_id: number;
    athlete1_name: string;
    athlete1_score: number;
    athlete2_id: number;
    athlete2_name: string;
    athlete2_score: number;
    winner_id: number | null;
    referee_id: number;
    referee_name: string;
    match_date: string;
    match_time: string | null;
    actual_start_time: string;
    actual_end_time: string | null;
    status: string;
    best_of: number;
    points_per_set: number;
    set_scores:
    | {
      set: number;
      athlete1: number;
      athlete2: number;
    }[]
    | null;
    final_score: string | null;
    notes: string | null;
    match_state: {
      gameScores: {
        game: number;
        athlete1: number;
        athlete2: number;
      }[];
      currentGame: number;
      servingTeam: string;
      serverNumber: number;
      timerSeconds: number | null;
      gamesWonAthlete1: number;
      gamesWonAthlete2: number;
    } | null;
    current_game: number;
    games_won_athlete1: number;
    games_won_athlete2: number;
    game_scores: {
      game: number;
      athlete1: number;
      athlete2: number;
    }[];
    serving_team: string;
    server_number: number;
    timer_seconds: number;
    next_match_id: number | null;
    winner_advances_to: number | null;
    created_at: string;
    updated_at: string;
    tournament: {
      id: number;
      user_id: number;
      name: string;
      slug: string;
      tournament_code: string | null;
      description: string;
      start_date: string;
      end_date: string;
      registration_deadline: string;
      location: string;
      max_participants: number;
      price: number;
      rules: string | null;
      prizes: number;
      competition_format: string | null;
      format_type: string;
      seeding_enabled: number;
      auto_bracket_generation: number;
      balanced_groups: number;
      group_count: number | null;
      players_per_group: number;
      bracket_data: any | null;
      tournament_rank: string;
      registration_benefits: string;
      competition_rules: string;
      event_timeline: string;
      social_information: string;
      organizer_email: string;
      organizer_hotline: string;
      competition_schedule: any | null;
      results: any | null;
      gallery: any | null;
      banner: any | null;
      status: boolean;
      tournament_courts: any | null;
      tournament_stage: string;
      total_matches: number;
      completed_matches: number;
      image: string | null;
      created_at: string;
      updated_at: string;
      is_watch: boolean;
      is_ocr: boolean;
    };
    category: {
      id: number;
      tournament_id: number;
      category_name: string;
      category_type: string;
      age_group: string;
      max_participants: number;
      prize_money: string;
      description: string | null;
      status: string;
      current_participants: number;
      created_at: string;
      updated_at: string;
    };
    round: {
      id: number;
      tournament_id: number;
      category_id: number | null;
      round_name: string;
      round_number: number;
      round_type: string;
      start_date: string;
      end_date: string | null;
      start_time: string;
      status: string;
      total_matches: number;
      completed_matches: number;
      notes: string | null;
      created_at: string;
      updated_at: string;
    };
    court: {
      id: number;
      stadium_id: number;
      tournament_id: number | null;
      court_name: string;
      court_number: string;
      court_type: string;
      surface_type: string;
      capacity: number;
      size: string | null;
      status: string;
      description: string | null;
      amenities: string | null;
      is_active: boolean;
      daily_matches: number;
      created_at: string;
      updated_at: string;
      rental_price: number;
    } | null;
    athlete1: {
      id: number;
      tournament_id: number;
      user_id: number;
      athlete_name: string;
      email: string;
      phone: string;
      status: string;
      payment_status: string;
      registration_fee: string;
      amount_paid: string;
      registered_at: string | null;
      confirmed_at: string | null;
      position: number | null;
      matches_played: number;
      matches_won: number;
      matches_lost: number;
      win_rate: string;
      total_points: number;
      sets_won: number;
      sets_lost: number;
      created_at: string;
      updated_at: string;
      category_id: number;
      partner_id: number;
      group_id: number;
      seed_number: number;
    };
    athlete2: {
      id: number;
      tournament_id: number;
      user_id: number;
      athlete_name: string;
      email: string;
      phone: string;
      status: string;
      payment_status: string;
      registration_fee: string;
      amount_paid: string;
      registered_at: string | null;
      confirmed_at: string | null;
      position: number | null;
      matches_played: number;
      matches_won: number;
      matches_lost: number;
      win_rate: string;
      total_points: number;
      sets_won: number;
      sets_lost: number;
      created_at: string;
      updated_at: string;
      category_id: number;
      partner_id: number;
      group_id: number;
      seed_number: number;
    };
    winner: {
      id: number;
      tournament_id: number;
      user_id: number;
      athlete_name: string;
      email: string;
      phone: string;
      status: string;
      payment_status: string;
      registration_fee: string;
      amount_paid: string;
      registered_at: string | null;
      confirmed_at: string | null;
      position: number | null;
      matches_played: number;
      matches_won: number;
      matches_lost: number;
      win_rate: string;
      total_points: number;
      sets_won: number;
      sets_lost: number;
      created_at: string;
      updated_at: string;
      category_id: number;
      partner_id: number;
      group_id: number;
      seed_number: number;
    } | null;
  };
}
