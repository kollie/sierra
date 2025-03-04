import { 
  EventActionTypes, 
  EventAction, 
  EventState 
} from '@/types/redux';

// Initial state
const initialState: EventState = {
  form: {
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    category: '',
    image: null
  },
  events: [],
  status: {
    loading: false,
    error: null,
    success: false
  }
};

// Reducer
export const eventReducer = (
  state: EventState = initialState,
  action: EventAction
): EventState => {
  switch (action.type) {
    // Form field actions
    case EventActionTypes.SET_TITLE:
      return {
        ...state,
        form: {
          ...state.form,
          title: action.payload
        }
      };
      
    case EventActionTypes.SET_DESCRIPTION:
      return {
        ...state,
        form: {
          ...state.form,
          description: action.payload
        }
      };
      
    case EventActionTypes.SET_LOCATION:
      return {
        ...state,
        form: {
          ...state.form,
          location: action.payload
        }
      };
      
    case EventActionTypes.SET_DATE:
      return {
        ...state,
        form: {
          ...state.form,
          date: action.payload
        }
      };
      
    case EventActionTypes.SET_TIME:
      return {
        ...state,
        form: {
          ...state.form,
          time: action.payload
        }
      };
      
    case EventActionTypes.SET_PRICE:
      return {
        ...state,
        form: {
          ...state.form,
          price: action.payload
        }
      };
      
    case EventActionTypes.SET_CATEGORY:
      return {
        ...state,
        form: {
          ...state.form,
          category: action.payload
        }
      };
      
    case EventActionTypes.SET_IMAGE:
      return {
        ...state,
        form: {
          ...state.form,
          image: action.payload
        }
      };
      
    case EventActionTypes.RESET_FORM:
      return {
        ...state,
        form: initialState.form,
        status: {
          ...state.status,
          error: null,
          success: false
        }
      };
      
    // API actions
    case EventActionTypes.CREATE_EVENT_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          error: null,
          success: false
        }
      };
      
    case EventActionTypes.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case EventActionTypes.CREATE_EVENT_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    case EventActionTypes.FETCH_EVENTS_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null
        }
      };
      
    case EventActionTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case EventActionTypes.FETCH_EVENTS_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    case EventActionTypes.UPDATE_EVENT_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null
        }
      };
      
    case EventActionTypes.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(event => 
          event.id === action.payload.id ? action.payload : event
        ),
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case EventActionTypes.UPDATE_EVENT_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    case EventActionTypes.DELETE_EVENT_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null
        }
      };
      
    case EventActionTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case EventActionTypes.DELETE_EVENT_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    default:
      return state;
  }
};