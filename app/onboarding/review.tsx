import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowLeft, Check, X, CreditCard as Edit2 } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCurrentStep, submitOnboardingData } from '@/store/onboarding/actions';

export default function OnboardingReview() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onboardingState = useAppSelector(state => state.onboarding);
  const { loading, error } = useAppSelector(state => state.onboarding.status);
  
  useEffect(() => {
    // Set current step when component mounts
    dispatch(setCurrentStep(7));
  }, [dispatch]);

  const handleSubmit = async () => {
    // Temporarily bypass API validation and just proceed to completion
    router.push('/onboarding/complete');
    
    /* 
    // Original API validation code - commented out for now
    const success = await dispatch(submitOnboardingData());
    if (success) {
      router.push('/onboarding/complete');
    }
    */
  };

  const handleEditSection = (section: string) => {
    switch (section) {
      case 'personal':
        router.push('/onboarding/name');
        break;
      case 'account':
        router.push('/onboarding/email');
        break;
      case 'interests':
        router.push('/onboarding/interests');
        break;
      case 'location':
        router.push('/onboarding/location');
        break;
      case 'permissions':
        router.push('/onboarding/permissions');
        break;
      default:
        break;
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Your Information</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={styles.content}
          entering={FadeIn.duration(800)}
        >
          <Text style={styles.subtitle}>
            Please review your information before creating your account
          </Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <X size={20} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditSection('personal')}
              >
                <Edit2 size={16} color="#001B3A" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>First Name</Text>
              <Text style={styles.infoValue}>{onboardingState.personalInfo.firstName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Name</Text>
              <Text style={styles.infoValue}>{onboardingState.personalInfo.lastName}</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditSection('account')}
              >
                <Edit2 size={16} color="#001B3A" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{onboardingState.accountInfo.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Password</Text>
              <Text style={styles.infoValue}>••••••••</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditSection('interests')}
              >
                <Edit2 size={16} color="#001B3A" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.interestsContainer}>
              { onboardingState.preferences.interests.map((interest, index) => (
                <View key={index} style={styles.interestChip}>
                  <Text style={styles.interestChipText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditSection('location')}
              >
                <Edit2 size={16} color="#001B3A" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{onboardingState.preferences.location}</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Permissions</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditSection('permissions')}
              >
                <Edit2 size={16} color="#001B3A" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Notifications</Text>
              <View style={styles.permissionStatus}>
                {onboardingState.preferences.notifications ? (
                  <Check size={16} color="#10B981" />
                ) : (
                  <X size={16} color="#EF4444" />
                )}
                <Text 
                  style={[
                    styles.permissionStatusText,
                    onboardingState.preferences.notifications ? styles.enabledText : styles.disabledText
                  ]}
                >
                  {onboardingState.preferences.notifications ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Location Sharing</Text>
              <View style={styles.permissionStatus}>
                {onboardingState.preferences.locationSharing ? (
                  <Check size={16} color="#10B981" />
                ) : (
                  <X size={16} color="#EF4444" />
                )}
                <Text 
                  style={[
                    styles.permissionStatusText,
                    onboardingState.preferences.locationSharing ? styles.enabledText : styles.disabledText
                  ]}
                >
                  {onboardingState.preferences.locationSharing ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.activeDot]} />
        </View>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Create Account</Text>
              <Check size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001B3A',
    marginLeft: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestChipText: {
    fontSize: 14,
    color: '#001B3A',
    fontWeight: '500',
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  permissionStatusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  enabledText: {
    color: '#10B981',
  },
  disabledText: {
    color: '#EF4444',
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001B3A',
    paddingVertical: 16,
    borderRadius: 8,
  },
  submitButtonText: {
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