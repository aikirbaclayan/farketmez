import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { useOnboardingStore } from '../../src/store';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function LocationScreen() {
    const [isRequesting, setIsRequesting] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<'undetermined' | 'granted' | 'denied'>('undetermined');
    const setLocationPermission = useOnboardingStore((s) => s.setLocationPermission);

    const handleRequestPermission = async () => {
        setIsRequesting(true);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                setPermissionStatus('granted');
                setLocationPermission(true);

                // Wait a bit to show success state
                setTimeout(() => {
                    router.push('/(onboarding)/complete');
                }, 500);
            } else {
                setPermissionStatus('denied');
                setLocationPermission(false);
            }
        } catch (error) {
            console.error('Location permission error:', error);
            setPermissionStatus('denied');
        }

        setIsRequesting(false);
    };

    const handleSkip = () => {
        setLocationPermission(false);
        router.push('/(onboarding)/complete');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.stepIndicator}>4/4</Text>
                <Text style={styles.title}>Konum İzni</Text>
                <Text style={styles.subtitle}>Yakınındaki mekanları bulmak için</Text>
            </View>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                <Text style={styles.illustration}>📍</Text>
                <View style={styles.mapPreview}>
                    <Text style={styles.mapEmoji}>🗺️</Text>
                </View>
            </View>

            {/* Explanation */}
            <View style={styles.explanationContainer}>
                <View style={styles.explanationItem}>
                    <Text style={styles.explanationIcon}>🎯</Text>
                    <Text style={styles.explanationText}>
                        Konumuna göre en yakın mekanları bul
                    </Text>
                </View>

                <View style={styles.explanationItem}>
                    <Text style={styles.explanationIcon}>📊</Text>
                    <Text style={styles.explanationText}>
                        Mesafe bilgisi ile karar ver
                    </Text>
                </View>

                <View style={styles.explanationItem}>
                    <Text style={styles.explanationIcon}>🔒</Text>
                    <Text style={styles.explanationText}>
                        Konumun sadece oturum sırasında kullanılır
                    </Text>
                </View>
            </View>

            {/* Status Feedback */}
            {permissionStatus === 'granted' && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusSuccess}>✓ Konum izni verildi!</Text>
                </View>
            )}

            {permissionStatus === 'denied' && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusDenied}>
                        Konum izni reddedildi. Ayarlardan değiştirebilirsin.
                    </Text>
                </View>
            )}

            {/* Actions */}
            <View style={styles.footer}>
                {permissionStatus !== 'granted' && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed,
                            isRequesting && styles.buttonDisabled,
                        ]}
                        onPress={handleRequestPermission}
                        disabled={isRequesting}
                    >
                        <Text style={styles.primaryButtonText}>
                            {isRequesting ? 'İzin İsteniyor...' : '📍 Konumu Etkinleştir'}
                        </Text>
                    </Pressable>
                )}

                <Pressable
                    style={styles.skipButton}
                    onPress={handleSkip}
                >
                    <Text style={styles.skipText}>
                        {permissionStatus === 'granted' ? 'Devam Et →' : 'Daha Sonra'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    stepIndicator: {
        color: colors.primary.purple,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    illustration: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    mapPreview: {
        width: 200,
        height: 120,
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    mapEmoji: {
        fontSize: 48,
        opacity: 0.5,
    },
    explanationContainer: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        gap: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    explanationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    explanationIcon: {
        fontSize: 24,
    },
    explanationText: {
        flex: 1,
        fontSize: fontSize.base,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    statusContainer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    statusSuccess: {
        fontSize: fontSize.lg,
        color: colors.success,
        fontWeight: fontWeight.semibold,
    },
    statusDenied: {
        fontSize: fontSize.sm,
        color: colors.error,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: spacing['3xl'],
        gap: spacing.md,
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
        fontWeight: fontWeight.bold,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    skipButton: {
        paddingVertical: spacing.base,
        alignItems: 'center',
    },
    skipText: {
        color: colors.textMuted,
        fontSize: fontSize.base,
    },
});
