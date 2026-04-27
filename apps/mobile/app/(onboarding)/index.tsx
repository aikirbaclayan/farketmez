import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function OnboardingWelcome() {
    // Animation values
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Logo entrance animation
        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(logoRotate, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(fadeIn, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(slideUp, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const rotation = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Animated Logo */}
            <View style={styles.logoSection}>
                <Animated.Text
                    style={[
                        styles.logoEmoji,
                        {
                            transform: [
                                { scale: logoScale },
                                { rotate: rotation },
                            ],
                        },
                    ]}
                >
                    🎡
                </Animated.Text>

                <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
                    <Text style={styles.logoText}>FARKETMEZ</Text>
                    <Text style={styles.tagline}>Kararsızlığa Son!</Text>
                </Animated.View>
            </View>

            {/* Description */}
            <Animated.View style={[styles.descriptionSection, { opacity: fadeIn }]}>
                <Text style={styles.description}>
                    Arkadaşlarınla nereye gideceğinize karar vermek hiç bu kadar eğlenceli olmamıştı!
                </Text>
                <Text style={styles.descriptionSmall}>
                    Birkaç soru ile seni tanıyalım 🎯
                </Text>
            </Animated.View>

            {/* CTA */}
            <Animated.View style={[styles.ctaSection, { opacity: fadeIn }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => router.push('/(onboarding)/preferences')}
                >
                    <Text style={styles.primaryButtonText}>Başla →</Text>
                </Pressable>

                <Text style={styles.timeEstimate}>⏱ Yaklaşık 2 dakika</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xl,
        paddingTop: 100,
        paddingBottom: spacing['3xl'],
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logoEmoji: {
        fontSize: 100,
        marginBottom: spacing.lg,
    },
    logoText: {
        fontSize: fontSize['4xl'],
        fontWeight: fontWeight.extrabold,
        color: colors.white,
        textAlign: 'center',
        letterSpacing: 3,
    },
    tagline: {
        fontSize: fontSize.xl,
        color: colors.primary.purple,
        textAlign: 'center',
        marginTop: spacing.sm,
        fontWeight: fontWeight.semibold,
    },
    descriptionSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: spacing.lg,
    },
    descriptionSmall: {
        fontSize: fontSize.base,
        color: colors.textMuted,
        textAlign: 'center',
    },
    ctaSection: {
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        paddingHorizontal: spacing['3xl'],
        borderRadius: borderRadius.xl,
        width: '100%',
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
    timeEstimate: {
        marginTop: spacing.lg,
        color: colors.textMuted,
        fontSize: fontSize.sm,
    },
});
