import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../src/constants';

export default function PlayScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Oyna 🎮</Text>
                    <Text style={styles.subtitle}>
                        Karar verme modunu seç
                    </Text>
                </View>

                {/* Game Modes */}
                <View style={styles.modesGrid}>
                    {/* Grup Modu */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.modeCard,
                            styles.modeCardPrimary,
                            pressed && styles.cardPressed,
                        ]}
                    >
                        <Text style={styles.modeEmoji}>👥</Text>
                        <Text style={styles.modeTitle}>Grup Modu</Text>
                        <Text style={styles.modeDescription}>
                            Arkadaşlarını davet et, birlikte karar verin
                        </Text>
                    </Pressable>

                    {/* Solo Mod */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.modeCard,
                            pressed && styles.cardPressed,
                        ]}
                    >
                        <Text style={styles.modeEmoji}>🚀</Text>
                        <Text style={styles.modeTitle}>Solo Mod</Text>
                        <Text style={styles.modeDescription}>
                            Tek başına keşfet, AI sana önersin
                        </Text>
                    </Pressable>
                </View>

                {/* Active Games */}
                <Text style={styles.sectionTitle}>Aktif Oyunlar</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyEmoji}>🎡</Text>
                    <Text style={styles.emptyText}>Aktif oyun yok</Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.createButton,
                            pressed && styles.cardPressed,
                        ]}
                    >
                        <Text style={styles.createButtonText}>Yeni Oyun Başlat</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.base,
    },
    header: {
        paddingVertical: spacing.lg,
    },
    title: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    modesGrid: {
        gap: spacing.md,
    },
    modeCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.md,
    },
    modeCardPrimary: {
        backgroundColor: colors.primary.purpleDark,
        borderColor: colors.primary.purple,
    },
    modeEmoji: {
        fontSize: 40,
        marginBottom: spacing.md,
    },
    modeTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    modeDescription: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    emptyState: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    emptyText: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.lg,
    },
    createButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.lg,
        shadowColor: colors.primary.purple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    createButtonText: {
        color: colors.white,
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
    },
});
