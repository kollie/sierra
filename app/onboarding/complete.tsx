import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { useAppDispatch } from '@/store';
import { resetOnboarding } from '@/store/onboarding/actions';

export default function OnboardingComplete() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Reset onboarding state when navigating away
    return () => {
      dispatch(resetOnboarding());
    };
  }, [dispatch]);

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.checkContainer}>
          <View style={styles.checkCircle}>
            <Check size={40} color="#FFFFFF" strokeWidth={3} />
          </View>
        </View>
        
        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.description}>
          Your profile is ready. Start exploring events and communities that match your interests.
        </Text>
        
        <Animated.View 
          style={styles.imageContainer}
          entering={FadeInDown.duration(1000).delay(300)}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=3387&auto=format&fit=crop' }} 
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
      </Animated.View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    marginBottom: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#001B3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    backgroundColor: '#001B3A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});