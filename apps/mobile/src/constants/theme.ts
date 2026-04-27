// ============================================
// FARKETMEZ - Theme Constants
// Based on Aurora Gradient + Claymorphism
// Mobile First: 375px base
// ============================================

export const colors = {
    // Primary Gradient Colors
    primary: {
        purple: '#7C3AED',
        purpleLight: '#A78BFA',
        purpleDark: '#6D28D9',
        pink: '#EC4899',
        pinkLight: '#F472B6',
        orange: '#F97316',
        orangeLight: '#FB923C',
    },

    // Secondary
    secondary: {
        blue: '#3B82F6',
        green: '#10B981',
        yellow: '#FBBF24',
        red: '#EF4444',
    },

    // Dark Mode (Primary)
    background: '#0A0A0F',
    card: '#111118',
    elevated: '#1E1E2E',
    border: '#2D2D3D',

    // Text
    text: '#E2E2EA',
    textSecondary: '#9898AC',
    textMuted: '#6B6B7F',

    // Semantic
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6',

    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
} as const;

export const fontSize = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
} as const;

export const fontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
} as const;

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 5,
    },
    glow: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 8,
    },
} as const;
