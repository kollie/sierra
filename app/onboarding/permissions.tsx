import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowRight, ArrowLeft, Bell, MapPin } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleNotifications, toggleLocationSharing, setCurrentStep } from '@/store/onboarding/actions';

export default function OnboardingPermissions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notifications, locationSharing } = useAppSelector(state => state.onboarding.preferences);
  
  useEffect(() => {
    // Set current step when component mounts
    dispatch(setCurrentStep(6));
  }, [dispatch]);

  const handleNotificationsToggle = (value: boolean) => {
    dispatch(toggleNotifications(value));
  };

  const handleLocationSharingToggle = (value: boolean) => {
    dispatch(toggleLocationSharing(value));
  };

  const handleNext = () => {
    router.push('/onboarding/review');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <Text style={styles.title}>Enable Permissions</Text>
        <Text style={styles.subtitle}>
          Allow these permissions to get the most out of Chapters
        </Text>
        
        <View style={styles.permissionsContainer}>
          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <View style={styles.iconContainer}>
                <Bell size={24} color="#FFFFFF" />
              </View>
              <View style={styles.permissionTextContainer}>
                <Text style={styles.permissionTitle}>Notifications</Text>
                <Text style={styles.permissionDescription}>
                  Get updates about events, messages, and community activity
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: '#E2E8F0', true: '#001B3A' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notifications ? '#FFFFFF' : '#F1F5F9'}
              ios_backgroundColor="#E2E8F0"
            />
          </View>
          
          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                <MapPin size={24} color="#FFFFFF" />
              </View>
              <View style={styles.permissionTextContainer}>
                <Text style={styles.permissionTitle}>Location</Text>
                <Text style={styles.permissionDescription}>
                  Discover events and communities near you
                </Text>
              </View>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={handleLocationSharingToggle}
              trackColor={{ false: '#E2E8F0', true: '#001B3A' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : locationSharing ? '#FFFFFF' : '#F1F5F9'}
              ios_backgroundColor="#E2E8F0"
            />
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
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.activeDot]} />
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
            style={styles.nextButton}
            onPress={handleNext}
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
  permissionsContainer: {
    marginTop: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#001B3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionTextContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
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