import { 
  EventInteractionActionTypes, 
  EventInteractionAction, 
  EventInteractionState 
} from '@/types/redux';

const initialState: EventInteractionState = {
  likedEvents: [],
  participatingEvents: [],
  status: {
    loading: false,
    error: null
  }
};

export const eventInteractionReducer = (
  state: EventInteractionState = initialState,
  action: EventInteractionAction
): EventInteractionState => {
  switch (action.type) {
    case EventInteractionActionTypes.TOGGLE_LIKE:
      return {
        ...state,
        likedEvents: state.likedEvents.includes(action.payload)
          ? state.likedEvents.filter(id => id !== action.payload)
          : [...state.likedEvents, action.payload]
      };
      
    case EventInteractionActionTypes.TOGGLE_PARTICIPATION:
      return {
        ...state,
        participatingEvents: state.participatingEvents.includes(action.payload)
          ? state.participatingEvents.filter(id => id !== action.payload)
          : [...state.participatingEvents, action.payload]
      };
      
    case EventInteractionActionTypes.SET_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: action.payload
        }
      };
      
    case EventInteractionActionTypes.SET_ERROR:
      return {
        ...state,
        status: {
          ...state.status,
          error: action.payload
        }
      };
      
    default:
      return state;
  }
};