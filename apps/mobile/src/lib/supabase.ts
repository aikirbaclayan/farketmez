import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';

// Platform-specific storage adapter
const createStorageAdapter = () => {
    if (Platform.OS === 'web') {
        // Use localStorage for web
        return {
            getItem: (key: string) => {
                try {
                    return Promise.resolve(localStorage.getItem(key));
                } catch {
                    return Promise.resolve(null);
                }
            },
            setItem: (key: string, value: string) => {
                try {
                    localStorage.setItem(key, value);
                    return Promise.resolve();
                } catch {
                    return Promise.resolve();
                }
            },
            removeItem: (key: string) => {
                try {
                    localStorage.removeItem(key);
                    return Promise.resolve();
                } catch {
                    return Promise.resolve();
                }
            },
        };
    }

    // Use SecureStore for native (iOS/Android)
    // Import dynamically to avoid web error
    const SecureStore = require('expo-secure-store');
    return {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
    };
};

// Create storage adapter based on platform
const storage = createStorageAdapter();

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
    },
});

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

export async function signUpWithEmail(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });
    return { data, error };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
}

export async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
}
