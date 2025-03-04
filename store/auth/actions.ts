import { Dispatch } from 'redux';
import axios from 'axios';
import { 
  AuthActionTypes, 
  AuthAction,
  LoginCredentials
} from '@/types/redux';
import { API_URL } from '@/constants/api';
import { User } from '@/types';
import { mockUser } from '@/data/mockData';

// Auth status actions
export const setLoading = (loading: boolean): AuthAction => ({
  type: AuthActionTypes.SET_LOADING,
  payload: loading
});

export const setError = (error: string | null): AuthAction => ({
  type: AuthActionTypes.SET_ERROR,
  payload: error
});

export const setUser = (user: User | null): AuthAction => ({
  type: AuthActionTypes.SET_USER,
  payload: user
});

// Login action
export const login = (credentials: LoginCredentials) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
      
      // Validate credentials
      if (!credentials.email || !credentials.password) {
        dispatch({
          type: AuthActionTypes.LOGIN_FAILURE,
          payload: 'Email and password are required'
        });
        return false;
      }
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        const { user, token } = response.data;
        
        // Store token in local storage or secure store
        // localStorage.setItem('token', token);
        
        dispatch({ 
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: user
        });
        return true;
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
      */
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        dispatch({ 
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: mockUser
        });
        return true;
      } else {
        dispatch({
          type: AuthActionTypes.LOGIN_FAILURE,
          payload: 'Invalid email or password'
        });
        return false;
      }
      
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
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Register action
export const register = (userData: any) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.REGISTER_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 201) {
        const { user, token } = response.data;
        
        // Store token in local storage or secure store
        // localStorage.setItem('token', token);
        
        dispatch({ 
          type: AuthActionTypes.REGISTER_SUCCESS,
          payload: user
        });
        return true;
      } else {
        throw new Error('Registration failed. Please try again.');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ 
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: {
          ...mockUser,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email
        }
      });
      return true;
      
    } catch (error) {
      // Handle error
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (axios.isAxiosError(error)) {
        // Handle Axios specific errors
        if (error.response) {
          errorMessage = error.response.data.message || 
                         `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your internet connection.';
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      dispatch({
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Logout action
export const logout = (): AuthAction => {
  // Remove token from storage
  // localStorage.removeItem('token');
  
  return {
    type: AuthActionTypes.LOGOUT
  };
};

// Check auth status action
export const checkAuthStatus = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.CHECK_AUTH_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Get token from storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        dispatch({ type: AuthActionTypes.CHECK_AUTH_FAILURE });
        return false;
      }
      
      // Verify token with API
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        dispatch({ 
          type: AuthActionTypes.CHECK_AUTH_SUCCESS,
          payload: response.data.user
        });
        return true;
      } else {
        throw new Error('Authentication failed');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, we'll just check if we have a user in state
      // In a real app, we would check for a valid token
      const hasAuth = Math.random() > 0.5; // Simulate 50% chance of being logged in
      
      if (hasAuth) {
        dispatch({ 
          type: AuthActionTypes.CHECK_AUTH_SUCCESS,
          payload: mockUser
        });
        return true;
      } else {
        dispatch({ type: AuthActionTypes.CHECK_AUTH_FAILURE });
        return false;
      }
      
    } catch (error) {
      dispatch({ type: AuthActionTypes.CHECK_AUTH_FAILURE });
      return false;
    }
  };
};