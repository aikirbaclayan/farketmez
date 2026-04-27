import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore } from '../../src/store';
import { budgetLevels } from '../../src/constants/onboardingData';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function BudgetScreen() {
    const { budgetRange, setBudgetRange, budgetDoesntMatter, setBudgetDoesntMatter } = useOnboardingStore();
    const [selectedMin, setSelectedMin] = useState(0);
    const [selectedMax, setSelectedMax] = useState(3);

    const handleSelect = (index: number) => {
        if (budgetDoesntMatter) {
            setBudgetDoesntMatter(false);
        }

        if (index <= selectedMin) {
            setSelectedMin(index);
            if (index > selectedMax) {
                setSelectedMax(index);
            }
        } else if (index >= selectedMax) {
            setSelectedMax(index);
            if (index < selectedMin) {
                setSelectedMin(index);
            }
        } else {
            // Click between min and max - set as new max
            setSelectedMax(index);
        }

        const min = budgetLevels[Math.min(selectedMin, index)].value;
        const max = budgetLevels[Math.max(selectedMax, index)].value;
        setBudgetRange(min, max);
    };

    const handleDoesntMatter = () => {
        setBudgetDoesntMatter(true);
        setSelectedMin(0);
        setSelectedMax(3);
    };

    const handleContinue = () => {
        router.push('/(onboarding)/cuisine');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.stepIndicator}>2/4</Text>
                <Text style={styles.title}>Bütçen ne kadar?</Text>
                <Text style={styles.subtitle}>Kişi başı ortalama harcama</Text>
            </View>

            {/* Budget Options */}
            <View style={styles.budgetContainer}>
                {budgetLevels.map((level, index) => {
                    const isSelected = !budgetDoesntMatter && index >= selectedMin && index <= selectedMax;
                    const isEdge = !budgetDoesntMatter && (index === selectedMin || index === selectedMax);

                    return (
                        <Pressable
                            key={level.value}
                            style={[
                                styles.budgetOption,
                                isSelected && styles.budgetSelected,
                                isEdge && styles.budgetEdge,
                            ]}
                            onPress={() => handleSelect(index)}
                        >
                            <Text style={styles.budgetEmoji}>{level.emoji}</Text>
                            <Text style={[styles.budgetLabel, isSelected && styles.budgetLabelSelected]}>
                                {level.label}
                            </Text>
                            <Text style={[styles.budgetDescription, isSelected && styles.budgetDescSelected]}>
                                {level.description}
                            </Text>
                            <Text style={[styles.budgetValue, isSelected && styles.budgetValueSelected]}>
                                ~{level.value}₺
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Range Display */}
            {!budgetDoesntMatter && (
                <View style={styles.rangeDisplay}>
                    <Text style={styles.rangeText}>
                        {budgetLevels[selectedMin].value}₺ - {budgetLevels[selectedMax].value}₺
                    </Text>
                </View>
            )}

            {/* Doesn't Matter Option */}
            <Pressable
                style={[
                    styles.doesntMatterButton,
                    budgetDoesntMatter && styles.doesntMatterSelected,
                ]}
                onPress={handleDoesntMatter}
            >
                <Text style={styles.doesntMatterEmoji}>🤷</Text>
                <Text style={[
                    styles.doesntMatterText,
                    budgetDoesntMatter && styles.doesntMatterTextSelected
                ]}>
                    Farketmez!
                </Text>
            </Pressable>

            {/* Continue Button */}
            <View style={styles.footer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.continueButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueText}>Devam →</Text>
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
    budgetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    budgetOption: {
        width: '45%',
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border,
    },
    budgetSelected: {
        borderColor: colors.primary.purple,
        backgroundColor: colors.primary.purpleDark,
    },
    budgetEdge: {
        borderWidth: 3,
    },
    budgetEmoji: {
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    budgetLabel: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    budgetLabelSelected: {
        color: colors.white,
    },
    budgetDescription: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    budgetDescSelected: {
        color: colors.textSecondary,
    },
    budgetValue: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
        fontWeight: fontWeight.medium,
    },
    budgetValueSelected: {
        color: colors.primary.purple,
    },
    rangeDisplay: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    rangeText: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.primary.purple,
    },
    doesntMatterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        borderWidth: 2,
        borderColor: colors.border,
        gap: spacing.md,
    },
    doesntMatterSelected: {
        borderColor: colors.primary.orange,
        backgroundColor: colors.primary.purpleDark,
    },
    doesntMatterEmoji: {
        fontSize: 24,
    },
    doesntMatterText: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.textSecondary,
    },
    doesntMatterTextSelected: {
        color: colors.primary.orange,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: spacing['3xl'],
    },
    continueButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    continueText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});
