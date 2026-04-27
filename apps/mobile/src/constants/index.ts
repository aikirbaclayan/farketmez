export * from './theme';
export * from './onboardingData';

export const APP_NAME = 'FARKETMEZ';
export const APP_TAGLINE = 'Kararsızlığa Son!';

// API URLs - will be replaced with env vars
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
export const WS_URL = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:8080';

// Supabase
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Deep link scheme
export const DEEP_LINK_SCHEME = 'farketmez';
