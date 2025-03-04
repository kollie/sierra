import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { setInterests, setCurrentStep } from '@/store/onboarding/actions';

const interestsList = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'arts', name: 'Arts & Culture', icon: '🎨' },
  { id: 'sports', name: 'Sports & Fitness', icon: '🏃‍♂️' },
  { id: 'food', name: 'Food & Drink', icon: '🍲' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'outdoors', name: 'Outdoors', icon: '🏞️' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'social', name: 'Social', icon: '👥' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'wellness', name: 'Health & Wellness', icon: '🧘‍♀️' },
  { id: 'photography', name: 'Photography', icon: '📷' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
];

export default function OnboardingInterests() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedInterests = useAppSelector(state => state.onboarding.preferences.interests);
  const [interestError, setInterestError] = useState('');
  
  useEffect(() => {
    // Set current step when component mounts
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  const toggleInterest = (id: string) => {
    const updatedInterests = selectedInterests.includes(id)
      ? selectedInterests.filter(item => item !== id)
      : [...selectedInterests, id];
    
    dispatch(setInterests(updatedInterests));
    
    if (interestError && updatedInterests.length >= 3) {
      setInterestError('');
    }
  };

  const validateInterests = (): boolean => {
    if (selectedInterests.length < 3) {
      setInterestError('Please select at least 3 interests');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateInterests()) {
      router.push('/onboarding/location');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.View 
        style={styles.header}
        entering={FadeIn.duration(800)}
      >
        <Text style={styles.title}>What are you interested in?</Text>
        <Text style={styles.subtitle}>
          Select at least 3 interests to help us personalize your experience.
        </Text>
        {interestError ? <Text style={styles.errorText}>{interestError}</Text> : null}
      </Animated.View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.interestsGrid}>
          {interestsList.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestItem,
                selectedInterests.includes(interest.id) && styles.selectedInterestItem
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={styles.interestIcon}>{interest.icon}</Text>
              <Text 
                style={[
                  styles.interestName,
                  selectedInterests.includes(interest.id) && styles.selectedInterestName
                ]}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.activeDot]} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#001B3A" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              selectedInterests.length < 3 && styles.disabledButton
            ]}
            onPress={handleNext}
            disabled={selectedInterests.length < 3}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  interestItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedInterestItem: {
    backgroundColor: '#E6F0FF',
    borderColor: '#001B3A',
  },
  interestIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  selectedInterestName: {
    color: '#001B3A',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#001B3A',
    width: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001B3A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    zIndex: 10,
  },
  skipButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
});