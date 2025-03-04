import { Dispatch } from 'redux';
import axios from 'axios';
import { 
  EventActionTypes, 
  EventAction,
  EventFormState
} from '@/types/redux';
import { API_URL } from '@/constants/api';
import { Event } from '@/types';
import { validateEventData } from '@/utils/validation';
import { format } from 'date-fns';

// Form field actions
export const setTitle = (title: string): EventAction => ({
  type: EventActionTypes.SET_TITLE,
  payload: title
});

export const setDescription = (description: string): EventAction => ({
  type: EventActionTypes.SET_DESCRIPTION,
  payload: description
});

export const setEventLocation = (location: string): EventAction => ({
  type: EventActionTypes.SET_LOCATION,
  payload: location
});

export const setDate = (date: string): EventAction => ({
  type: EventActionTypes.SET_DATE,
  payload: date
});

export const setTime = (time: string): EventAction => ({
  type: EventActionTypes.SET_TIME,
  payload: time
});

export const setPrice = (price: string): EventAction => ({
  type: EventActionTypes.SET_PRICE,
  payload: price
});

export const setCategory = (category: string): EventAction => ({
  type: EventActionTypes.SET_CATEGORY,
  payload: category
});

export const setImage = (image: string | null): EventAction => ({
  type: EventActionTypes.SET_IMAGE,
  payload: image
});

export const resetForm = (): EventAction => ({
  type: EventActionTypes.RESET_FORM
});

// Async action to create an event
export const createEvent = () => {
  return async (dispatch: Dispatch<EventAction>, getState: () => { event: { form: EventFormState } }) => {
    try {
      const eventForm = getState().event.form;
      
      // Validate all data before submission
      const validationError = validateEventData(eventForm);
      if (validationError) {
        dispatch({
          type: EventActionTypes.CREATE_EVENT_FAILURE,
          payload: validationError
        });
        return false;
      }
      
      // Set loading state
      dispatch({ type: EventActionTypes.CREATE_EVENT_REQUEST });
      
      // Prepare data for API
      const eventData = {
        title: eventForm.title,
        description: eventForm.description,
        location: eventForm.location,
        date: eventForm.date,
        time: eventForm.time,
        price: eventForm.price ? parseFloat(eventForm.price) : 0,
        category: eventForm.category,
        image: eventForm.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=3269&auto=format&fit=crop'
      };
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.post(`${API_URL}/events`, eventData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200 || response.status === 201) {
        dispatch({ 
          type: EventActionTypes.CREATE_EVENT_SUCCESS,
          payload: response.data
        });
        return true;
      } else {
        throw new Error('Event creation failed. Please try again.');
      }
      */
      
      // Simulate successful API response
      setTimeout(() => {
        const mockEvent: Event = {
          id: `event${Date.now()}`,
          title: eventData.title,
          description: eventData.description,
          image: eventData.image,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          category: eventData.category,
          price: eventData.price,
          attendees: 0,
          attendeeAvatars: [],
          organizer: {
            id: 'user1',
            name: 'Alex Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop'
          }
        };
        
        dispatch({ 
          type: EventActionTypes.CREATE_EVENT_SUCCESS,
          payload: mockEvent
        });
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
        type: EventActionTypes.CREATE_EVENT_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Async action to fetch events
export const fetchEvents = () => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      dispatch({ type: EventActionTypes.FETCH_EVENTS_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.get(`${API_URL}/events`, {
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        dispatch({ 
          type: EventActionTypes.FETCH_EVENTS_SUCCESS,
          payload: response.data
        });
        return true;
      } else {
        throw new Error('Failed to fetch events. Please try again.');
      }
      */
      
      // Simulate successful API response with mock data
      setTimeout(() => {
        // Use mock events from data/mockData.ts
        // This would be replaced with actual API data
        import('@/data/mockData').then(({ mockEvents }) => {
          dispatch({ 
            type: EventActionTypes.FETCH_EVENTS_SUCCESS,
            payload: mockEvents
          });
        });
      }, 500);
      
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
        type: EventActionTypes.FETCH_EVENTS_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Async action to update an event
export const updateEvent = (eventId: string, eventData: Partial<EventFormState>) => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      dispatch({ type: EventActionTypes.UPDATE_EVENT_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200) {
        dispatch({ 
          type: EventActionTypes.UPDATE_EVENT_SUCCESS,
          payload: response.data
        });
        return true;
      } else {
        throw new Error('Event update failed. Please try again.');
      }
      */
      
      // Simulate successful API response
      setTimeout(() => {
        // This would be replaced with actual API response data
        const mockUpdatedEvent: Event = {
          id: eventId,
          title: eventData.title || '',
          description: eventData.description || '',
          image: eventData.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=3269&auto=format&fit=crop',
          date: eventData.date || format(new Date(), 'yyyy-MM-dd'),
          time: eventData.time || '18:00',
          location: eventData.location || '',
          category: eventData.category || 'social',
          price: eventData.price ? parseFloat(eventData.price) : 0,
          attendees: 0,
          attendeeAvatars: [],
          organizer: {
            id: 'user1',
            name: 'Alex Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop'
          }
        };
        
        dispatch({ 
          type: EventActionTypes.UPDATE_EVENT_SUCCESS,
          payload: mockUpdatedEvent
        });
      }, 500);
      
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
        type: EventActionTypes.UPDATE_EVENT_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};

// Async action to delete an event
export const deleteEvent = (eventId: string) => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      dispatch({ type: EventActionTypes.DELETE_EVENT_REQUEST });
      
      /* 
      // API call code - commented out for now
      // Make API request
      const response = await axios.delete(`${API_URL}/events/${eventId}`, {
        timeout: 10000 // 10 seconds timeout
      });
      
      // Handle success
      if (response.status === 200 || response.status === 204) {
        dispatch({ 
          type: EventActionTypes.DELETE_EVENT_SUCCESS,
          payload: eventId
        });
        return true;
      } else {
        throw new Error('Event deletion failed. Please try again.');
      }
      */
      
      // Simulate successful API response
      setTimeout(() => {
        dispatch({ 
          type: EventActionTypes.DELETE_EVENT_SUCCESS,
          payload: eventId
        });
      }, 500);
      
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
        type: EventActionTypes.DELETE_EVENT_FAILURE,
        payload: errorMessage
      });
      
      return false;
    }
  };
};