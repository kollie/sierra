import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function LaunchScreen() {
  const router = useRouter();
  
  // Simplified approach without AsyncStorage for now
  const handleGetStarted = () => {
    // Go to onboarding for now
    router.replace('/onboarding');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/34/39/67/3439678d2c7b4b7bf9df8ea198d40c49.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Animated.View 
          style={styles.logoContainer}
          entering={FadeIn.duration(1200).delay(300)}
        >
          <Text style={styles.appName}>Chapters</Text>
          <Text style={styles.tagline}>choose chance</Text>
        </Animated.View>

        <View style={styles.bottomContainer}>
          <Animated.View 
            style={styles.buttonContainer}
            entering={FadeInDown.duration(1000).delay(800)}
          >
            <TouchableOpacity 
              style={styles.button}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            style={styles.footer}
            entering={FadeIn.duration(800).delay(1200)}
          >
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 12, 8, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: isLandscape ? '5%' : '15%',
  },
  appName: {
    fontSize: 48,
    fontWeight: '700',
    color: '#F5F5DC', // Beige color for contrast
    letterSpacing: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#D2B48C', // Tan color
    marginTop: 8,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  bottomContainer: {
    marginBottom: Platform.OS === 'ios' ? 8 : 16,
    marginTop: -40, // Move button upward
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#F5F5DC', // Matching the Chapters text color
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: isLandscape ? '40%' : '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000000', // Black text
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(245, 245, 220, 0.6)', // Beige with opacity
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});