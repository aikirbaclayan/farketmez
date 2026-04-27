// ============================================
// FARKETMEZ - Shared TypeScript Types
// ============================================

// ===== USER TYPES =====
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  location?: Location;
  budgetMin: number;
  budgetMax: number;
  createdAt: string;
  lastActive: string;
}

export interface UserPreference {
  id: string;
  userId: string;
  tagId: string;
  weight: number; // 0-100
  type: 'cuisine' | 'ambiance' | 'activity';
}

export interface Location {
  lat: number;
  lng: number;
  city?: string;
  district?: string;
}

// ===== GROUP TYPES =====
export interface Group {
  id: string;
  hostId: string;
  name: string;
  inviteCode: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  members?: GroupMember[];
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  isGuest: boolean;
  quickPreferences?: QuickPreferences;
  joinedAt: string;
  user?: User;
}

export interface QuickPreferences {
  cuisines: string[];
  budget: { min: number; max: number };
  location?: Location;
}

export interface GroupSettings {
  id: string;
  groupId: string;
  budgetLimit?: number;
  redFlags: string[]; // vetoed tag IDs
  radiusKm: number;
  locationCenter?: Location;
}

// ===== VENUE TYPES =====
export interface Venue {
  id: string;
  googlePlaceId?: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  priceLevel: 1 | 2 | 3 | 4;
  rating: number;
  photos: string[];
  openingHours?: OpeningHours;
  tags?: VenueTag[];
  distance?: number; // calculated field
}

export interface OpeningHours {
  weekdayText: string[];
  isOpenNow?: boolean;
}

export interface VenueTag {
  id: string;
  venueId: string;
  tagId: string;
  tag?: Tag;
  positiveCount: number;
  negativeCount: number;
  confidence: number;
}

export interface Tag {
  id: string;
  name: string;
  nameTr: string;
  category: 'vibe' | 'cuisine' | 'feature';
  icon: string;
}

export interface VenueNote {
  id: string;
  venueId: string;
  userId: string;
  content: string;
  isPublic: boolean;
  createdAt: string;
}

// ===== GAME/SESSION TYPES =====
export interface GroupSession {
  id: string;
  groupId: string;
  gameType: GameType;
  status: SessionStatus;
  winnerVenueId?: string;
  venues: SessionVenue[];
  startedAt: string;
  endedAt?: string;
}

export type GameType = 'wheel' | 'swipe' | 'elimination' | 'rps';
export type SessionStatus = 'voting' | 'ready' | 'playing' | 'decided';

export interface SessionVenue {
  id: string;
  sessionId: string;
  venueId: string;
  venue?: Venue;
  displayOrder: number;
  eliminated: boolean;
}

export interface VenueVote {
  id: string;
  sessionId: string;
  venueId: string;
  userId: string;
  vote: 'like' | 'dislike' | 'neutral';
  createdAt: string;
}

export interface GameResult {
  id: string;
  sessionId: string;
  winnerVenueId: string;
  winnerVenue?: Venue;
  gameData: Record<string, unknown>;
  decidedAt: string;
}

// ===== WEBSOCKET EVENTS =====
export interface WsClientEvents {
  'join-room': { sessionId: string; userId: string };
  'leave-room': { sessionId: string };
  'ready': { sessionId: string };
  'start-wheel': { sessionId: string };
  'eliminate-venue': { sessionId: string; venueId: string };
  'rps-move': { sessionId: string; move: 'rock' | 'paper' | 'scissors' };
  'swipe-vote': { sessionId: string; venueId: string; vote: 'like' | 'dislike' };
}

export interface WsServerEvents {
  'user-joined': { userId: string; name: string; avatarUrl?: string };
  'user-left': { userId: string };
  'user-ready': { userId: string };
  'all-ready': { userIds: string[] };
  'wheel-spinning': { seed: number; duration: number };
  'wheel-result': { venueId: string; venueName: string };
  'venue-eliminated': { venueId: string; eliminatedBy: string; remaining: number };
  'rps-result': { winnerId: string; moves: Record<string, string> };
  'swipe-match': { venueId: string; venueName: string };
  'game-complete': { winnerVenueId: string; venue: Venue };
  'error': { code: string; message: string };
}

// ===== API TYPES =====
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ===== AI TYPES =====
export interface AiChatRequest {
  message: string;
  context?: {
    userPreferences?: UserPreference[];
    groupMembers?: User[];
    location?: Location;
  };
}

export interface AiChatResponse {
  message: string;
  recommendations?: Venue[];
  tags?: string[];
  mood?: string;
}

export interface AiRecommendationRequest {
  prompt: string;
  budget?: { min: number; max: number };
  location: Location;
  radiusKm?: number;
  excludeVenueIds?: string[];
}

// ===== AUTH TYPES =====
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface SocialAuthRequest {
  provider: 'google' | 'apple';
  idToken: string;
}
