import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="name" />
      <Stack.Screen name="email" />
      <Stack.Screen name="password" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="location" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="review" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}