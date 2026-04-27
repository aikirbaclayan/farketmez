import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../src/constants';

export default function HomeScreen() {
    const user = useAuthStore((state) => state.user);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Merhaba,</Text>
                        <Text style={styles.userName}>
                            {user?.user_metadata?.name || 'Kullanıcı'} 👋
                        </Text>
                    </View>
                    <Pressable style={styles.notificationButton}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                    </Pressable>
                </View>

                {/* Quick Actions - Bento Grid */}
                <Text style={styles.sectionTitle}>Hızlı Başlat</Text>
                <View style={styles.bentoGrid}>
                    {/* Large Card - Çark */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.bentoCardLarge,
                            pressed && styles.cardPressed,
                        ]}
                        onPress={() => router.push('/(tabs)/play')}
                    >
                        <Text style={styles.cardEmoji}>🎡</Text>
                        <Text style={styles.cardTitle}>Çark Çevir</Text>
                        <Text style={styles.cardDescription}>
                            Grup oluştur ve karar ver
                        </Text>
                    </Pressable>

                    {/* Small Cards */}
                    <View style={styles.bentoColumn}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.bentoCardSmall,
                                pressed && styles.cardPressed,
                            ]}
                        >
                            <Text style={styles.cardEmoji}>🤖</Text>
                            <Text style={styles.cardTitleSmall}>AI Asistan</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.bentoCardSmall,
                                styles.bentoCardAccent,
                                pressed && styles.cardPressed,
                            ]}
                        >
                            <Text style={styles.cardEmoji}>📍</Text>
                            <Text style={styles.cardTitleSmall}>Yakınımda</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Recent Groups */}
                <Text style={styles.sectionTitle}>Son Gruplar</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyEmoji}>👥</Text>
                    <Text style={styles.emptyText}>Henüz grup yok</Text>
                    <Text style={styles.emptySubtext}>
                        Yeni bir grup oluştur veya davet linki ile katıl
                    </Text>
                </View>

                {/* Trending Venues */}
                <Text style={styles.sectionTitle}>Popüler Mekanlar</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyEmoji}>🔥</Text>
                    <Text style={styles.emptyText}>Yakında</Text>
                    <Text style={styles.emptySubtext}>
                        Mekan verileri yükleniyor...
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.base,
        paddingBottom: spacing['3xl'],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    greeting: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
    },
    userName: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
    },
    notificationButton: {
        width: 44,
        height: 44,
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    notificationIcon: {
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    // Bento Grid
    bentoGrid: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    bentoCardLarge: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        minHeight: 180,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.md,
    },
    bentoColumn: {
        flex: 1,
        gap: spacing.md,
    },
    bentoCardSmall: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.base,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    bentoCardAccent: {
        backgroundColor: colors.primary.purpleDark,
        borderColor: colors.primary.purple,
    },
    cardEmoji: {
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    cardTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    cardTitleSmall: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        color: colors.white,
    },
    cardDescription: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    // Empty State
    emptyState: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    emptyEmoji: {
        fontSize: 40,
        marginBottom: spacing.md,
    },
    emptyText: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    emptySubtext: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
