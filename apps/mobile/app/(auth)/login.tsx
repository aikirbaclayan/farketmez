import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { router, Link } from 'expo-router';
import { signInWithEmail } from '../../src/lib/supabase';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Email ve şifre gerekli');
            return;
        }

        setIsLoading(true);

        const { data, error } = await signInWithEmail(email, password);

        setIsLoading(false);

        if (error) {
            Alert.alert('Giriş Hatası', error.message);
            return;
        }

        if (data.user) {
            router.replace('/(tabs)');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Hoş Geldin! 👋</Text>
                    <Text style={styles.subtitle}>
                        Hesabına giriş yap ve arkadaşlarınla planlamaya başla
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ornek@email.com"
                            placeholderTextColor={colors.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Şifre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed,
                            isLoading && styles.buttonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Giriş Yap</Text>
                        )}
                    </Pressable>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>veya</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login Placeholder */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.socialButton,
                            pressed && styles.buttonPressed,
                        ]}
                    >
                        <Text style={styles.socialButtonText}>🔵 Google ile devam et</Text>
                    </Pressable>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Hesabın yok mu?{' '}
                        <Link href="/(auth)/register" asChild>
                            <Text style={styles.footerLink}>Kayıt Ol</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        paddingTop: 60,
        paddingBottom: spacing['2xl'],
    },
    header: {
        marginBottom: spacing['3xl'],
    },
    title: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.bold,
        color: colors.white,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    form: {
        flex: 1,
        gap: spacing.lg,
    },
    inputContainer: {
        gap: spacing.xs,
    },
    label: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        color: colors.textSecondary,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        fontSize: fontSize.base,
        color: colors.text,
    },
    primaryButton: {
        backgroundColor: colors.primary.purple,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        marginTop: spacing.md,
        shadowColor: colors.primary.purple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        color: colors.textMuted,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.sm,
    },
    socialButton: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
    },
    socialButtonText: {
        color: colors.text,
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium,
    },
    footer: {
        alignItems: 'center',
        paddingTop: spacing.xl,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: fontSize.base,
    },
    footerLink: {
        color: colors.primary.purple,
        fontWeight: fontWeight.semibold,
    },
});
