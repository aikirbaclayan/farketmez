import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function ProfileScreen() {
    const { user, signOut } = useAuthStore();

    const handleSignOut = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabından çıkış yapmak istediğine emin misin?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profil</Text>
                </View>

                {/* User Info */}
                <View style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            {user?.user_metadata?.name || 'Kullanıcı'}
                        </Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    <Pressable style={styles.menuItem}>
                        <Text style={styles.menuIcon}>⚙️</Text>
                        <Text style={styles.menuText}>Ayarlar</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <Text style={styles.menuIcon}>🎨</Text>
                        <Text style={styles.menuText}>Tercihlerim</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <Text style={styles.menuIcon}>📜</Text>
                        <Text style={styles.menuText}>Geçmiş</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <Text style={styles.menuIcon}>❓</Text>
                        <Text style={styles.menuText}>Yardım</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </Pressable>
                </View>

                {/* Sign Out */}
                <Pressable
                    style={({ pressed }) => [
                        styles.signOutButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleSignOut}
                >
                    <Text style={styles.signOutText}>Çıkış Yap</Text>
                </Pressable>

                {/* Footer */}
                <Text style={styles.footer}>
                    FARKETMEZ v0.1.0{'\n'}
                    Made by Elphisia 🌙
                </Text>
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
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        padding: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        backgroundColor: colors.elevated,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.base,
    },
    avatarEmoji: {
        fontSize: 32,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.semibold,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    userEmail: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    menuSection: {
        backgroundColor: colors.card,
        borderRadius: borderRadius['2xl'],
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    menuIcon: {
        fontSize: 20,
        marginRight: spacing.md,
    },
    menuText: {
        flex: 1,
        fontSize: fontSize.base,
        color: colors.text,
    },
    menuArrow: {
        fontSize: fontSize.xl,
        color: colors.textMuted,
    },
    signOutButton: {
        backgroundColor: colors.secondary.red,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        opacity: 0.9,
    },
    signOutText: {
        color: colors.white,
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    footer: {
        textAlign: 'center',
        color: colors.textMuted,
        fontSize: fontSize.sm,
        marginTop: 'auto',
        paddingVertical: spacing.xl,
        lineHeight: 20,
    },
});
