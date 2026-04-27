import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore, useOnboardingStore } from '../src/store';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants';

export default function WelcomeScreen() {
    const { user, isLoading } = useAuthStore();
    const { isCompleted: onboardingCompleted } = useOnboardingStore();

    useEffect(() => {
        // Check where to redirect
        if (!isLoading) {
            if (user) {
                // User is logged in
                if (onboardingCompleted) {
                    // Onboarding done - go to main app
                    router.replace('/(tabs)');
                } else {
                    // User logged in but no onboarding - show onboarding
                    router.replace('/(onboarding)/index');
                }
            }
            // If no user, stay on welcome screen
        }
    }, [user, isLoading, onboardingCompleted]);

    return (
        <View style={styles.container}>
            {/* Content */}
            <View style={styles.content}>
                {/* Logo/Icon Area */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoEmoji}>🎡</Text>
                    <Text style={styles.logoText}>FARKETMEZ</Text>
                    <Text style={styles.tagline}>Kararsızlığa Son!</Text>
                </View>

                {/* Hero Text */}
                <View style={styles.heroContainer}>
                    <Text style={styles.heroTitle}>
                        Nereye gidelim?{'\n'}
                        <Text style={styles.heroHighlight}>Fark etmez!</Text>
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        Arkadaşlarınla plan yap, çark çevir,{'\n'}
                        AI'dan öneri al. Karar verme stresi bitti!
                    </Text>
                </View>

                {/* CTA Buttons */}
                <View style={styles.ctaContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text style={styles.primaryButtonText}>Başla</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text style={styles.secondaryButtonText}>Zaten hesabım var</Text>
                    </Pressable>

                    {/* Try without account - goes to onboarding then guest mode */}
                    <Pressable
                        style={styles.ghostButton}
                        onPress={() => router.push('/(onboarding)/index')}
                    >
                        <Text style={styles.ghostButtonText}>Hesapsız dene →</Text>
                    </Pressable>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>Made by Elphisia 🌙</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: 80,
        paddingBottom: spacing['2xl'],
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logoEmoji: {
        fontSize: 64,
        marginBottom: spacing.md,
    },
    logoText: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.extrabold,
        color: colors.white,
        letterSpacing: 2,
    },
    tagline: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    heroContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    heroTitle: {
        fontSize: fontSize['4xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
        lineHeight: 48,
        marginBottom: spacing.lg,
    },
    heroHighlight: {
        color: colors.primary.purple,
    },
    heroSubtitle: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
        lineHeight: 26,
    },
    ctaContainer: {
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    primaryButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
    },
    secondaryButton: {
        backgroundColor: colors.transparent,
        borderWidth: 2,
        borderColor: colors.border,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: colors.text,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.medium,
    },
    ghostButton: {
        paddingVertical: spacing.sm,
        alignItems: 'center',
    },
    ghostButtonText: {
        color: colors.textMuted,
        fontSize: fontSize.base,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    footer: {
        textAlign: 'center',
        color: colors.textMuted,
        fontSize: fontSize.sm,
    },
});
