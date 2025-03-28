import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppContextProvider } from '@/context/AppContext';
import { store } from '@/store';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Ignore error */
});

// Your Stripe publishable key - using test key for development
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51O1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    async function prepare() {
      try {
        // Hide splash screen once the app is ready
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider 
        publishableKey={STRIPE_PUBLISHABLE_KEY}
        urlScheme="chapters" // Required for returning from payment flow
        merchantIdentifier="merchant.com.chapters.app" // Required for Apple Pay
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AppContextProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="launch" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="event/[id]" options={{ presentation: 'modal' }} />
                <Stack.Screen name="create-event" options={{ presentation: 'modal' }} />
                <Stack.Screen name="create-community" options={{ presentation: 'modal' }} />
                <Stack.Screen name="settings" />
                <Stack.Screen name="settings/payment" />
                <Stack.Screen name="edit-profile" />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="dark" translucent={true} />
            </AppContextProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </StripeProvider>
    </Provider>
  );
}