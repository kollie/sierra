import { Dispatch } from 'redux';
import { 
  EventInteractionActionTypes, 
  EventInteractionAction 
} from '@/types/redux';

// Action creators
export const toggleLike = (eventId: string) => {
  return async (dispatch: Dispatch<EventInteractionAction>) => {
    try {
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({
        type: EventInteractionActionTypes.TOGGLE_LIKE,
        payload: eventId
      });
      
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: EventInteractionActionTypes.SET_ERROR,
        payload: 'Failed to update like status'
      });
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: false });
    }
  };
};

export const toggleParticipation = (eventId: string) => {
  return async (dispatch: Dispatch<EventInteractionAction>) => {
    try {
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: EventInteractionActionTypes.TOGGLE_PARTICIPATION,
        payload: eventId
      });
      
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: false });
      return true;
    } catch (error) {
      dispatch({
        type: EventInteractionActionTypes.SET_ERROR,
        payload: 'Failed to update participation status'
      });
      dispatch({ type: EventInteractionActionTypes.SET_LOADING, payload: false });
      return false;
    }
  };
};