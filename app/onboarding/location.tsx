import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowRight, ArrowLeft, MapPin, Navigation } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { setLocation, setCurrentStep } from '@/store/onboarding/actions';

const suggestedLocations = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Seattle, WA',
];

export default function OnboardingLocation() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locationValue = useAppSelector(state => state.onboarding.preferences.location);
  
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [locationError, setLocationError] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Set current step when component mounts
    dispatch(setCurrentStep(5));
  }, [dispatch]);

  const handleLocationSelect = (loc: string) => {
    dispatch(setLocation(loc));
    if (locationError) setLocationError('');
    Keyboard.dismiss();
  };

  const handleLocationChange = (text: string) => {
    dispatch(setLocation(text));
    if (locationError) setLocationError('');
  };

  const validateLocation = (): boolean => {
    if (!locationValue.trim()) {
      setLocationError('Please enter your location');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateLocation()) {
      dismissKeyboard();
      router.push('/onboarding/permissions');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Animated.View 
          style={styles.content}
          entering={FadeIn.duration(800)}
        >
          <Text style={styles.title}>Where are you located?</Text>
          <Text style={styles.subtitle}>
            This helps us show you events and communities near you
          </Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Location</Text>
              <View style={[
                styles.inputContainer,
                locationError ? styles.inputError : null
              ]}>
                <MapPin size={20} color="#001B3A" style={styles.inputIcon} />
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Enter your city"
                  value={locationValue}
                  onChangeText={handleLocationChange}
                  placeholderTextColor="#94A3B8"
                  autoFocus={false}
                  onFocus={() => setIsKeyboardFocused(true)}
                  onBlur={() => setIsKeyboardFocused(false)}
                />
                {locationValue.length > 0 && (
                  <TouchableOpacity 
                    style={styles.useCurrentButton}
                    onPress={() => {
                      dispatch(setLocation(''));
                      dismissKeyboard();
                    }}
                  >
                    <Text style={styles.useCurrentButtonText}>Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
              {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
            </View>
            
            <TouchableOpacity 
              style={styles.currentLocationButton}
              onPress={() => handleLocationSelect('San Francisco, CA')}
            >
              <Navigation size={20} color="#001B3A" />
              <Text style={styles.currentLocationText}>Use current location</Text>
            </TouchableOpacity>
            
            <View style={styles.suggestedContainer}>
              <Text style={styles.suggestedTitle}>Suggested Locations</Text>
              {suggestedLocations.map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={styles.suggestedItem}
                  onPress={() => handleLocationSelect(loc)}
                >
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.suggestedText}>{loc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
        
        <View style={styles.footer}>
          <View style={styles.paginationContainer}>
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.activeDot]} />
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
                !locationValue && styles.disabledButton
              ]}
              onPress={handleNext}
              disabled={!locationValue}
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
    </TouchableWithoutFeedback>
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
    marginBottom: 32,
  },
  formContainer: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  },
  useCurrentButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
  },
  useCurrentButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001B3A',
    marginLeft: 8,
  },
  suggestedContainer: {
    marginTop: 16,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  suggestedText: {
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 12,
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