/**
 * Type Definitions
 * Centralized type definitions for the application
 */

// User Types
export interface User {
    id: number; // id might be missing in the provided example, keeping optional or assuming it might come
    name: string;
    email: string;
    phone?: string;
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
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    registrationDeadline: string;
    maxParticipants: number;
    currentParticipants: number;
    entryFee: number;
    imageUrl?: string;
    organizerId: string;
    categories: TournamentCategory[];
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

export interface BookingForm {
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
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
// Home Screen Types
// ============================================
export interface HomeStatCardProps {
    id: string;
    icon: string;
    number: string;
    label: string;
    color: string;
}

export interface HomeEventCard {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
    badge?: string;
    meta: string;
}

export interface HomeNewsItem {
    id: string;
    category: string;
    title: string;
    time: string;
    readTime: string;
    image: string;
    categoryColor: string;
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
export interface NewsItemDetailed {
    id: string;
    category: string;
    categoryColor: string;
    title: string;
    description: string;
    author: string;
    time: string;
    readTime: string;
    image: string;
    views: number;
    likes: number;
    isLiked: boolean;
}

export interface NewsCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export interface NewsComment {
    id: string;
    userName: string;
    userInitials: string;
    userColor: string;
    time: string;
    text: string;
    likes: number;
    isLiked: boolean;
}

export interface RelatedNewsItem {
    id: string;
    category: string;
    categoryColor: string;
    title: string;
    image: string;
    time: string;
}

// ============================================
// Tournament Types (Extended)
// ============================================
export interface TournamentDetailed {
    id: string;
    title: string;
    date: string;
    location: string;
    prize: string;
    registered: number;
    maxParticipants: number;
    status: 'open' | 'upcoming' | 'closed';
    image: string;
    gradient: string[];
}

export interface MyTournamentItem {
    id: string;
    title: string;
    status: string;
    date: string;
    type: 'registered' | 'completed' | 'cancelled';
    result?: string;
}

// ============================================
// Court/Area Types (Extended)
// ============================================
export interface CourtDetailed {
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
    isFavorite: boolean;
    isPremium?: boolean;
    image: string;
    badgeColor?: string;
}

export interface Facility {
    id: string;
    icon: string;
    name: string;
}

export interface Review {
    id: string;
    userName: string;
    userInitials: string;
    rating: number;
    date: string;
    text: string;
    color: string;
}

export interface RatingBar {
    stars: number;
    count: number;
    percentage: number;
}

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

// ============================================
// Booking Types (Extended)
// ============================================
export interface BookingHistory {
    id: string;
    courtName: string;
    courtAddress: string;
    date: string;
    time: string;
    duration: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    totalPrice: number;
    paymentMethod?: string;
    courtType: 'indoor' | 'outdoor';
}

export interface DateOption {
    id: string;
    day: string;
    number: number;
    month: string;
    isToday?: boolean;
}

export interface TimeSlot {
    id: string;
    time: string;
    price: string;
    available: boolean;
    popular?: boolean;
}

export interface CourtOption {
    id: string;
    name: string;
    description: string;
    available: boolean;
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

export interface EventCategory {
    name: string;
    count: string;
    icon: string;
}

export interface EventFeeItem {
    name: string;
    amount: string;
    discount?: string;
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
export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

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
export type TournamentFilterType = 'open' | 'upcoming' | 'closed' | 'all';
export type AreaFilterType = 'nearby' | 'open' | 'rated' | 'filter';
export type MyTournamentFilterType = 'all' | 'registered' | 'completed' | 'cancelled';
export type BookingFilterType = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type FavoriteCourtSortType = 'recent' | 'rating' | 'distance' | 'price';
