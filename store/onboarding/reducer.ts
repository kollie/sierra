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
    loading: false,
    error: null,
    success: false,
    currentStep: 0,
    completed: false
  }
};

// Reducer
export const onboardingReducer = (
  state: UserOnboardingState = initialState,
  action: OnboardingAction
): UserOnboardingState => {
  switch (action.type) {
    // Personal info actions
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
      
    // Account info actions
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
      
    // Preferences actions
    case OnboardingActionTypes.SET_INTERESTS:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          interests: action.payload
        }
      };
      
    case OnboardingActionTypes.ADD_INTEREST:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          interests: [...state.preferences.interests, action.payload]
        }
      };
      
    case OnboardingActionTypes.REMOVE_INTEREST:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          interests: state.preferences.interests.filter(
            interest => interest !== action.payload
          )
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
      
    // Status actions
    case OnboardingActionTypes.SET_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_ERROR:
      return {
        ...state,
        status: {
          ...state.status,
          error: action.payload
        }
      };
      
    case OnboardingActionTypes.SET_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          success: action.payload
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
      
    case OnboardingActionTypes.SET_COMPLETED:
      return {
        ...state,
        status: {
          ...state.status,
          completed: action.payload
        }
      };
      
    // Form submission actions
    case OnboardingActionTypes.SUBMIT_ONBOARDING_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null
        }
      };
      
    case OnboardingActionTypes.SUBMIT_ONBOARDING_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          success: true,
          error: null
        }
      };
      
    case OnboardingActionTypes.SUBMIT_ONBOARDING_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          success: false,
          error: action.payload
        }
      };
      
    // Reset action
    case OnboardingActionTypes.RESET_ONBOARDING:
      return initialState;
      
    default:
      return state;
  }
};