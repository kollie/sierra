import { 
  OnboardingActionTypes, 
  OnboardingAction, 
  UserOnboardingState 
} from '@/types/redux';

// Initial state
const initialState: UserOnboardingState = {
  personalInfo: {
    firstName: '',
    lastName: ''
  },
  accountInfo: {
    email: '',
    password: ''
  },
  preferences: {
    interests: [],
    location: '',
    notifications: false,
    locationSharing: false
  },
  status: {
    currentStep: 0
  }
};

// Reducer
export const onboardingReducer = (
  state: UserOnboardingState = initialState,
  action: OnboardingAction
): UserOnboardingState => {
  switch (action.type) {
    case OnboardingActionTypes.SET_FIRST_NAME:
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          firstName: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_LAST_NAME:
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          lastName: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_EMAIL:
      return {
        ...state,
        accountInfo: {
          ...state.accountInfo,
          email: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_PASSWORD:
      return {
        ...state,
        accountInfo: {
          ...state.accountInfo,
          password: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_INTERESTS:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          interests: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_LOCATION:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          location: action.payload
        }
      };
      
    case OnboardingActionTypes.TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          notifications: action.payload
        }
      };
      
    case OnboardingActionTypes.TOGGLE_LOCATION_SHARING:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          locationSharing: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        status: {
          ...state.status,
          currentStep: action.payload
        }
      };
      
    case OnboardingActionTypes.RESET_ONBOARDING:
      return initialState;
      
    default:
      return state;
  }
};