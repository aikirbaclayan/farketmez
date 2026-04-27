import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore } from '../../src/store';
import { cuisineCategories } from '../../src/constants/onboardingData';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function CuisineScreen() {
    const { cuisinePreferences, addCuisinePreference, removeCuisinePreference } = useOnboardingStore();

    const handleToggle = (cuisineId: string) => {
        if (cuisinePreferences.includes(cuisineId)) {
            removeCuisinePreference(cuisineId);
        } else {
            addCuisinePreference(cuisineId);
        }
    };

    const canContinue = cuisinePreferences.length >= 3;

    const handleContinue = () => {
        router.push('/(onboarding)/location');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.stepIndicator}>3/4</Text>
                <Text style={styles.title}>Hangi mutfakları seversin?</Text>
                <Text style={styles.subtitle}>En az 3 tane seç</Text>
            </View>

            {/* Selection Count */}
            <View style={styles.countContainer}>
                <Text style={[
                    styles.countText,
                    canContinue && styles.countComplete,
                ]}>
                    {cuisinePreferences.length} seçildi {canContinue ? '✓' : `(min. 3)`}
                </Text>
            </View>

            {/* Cuisine Grid */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
            >
                {cuisineCategories.map((cuisine) => {
                    const isSelected = cuisinePreferences.includes(cuisine.id);

                    return (
                        <Pressable
                            key={cuisine.id}
                            style={[
                                styles.cuisineChip,
                                isSelected && styles.cuisineSelected,
                            ]}
                            onPress={() => handleToggle(cuisine.id)}
                        >
                            <Text style={styles.cuisineIcon}>{cuisine.icon}</Text>
                            <Text style={[
                                styles.cuisineName,
                                isSelected && styles.cuisineNameSelected,
                            ]}>
                                {cuisine.name}
                            </Text>
                            {isSelected && (
                                <View style={styles.checkmark}>
                                    <Text style={styles.checkmarkText}>✓</Text>
                                </View>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.footer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.continueButton,
                        !canContinue && styles.continueDisabled,
                        pressed && canContinue && styles.buttonPressed,
                    ]}
                    onPress={handleContinue}
                    disabled={!canContinue}
                >
                    <Text style={[
                        styles.continueText,
                        !canContinue && styles.continueTextDisabled,
                    ]}>
                        {canContinue ? 'Devam →' : `${3 - cuisinePreferences.length} tane daha seç`}
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
        marginBottom: spacing.lg,
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
    countContainer: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    countText: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        fontWeight: fontWeight.medium,
    },
    countComplete: {
        color: colors.success,
    },
    scrollView: {
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    cuisineChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: borderRadius.xl,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderWidth: 2,
        borderColor: colors.border,
        gap: spacing.sm,
    },
    cuisineSelected: {
        borderColor: colors.primary.purple,
        backgroundColor: colors.primary.purpleDark,
    },
    cuisineIcon: {
        fontSize: 20,
    },
    cuisineName: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        fontWeight: fontWeight.medium,
    },
    cuisineNameSelected: {
        color: colors.white,
    },
    checkmark: {
        backgroundColor: colors.primary.purple,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmarkText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: fontWeight.bold,
    },
    footer: {
        paddingVertical: spacing.xl,
    },
    continueButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    continueDisabled: {
        backgroundColor: colors.border,
    },
    continueText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
    },
    continueTextDisabled: {
        color: colors.textMuted,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});
