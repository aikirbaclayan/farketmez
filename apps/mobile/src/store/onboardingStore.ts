import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface VenuePreference {
    id: string;
    liked: boolean;
}

export interface OnboardingState {
    // Completed flag
    isCompleted: boolean;
    currentStep: number;

    // Preferences
    venuePreferences: VenuePreference[];
    budgetRange: { min: number; max: number };
    budgetDoesntMatter: boolean;
    cuisinePreferences: string[];
    locationPermissionGranted: boolean;
    notificationPermissionGranted: boolean;

    // Actions
    setStep: (step: number) => void;
    addVenuePreference: (id: string, liked: boolean) => void;
    setBudgetRange: (min: number, max: number) => void;
    setBudgetDoesntMatter: (value: boolean) => void;
    addCuisinePreference: (cuisine: string) => void;
    removeCuisinePreference: (cuisine: string) => void;
    setLocationPermission: (granted: boolean) => void;
    setNotificationPermission: (granted: boolean) => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            isCompleted: false,
            currentStep: 0,
            venuePreferences: [],
            budgetRange: { min: 50, max: 200 },
            budgetDoesntMatter: false,
            cuisinePreferences: [],
            locationPermissionGranted: false,
            notificationPermissionGranted: false,

            setStep: (step) => set({ currentStep: step }),

            addVenuePreference: (id, liked) =>
                set((state) => ({
                    venuePreferences: [...state.venuePreferences, { id, liked }],
                })),

            setBudgetRange: (min, max) => set({ budgetRange: { min, max } }),

            setBudgetDoesntMatter: (value) => set({ budgetDoesntMatter: value }),

            addCuisinePreference: (cuisine) =>
                set((state) => ({
                    cuisinePreferences: [...state.cuisinePreferences, cuisine],
                })),

            removeCuisinePreference: (cuisine) =>
                set((state) => ({
                    cuisinePreferences: state.cuisinePreferences.filter((c) => c !== cuisine),
                })),

            setLocationPermission: (granted) => set({ locationPermissionGranted: granted }),

            setNotificationPermission: (granted) => set({ notificationPermissionGranted: granted }),

            completeOnboarding: () => set({ isCompleted: true }),

            resetOnboarding: () =>
                set({
                    isCompleted: false,
                    currentStep: 0,
                    venuePreferences: [],
                    budgetRange: { min: 50, max: 200 },
                    budgetDoesntMatter: false,
                    cuisinePreferences: [],
                    locationPermissionGranted: false,
                    notificationPermissionGranted: false,
                }),
        }),
        {
            name: 'onboarding-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
