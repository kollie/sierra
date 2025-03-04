import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowRight, ArrowLeft, User } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { setFirstName, setLastName, setCurrentStep } from '@/store/onboarding/actions';

export default function OnboardingName() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { firstName, lastName } = useAppSelector(state => state.onboarding.personalInfo);
  const currentStep = useAppSelector(state => state.onboarding.status.currentStep);
  
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  useEffect(() => {
    // Set current step when component mounts
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const validateInputs = (): boolean => {
    let isValid = true;
    
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }
    
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }
    
    return isValid;
  };

  const handleFirstNameChange = (text: string) => {
    dispatch(setFirstName(text));
    if (firstNameError) setFirstNameError('');
  };

  const handleLastNameChange = (text: string) => {
    dispatch(setLastName(text));
    if (lastNameError) setLastNameError('');
  };

  const handleNext = () => {
    if (validateInputs()) {
      dismissKeyboard();
      router.push('/onboarding/email');
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
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <Animated.View 
            style={styles.content}
            entering={FadeIn.duration(800)}
          >
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>
              Let us know how to address you
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
                <View style={[
                  styles.inputContainer,
                  firstNameError ? styles.inputError : null
                ]}>
                  <User size={20} color="#001B3A" style={styles.inputIcon} />
                  <TextInput
                    ref={firstNameRef}
                    style={styles.input}
                    placeholder="Enter your first name"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                    placeholderTextColor="#94A3B8"
                    autoFocus={false}
                    autoCapitalize="words"
                  />
                </View>
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name</Text>
                <View style={[
                  styles.inputContainer,
                  lastNameError ? styles.inputError : null
                ]}>
                  <User size={20} color="#001B3A" style={styles.inputIcon} />
                  <TextInput
                    ref={lastNameRef}
                    style={styles.input}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={handleLastNameChange}
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                  />
                </View>
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
              </View>
            </View>
          </Animated.View>
          
          <View style={styles.footer}>
            <View style={styles.paginationContainer}>
              <View style={styles.paginationDot} />
              <View style={[styles.paginationDot, styles.activeDot]} />
              <View style={styles.paginationDot} />
              <View style={styles.paginationDot} />
              <View style={styles.paginationDot} />
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
                  (!firstName.trim() || !lastName.trim()) && styles.disabledButton
                ]}
                onPress={handleNext}
                disabled={!firstName.trim() || !lastName.trim()}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        
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
  keyboardAvoid: {
    flex: 1,
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
    marginBottom: 24,
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