import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore } from '../../src/store';
import { venueCards } from '../../src/constants/onboardingData';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function PreferencesScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const addVenuePreference = useOnboardingStore((s) => s.addVenuePreference);

    const position = useRef(new Animated.ValueXY()).current;
    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    const likeOpacity = position.x.interpolate({
        inputRange: [0, SCREEN_WIDTH / 4],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const nopeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 4, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.9, 1],
        extrapolate: 'clamp',
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    swipeRight();
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    swipeLeft();
                } else {
                    resetPosition();
                }
            },
        })
    ).current;

    const swipeRight = () => {
        Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            duration: 250,
            useNativeDriver: true,
        }).start(() => handleSwipe(true));
    };

    const swipeLeft = () => {
        Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            duration: 250,
            useNativeDriver: true,
        }).start(() => handleSwipe(false));
    };

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
        }).start();
    };

    const handleSwipe = (liked: boolean) => {
        const card = venueCards[currentIndex];
        addVenuePreference(card.id, liked);
        position.setValue({ x: 0, y: 0 });

        if (currentIndex >= venueCards.length - 1) {
            router.push('/(onboarding)/budget');
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const progress = ((currentIndex + 1) / venueCards.length) * 100;
    const currentCard = venueCards[currentIndex];
    const nextCard = venueCards[currentIndex + 1];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Ne tarz mekanları seversin?</Text>
                <Text style={styles.subtitle}>Sağa kaydır: Beğen | Sola kaydır: Geç</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{currentIndex + 1} / {venueCards.length}</Text>
            </View>

            {/* Cards Stack */}
            <View style={styles.cardsContainer}>
                {/* Next Card (behind) */}
                {nextCard && (
                    <Animated.View
                        style={[
                            styles.card,
                            styles.cardBehind,
                            { transform: [{ scale: nextCardScale }] },
                        ]}
                    >
                        <Text style={styles.cardEmoji}>{nextCard.image}</Text>
                        <Text style={styles.cardName}>{nextCard.name}</Text>
                    </Animated.View>
                )}

                {/* Current Card */}
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        styles.card,
                        {
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                                { rotate },
                            ],
                        },
                    ]}
                >
                    {/* Like Stamp */}
                    <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
                        <Text style={styles.stampText}>BEĞENDİM 👍</Text>
                    </Animated.View>

                    {/* Nope Stamp */}
                    <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
                        <Text style={styles.stampText}>GEÇ 👎</Text>
                    </Animated.View>

                    <Text style={styles.cardEmoji}>{currentCard.image}</Text>
                    <Text style={styles.cardName}>{currentCard.name}</Text>
                    <Text style={styles.cardDescription}>{currentCard.description}</Text>

                    <View style={styles.cardTags}>
                        {currentCard.tags.slice(0, 3).map((tag) => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <Pressable style={styles.actionButton} onPress={swipeLeft}>
                    <Text style={styles.actionEmoji}>👎</Text>
                    <Text style={styles.actionText}>Geç</Text>
                </Pressable>

                <Pressable style={[styles.actionButton, styles.likeButton]} onPress={swipeRight}>
                    <Text style={styles.actionEmoji}>👍</Text>
                    <Text style={styles.actionText}>Beğen</Text>
                </Pressable>
            </View>

            {/* Skip */}
            <Pressable
                style={styles.skipButton}
                onPress={() => router.push('/(onboarding)/budget')}
            >
                <Text style={styles.skipText}>Atla →</Text>
            </Pressable>
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
        marginBottom: spacing.lg,
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
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.md,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary.purple,
    },
    progressText: {
        color: colors.textMuted,
        fontSize: fontSize.sm,
    },
    cardsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH - 48,
        height: 400,
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardBehind: {
        top: 10,
    },
    cardEmoji: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    cardName: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
        marginBottom: spacing.sm,
    },
    cardDescription: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    cardTags: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    tag: {
        backgroundColor: colors.elevated,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    tagText: {
        color: colors.textSecondary,
        fontSize: fontSize.xs,
    },
    stamp: {
        position: 'absolute',
        top: 30,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderWidth: 3,
        borderRadius: borderRadius.md,
    },
    likeStamp: {
        right: 20,
        borderColor: colors.success,
        transform: [{ rotate: '15deg' }],
    },
    nopeStamp: {
        left: 20,
        borderColor: colors.error,
        transform: [{ rotate: '-15deg' }],
    },
    stampText: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.white,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing['2xl'],
        marginBottom: spacing.lg,
    },
    actionButton: {
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },
    likeButton: {
        borderColor: colors.primary.purple,
        backgroundColor: colors.primary.purpleDark,
    },
    actionEmoji: {
        fontSize: 28,
    },
    actionText: {
        color: colors.textSecondary,
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: spacing.base,
    },
    skipText: {
        color: colors.textMuted,
        fontSize: fontSize.base,
    },
});
