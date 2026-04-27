import { Stack } from 'expo-router';
import { colors } from '../../src/constants';

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: 'slide_from_right',
                gestureEnabled: false, // Prevent swipe back during onboarding
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="preferences" />
            <Stack.Screen name="budget" />
            <Stack.Screen name="cuisine" />
            <Stack.Screen name="location" />
            <Stack.Screen name="complete" />
        </Stack>
    );
}
