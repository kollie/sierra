import { Dispatch } from 'redux';
import { 
  OnboardingActionTypes, 
  OnboardingAction,
  UserOnboardingState
} from '@/types/redux';

// Personal info actions
export const setFirstName = (firstName: string): OnboardingAction => ({
  type: OnboardingActionTypes.SET_FIRST_NAME,
  payload: firstName
});

export const setLastName = (lastName: string): OnboardingAction => ({
  type: OnboardingActionTypes.SET_LAST_NAME,
  payload: lastName
});

// Account info actions
export const setEmail = (email: string): OnboardingAction => ({
  type: OnboardingActionTypes.SET_EMAIL,
  payload: email
});

export const setPassword = (password: string): OnboardingAction => ({
  type: OnboardingActionTypes.SET_PASSWORD,
  payload: password
});

// Preferences actions
export const setInterests = (interests: string[]): OnboardingAction => ({
  type: OnboardingActionTypes.SET_INTERESTS,
  payload: interests
});

export const setLocation = (location: string): OnboardingAction => ({
  type: OnboardingActionTypes.SET_LOCATION,
  payload: location
});

export const toggleNotifications = (enabled: boolean): OnboardingAction => ({
  type: OnboardingActionTypes.TOGGLE_NOTIFICATIONS,
  payload: enabled
});

export const toggleLocationSharing = (enabled: boolean): OnboardingAction => ({
  type: OnboardingActionTypes.TOGGLE_LOCATION_SHARING,
  payload: enabled
});

// Status actions
export const setCurrentStep = (step: number): OnboardingAction => ({
  type: OnboardingActionTypes.SET_CURRENT_STEP,
  payload: step
});

export const resetOnboarding = (): OnboardingAction => ({
  type: OnboardingActionTypes.RESET_ONBOARDING
});