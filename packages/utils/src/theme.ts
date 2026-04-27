// ============================================
// FARKETMEZ - Design System Theme
// ============================================

/**
 * Color palette for FARKETMEZ
 * Based on Aurora Gradient + Claymorphism design system
 * Mobile First: 375px base
 */

// ===== COLORS =====
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
        blueLight: '#60A5FA',
        green: '#10B981',
        greenLight: '#34D399',
        yellow: '#FBBF24',
        yellowLight: '#FCD34D',
        red: '#EF4444',
        redLight: '#F87171',
    },

    // Neutrals (Dark Mode First)
    dark: {
        950: '#0A0A0F',  // Darkest background
        900: '#111118',  // Card background
        800: '#1E1E2E',  // Elevated surface
        700: '#2D2D3D',  // Border, divider
        600: '#4A4A5C',  // Muted text
        500: '#6B6B7F',
        400: '#9898AC',  // Secondary text
        300: '#BFBFD0',
        200: '#E2E2EA',  // Primary text (dark mode)
        100: '#F0F0F5',
        50: '#FAFAFC',   // Light mode background
    },

    // Semantic
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6',

    // Special
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
} as const;

// ===== GRADIENTS =====
export const gradients = {
    primary: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)',
    primarySubtle: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    wheel: 'conic-gradient(from 0deg, #7C3AED, #3B82F6, #10B981, #FBBF24, #F97316, #EC4899, #7C3AED)',
    dark: 'linear-gradient(180deg, #0A0A0F 0%, #111118 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const;

// ===== SPACING =====
// Based on 4px grid
export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
} as const;

// ===== TYPOGRAPHY =====
export const typography = {
    fonts: {
        heading: 'Outfit',
        body: 'Inter',
        mono: 'JetBrains Mono',
    },

    sizes: {
        display: 40, // clamp(2.5rem, 8vw, 4rem)
        h1: 32,
        h2: 24,
        h3: 20,
        lg: 18,
        base: 16,
        sm: 14,
        xs: 12,
    },

    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },

    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

// ===== BORDER RADIUS =====
export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
} as const;

// ===== SHADOWS =====
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
        purple: {
            shadowColor: '#7C3AED',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 8,
        },
        pink: {
            shadowColor: '#EC4899',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 8,
        },
    },
    claymorphism: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 32,
        elevation: 10,
    },
} as const;

// ===== ANIMATION =====
export const animation = {
    duration: {
        fast: 150,
        normal: 300,
        slow: 500,
        wheel: 4000,
    },
    easing: {
        easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
        easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        wheelStop: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)',
    },
} as const;

// ===== BREAKPOINTS =====
// Mobile first: base is 375px
export const breakpoints = {
    base: 0,      // Mobile (default)
    sm: 640,      // Large phones
    md: 768,      // Tablets
    lg: 1024,     // Desktops
    xl: 1280,     // Large desktops
} as const;

// ===== Z-INDEX =====
export const zIndex = {
    base: 0,
    card: 10,
    sticky: 100,
    modal: 200,
    toast: 300,
    tooltip: 400,
} as const;

// ===== COMPONENT SPECIFIC =====
export const components = {
    button: {
        height: {
            sm: 36,
            md: 44,
            lg: 52,
        },
        paddingX: {
            sm: 12,
            md: 20,
            lg: 28,
        },
    },
    input: {
        height: 48,
        paddingX: 16,
        borderWidth: 1,
    },
    card: {
        padding: 16,
        borderRadius: 20,
    },
    bottomTab: {
        height: 64,
    },
    wheel: {
        size: 300,
        centerSize: 80,
    },
} as const;

// ===== THEME OBJECT =====
export const theme = {
    colors,
    gradients,
    spacing,
    typography,
    borderRadius,
    shadows,
    animation,
    breakpoints,
    zIndex,
    components,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = keyof typeof spacing;
