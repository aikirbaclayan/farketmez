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
    ScrollView,
} from 'react-native';
import { router, Link } from 'expo-router';
import { signUpWithEmail } from '../../src/lib/supabase';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/constants';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        // Validation
        if (!name || !email || !password) {
            Alert.alert('Hata', 'Tüm alanları doldurun');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Hata', 'Şifre en az 8 karakter olmalı');
            return;
        }

        setIsLoading(true);

        const { data, error } = await signUpWithEmail(email, password, name);

        setIsLoading(false);

        if (error) {
            Alert.alert('Kayıt Hatası', error.message);
            return;
        }

        if (data.user) {
            Alert.alert(
                'Başarılı!',
                'Hesabın oluşturuldu. Email adresini doğrula veya devam et.',
                [
                    {
                        text: 'Devam Et',
                        onPress: () => router.replace('/(tabs)'),
                    },
                ]
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Hesap Oluştur 🚀</Text>
                    <Text style={styles.subtitle}>
                        Birkaç adımda hesabını oluştur ve hemen planlamaya başla
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>İsim</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Adın Soyadın"
                            placeholderTextColor={colors.textMuted}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            autoComplete="name"
                        />
                    </View>

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
                            placeholder="En az 8 karakter"
                            placeholderTextColor={colors.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Şifre Tekrar</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Şifreyi tekrar gir"
                            placeholderTextColor={colors.textMuted}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed,
                            isLoading && styles.buttonDisabled,
                        ]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
                        )}
                    </Pressable>

                    {/* Terms */}
                    <Text style={styles.terms}>
                        Kayıt olarak{' '}
                        <Text style={styles.termsLink}>Kullanım Şartları</Text> ve{' '}
                        <Text style={styles.termsLink}>Gizlilik Politikası</Text>'nı kabul
                        etmiş olursun.
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Zaten hesabın var mı?{' '}
                        <Link href="/(auth)/login" asChild>
                            <Text style={styles.footerLink}>Giriş Yap</Text>
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: 60,
        paddingBottom: spacing['2xl'],
    },
    header: {
        marginBottom: spacing['2xl'],
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
    terms: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: spacing.md,
    },
    termsLink: {
        color: colors.primary.purple,
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
