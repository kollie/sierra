import { Dispatch } from 'redux';
import axios from 'axios';
import { 
  CommunityActionTypes, 
  CommunityAction,
  CommunityFormData
} from '@/types/redux';
import { API_URL } from '@/constants/api';
import { Community } from '@/types';
import { mockCommunities } from '@/data/mockData';

// Form field actions
export const setName = (name: string): CommunityAction => ({
  type: CommunityActionTypes.SET_NAME,
  payload: name
});

export const setDescription = (description: string): CommunityAction => ({
  type: CommunityActionTypes.SET_DESCRIPTION,
  payload: description
});

export const setCommunityLocation = (location: string): CommunityAction => ({
  type: CommunityActionTypes.SET_LOCATION,
  payload: location
});

export const setCategory = (category: string): CommunityAction => ({
  type: CommunityActionTypes.SET_CATEGORY,
  payload: category
});

export const setGuidelines = (guidelines: string): CommunityAction => ({
  type: CommunityActionTypes.SET_GUIDELINES,
  payload: guidelines
});

export const resetForm = (): CommunityAction => ({
  type: CommunityActionTypes.RESET_FORM
});

// Async action to create a community
export const createCommunity = (communityData: CommunityFormData) => {
  return async (dispatch: Dispatch<CommunityAction>) => {
    try {
      // Validate data
      if (!communityData.name || !communityData.description || !communityData.category || !communityData.location) {
        throw new Error('Please fill in all required fields');
      }
      
      dispatch({ type: CommunityActionTypes.CREATE_COMMUNITY_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.post(`${API_URL}/communities`, communityData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 201) {
        dispatch({ 
          type: CommunityActionTypes.CREATE_COMMUNITY_SUCCESS,
          payload: response.data
        });
        return true;
      } else {
        throw new Error('Failed to create community. Please try again.');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock community with the form data
      const newCommunity: Community = {
        id: `community${Date.now()}`,
        name: communityData.name,
        description: communityData.description,
        image: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=3280&auto=format&fit=crop',
        category: communityData.category,
        location: communityData.location,
        members: 1, // Start with 1 member (the creator)
        joined: true, // Creator is automatically joined
        guidelines: communityData.guidelines || ''
      };
      
      dispatch({ 
        type: CommunityActionTypes.CREATE_COMMUNITY_SUCCESS,
        payload: newCommunity
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
        type: CommunityActionTypes.CREATE_COMMUNITY_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Async action to fetch communities
export const fetchCommunities = () => {
  return async (dispatch: Dispatch<CommunityAction>) => {
    try {
      dispatch({ type: CommunityActionTypes.FETCH_COMMUNITIES_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.get(`${API_URL}/communities`, {
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        dispatch({ 
          type: CommunityActionTypes.FETCH_COMMUNITIES_SUCCESS,
          payload: response.data
        });
        return true;
      } else {
        throw new Error('Failed to fetch communities. Please try again.');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ 
        type: CommunityActionTypes.FETCH_COMMUNITIES_SUCCESS,
        payload: mockCommunities
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
        type: CommunityActionTypes.FETCH_COMMUNITIES_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Async action to join/leave a community
export const toggleJoinCommunity = (communityId: string) => {
  return async (dispatch: Dispatch<CommunityAction>, getState: () => { community: { communities: Community[] } }) => {
    try {
      dispatch({ type: CommunityActionTypes.JOIN_COMMUNITY_REQUEST });
      
      // Find the community in the state
      const { communities } = getState().community;
      const community = communities.find(c => c.id === communityId);
      
      if (!community) {
        throw new Error('Community not found');
      }
      
      const isJoining = !community.joined;
      
      /* 
      // API call code - commented out for now
      // Make API request
      const endpoint = isJoining 
        ? `${API_URL}/communities/${communityId}/join`
        : `${API_URL}/communities/${communityId}/leave`;
        
      const response = await axios.post(endpoint, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        dispatch({ 
          type: CommunityActionTypes.JOIN_COMMUNITY_SUCCESS,
          payload: {
            communityId,
            joined: isJoining
          }
        });
        return true;
      } else {
        throw new Error(`Failed to ${isJoining ? 'join' : 'leave'} community. Please try again.`);
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ 
        type: CommunityActionTypes.JOIN_COMMUNITY_SUCCESS,
        payload: {
          communityId,
          joined: isJoining
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
        type: CommunityActionTypes.JOIN_COMMUNITY_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};