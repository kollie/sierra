import { 
  AuthActionTypes, 
  AuthAction, 
  AuthState 
} from '@/types/redux';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Reducer
export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    // Status actions
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
      
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
      
    // Login actions
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
      
    // Register actions
    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Logout action
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState
      };
      
    // Check auth actions
    case AuthActionTypes.CHECK_AUTH_REQUEST:
      return {
        ...state,
        loading: true
      };
      
    case AuthActionTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
      
    case AuthActionTypes.CHECK_AUTH_FAILURE:
      return {
        ...initialState,
        loading: false
      };
      
    default:
      return state;
  }
};