import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore, useAuthStore } from '../../src/store';
import { supabase } from '../../src/lib/supabase';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function CompleteScreen() {
    const { venuePreferences, budgetRange, cuisinePreferences, completeOnboarding } = useOnboardingStore();
    const user = useAuthStore((s) => s.user);

    // Animations
    const checkScale = useRef(new Animated.Value(0)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation
        Animated.sequence([
            Animated.spring(checkScale, {
                toValue: 1,
                tension: 50,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        // Sync preferences to Supabase if user is logged in
        syncPreferences();
    }, []);

    const syncPreferences = async () => {
        if (!user?.id) return;

        try {
            // This would sync preferences to your backend
            // For now, just log it
            console.log('Syncing preferences to Supabase:', {
                userId: user.id,
                venuePreferences,
                budgetRange,
                cuisinePreferences,
            });

            // In a real implementation:
            // await supabase.from('user_preferences').upsert({...})
        } catch (error) {
            console.error('Failed to sync preferences:', error);
        }
    };

    const handleComplete = () => {
        completeOnboarding();
        router.replace('/(tabs)');
    };

    const likedCount = venuePreferences.filter(p => p.liked).length;

    return (
        <View style={styles.container}>
            {/* Success Animation */}
            <View style={styles.successContainer}>
                <Animated.View style={[styles.checkCircle, { transform: [{ scale: checkScale }] }]}>
                    <Text style={styles.checkEmoji}>🎉</Text>
                </Animated.View>

                <Animated.View style={{ opacity: fadeIn }}>
                    <Text style={styles.title}>Hazırsın!</Text>
                    <Text style={styles.subtitle}>Tercihlerini kaydettik</Text>
                </Animated.View>
            </View>

            {/* Summary */}
            <Animated.View style={[styles.summaryContainer, { opacity: fadeIn }]}>
                <Text style={styles.summaryTitle}>Senin Profilin</Text>

                <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>👍</Text>
                    <Text style={styles.summaryText}>
                        {likedCount} mekan türü beğendin
                    </Text>
                </View>

                <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>💰</Text>
                    <Text style={styles.summaryText}>
                        {budgetRange.min}₺ - {budgetRange.max}₺ bütçe
                    </Text>
                </View>

                <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>🍽️</Text>
                    <Text style={styles.summaryText}>
                        {cuisinePreferences.length} mutfak tercihi
                    </Text>
                </View>
            </Animated.View>

            {/* What's Next */}
            <Animated.View style={[styles.nextContainer, { opacity: fadeIn }]}>
                <Text style={styles.nextTitle}>Şimdi ne yapabilirsin?</Text>

                <View style={styles.nextItem}>
                    <Text style={styles.nextEmoji}>🎡</Text>
                    <View>
                        <Text style={styles.nextItemTitle}>Çark Çevir</Text>
                        <Text style={styles.nextItemDesc}>Arkadaşlarınla grup oluştur</Text>
                    </View>
                </View>

                <View style={styles.nextItem}>
                    <Text style={styles.nextEmoji}>🤖</Text>
                    <View>
                        <Text style={styles.nextItemTitle}>AI'a Sor</Text>
                        <Text style={styles.nextItemDesc}>"Romantik bir akşam yemeği öner"</Text>
                    </View>
                </View>
            </Animated.View>

            {/* CTA */}
            <Animated.View style={[styles.footer, { opacity: fadeIn }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleComplete}
                >
                    <Text style={styles.primaryButtonText}>Keşfetmeye Başla! 🚀</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
        paddingTop: 80,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    checkCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.primary.purpleDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
        borderWidth: 3,
        borderColor: colors.primary.purple,
    },
    checkEmoji: {
        fontSize: 60,
    },
    title: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    summaryContainer: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },
    summaryTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.lg,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    summaryIcon: {
        fontSize: 20,
    },
    summaryText: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
    },
    nextContainer: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primary.purple,
    },
    nextTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    nextItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    nextEmoji: {
        fontSize: 32,
    },
    nextItemTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.white,
    },
    nextItemDesc: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: spacing['3xl'],
    },
    primaryButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});
