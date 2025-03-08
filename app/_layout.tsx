import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { AppContextProvider } from '@/context/AppContext';
import { store } from '@/store';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Ignore error */
});

const linking = {
  prefixes: [
    // App-specific scheme
    'chapters://',
    // Universal links
    'https://chapters.app',
    // Expo development/preview
    'exp://127.0.0.1:19000/--/',
    'exp://localhost:19000/--/',
    'exp://192.168.1.1:19000/--/'
  ],
  config: {
    screens: {
      'event/[id]': 'event/:id',
      '(tabs)': {
        screens: {
          index: '',
          events: 'events',
          communities: 'communities',
          notifications: 'notifications',
          profile: 'profile',
        },
      },
    },
  },
};

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    async function prepare() {
      try {
        // Hide splash screen once the app is ready
        await SplashScreen.hideAsync();
      } catch (e) {
        // Ignore error
        console.warn('Error hiding splash screen:', e);
      }
    }

    prepare().catch(console.warn);
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppContextProvider>
            <Stack 
              screenOptions={{ headerShown: false }}
              initialRouteName="index"
              linking={linking}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="launch" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="event/[id]" 
                options={{ 
                  presentation: 'modal',
                  headerShown: false
                }} 
              />
              <Stack.Screen name="create-event" options={{ presentation: 'modal' }} />
              <Stack.Screen name="create-community" options={{ presentation: 'modal' }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" translucent={true} />
          </AppContextProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}