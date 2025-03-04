import { Dispatch } from 'redux';
import axios from 'axios';
import { 
  OnboardingActionTypes, 
  OnboardingAction,
  UserOnboardingState
} from '@/types/redux';
import { API_URL } from '@/constants/api';
import { validateOnboardingData } from '@/utils/validation';

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

export const addInterest = (interest: string): OnboardingAction => ({
  type: OnboardingActionTypes.ADD_INTEREST,
  payload: interest
});

export const removeInterest = (interest: string): OnboardingAction => ({
  type: OnboardingActionTypes.REMOVE_INTEREST,
  payload: interest
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
export const setLoading = (loading: boolean): OnboardingAction => ({
  type: OnboardingActionTypes.SET_LOADING,
  payload: loading
});

export const setError = (error: string | null): OnboardingAction => ({
  type: OnboardingActionTypes.SET_ERROR,
  payload: error
});

export const setSuccess = (success: boolean): OnboardingAction => ({
  type: OnboardingActionTypes.SET_SUCCESS,
  payload: success
});

export const setCurrentStep = (step: number): OnboardingAction => ({
  type: OnboardingActionTypes.SET_CURRENT_STEP,
  payload: step
});

export const setCompleted = (completed: boolean): OnboardingAction => ({
  type: OnboardingActionTypes.SET_COMPLETED,
  payload: completed
});

// Reset action
export const resetOnboarding = (): OnboardingAction => ({
  type: OnboardingActionTypes.RESET_ONBOARDING
});

// Async action to submit onboarding data
export const submitOnboardingData = () => {
  return async (dispatch: Dispatch<OnboardingAction>, getState: () => { onboarding: UserOnboardingState }) => {
    try {
      const onboardingState = getState().onboarding;
      
      // Validate all data before submission
      const validationError = validateOnboardingData(onboardingState);
      if (validationError) {
        dispatch({
          type: OnboardingActionTypes.SET_ERROR,
          payload: validationError
        });
        return false;
      }
      
      // Set loading state
      dispatch({ type: OnboardingActionTypes.SUBMIT_ONBOARDING_REQUEST });
      
      // Prepare data for API
      const userData = {
        personalInfo: {
          firstName: onboardingState.personalInfo.firstName,
          lastName: onboardingState.personalInfo.lastName
        },
        accountInfo: {
          email: onboardingState.accountInfo.email,
          password: onboardingState.accountInfo.password
        },
        preferences: {
          interests: onboardingState.preferences.interests,
          location: onboardingState.preferences.location,
          notifications: onboardingState.preferences.notifications,
          locationSharing: onboardingState.preferences.locationSharing
        }
      };
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: OnboardingActionTypes.SUBMIT_ONBOARDING_SUCCESS });
        dispatch({ type: OnboardingActionTypes.SET_COMPLETED, payload: true });
        return true;
      } else {
        throw new Error('Registration failed. Please try again.');
      }
      */
      
      // Simulate successful API response
      setTimeout(() => {
        dispatch({ type: OnboardingActionTypes.SUBMIT_ONBOARDING_SUCCESS });
        dispatch({ type: OnboardingActionTypes.SET_COMPLETED, payload: true });
      }, 500);
      
      return true;
      
    } catch (error) {
      // Handle error
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (axios.isAxiosError(error)) {
        // Handle Axios specific errors
        if (error.response) {
          // Server responded with an error status
          errorMessage = error.response.data.message || 
                         `Server error: ${error.response.status}`;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = 'No response from server. Please check your internet connection.';
        } else {
          // Error in setting up the request
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      dispatch({
        type: OnboardingActionTypes.SUBMIT_ONBOARDING_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};