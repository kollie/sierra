import { 
  CommunityActionTypes, 
  CommunityAction, 
  CommunityState 
} from '@/types/redux';

// Initial state
const initialState: CommunityState = {
  form: {
    name: '',
    description: '',
    location: '',
    category: '',
    guidelines: ''
  },
  communities: [],
  status: {
    loading: false,
    error: null,
    success: false
  }
};

// Reducer
export const communityReducer = (
  state: CommunityState = initialState,
  action: CommunityAction
): CommunityState => {
  switch (action.type) {
    // Form field actions
    case CommunityActionTypes.SET_NAME:
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload
        }
      };
      
    case CommunityActionTypes.SET_DESCRIPTION:
      return {
        ...state,
        form: {
          ...state.form,
          description: action.payload
        }
      };
      
    case CommunityActionTypes.SET_LOCATION:
      return {
        ...state,
        form: {
          ...state.form,
          location: action.payload
        }
      };
      
    case CommunityActionTypes.SET_CATEGORY:
      return {
        ...state,
        form: {
          ...state.form,
          category: action.payload
        }
      };
      
    case CommunityActionTypes.SET_GUIDELINES:
      return {
        ...state,
        form: {
          ...state.form,
          guidelines: action.payload
        }
      };
      
    case CommunityActionTypes.RESET_FORM:
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
    case CommunityActionTypes.CREATE_COMMUNITY_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          error: null,
          success: false
        }
      };
      
    case CommunityActionTypes.CREATE_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: [...state.communities, action.payload],
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case CommunityActionTypes.CREATE_COMMUNITY_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    case CommunityActionTypes.FETCH_COMMUNITIES_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null
        }
      };
      
    case CommunityActionTypes.FETCH_COMMUNITIES_SUCCESS:
      return {
        ...state,
        communities: action.payload,
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case CommunityActionTypes.FETCH_COMMUNITIES_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload,
          success: false
        }
      };
      
    case CommunityActionTypes.JOIN_COMMUNITY_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true
        }
      };
      
    case CommunityActionTypes.JOIN_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: state.communities.map(community => 
          community.id === action.payload.communityId
            ? { 
                ...community, 
                joined: action.payload.joined,
                members: action.payload.joined 
                  ? community.members + 1 
                  : community.members - 1
              }
            : community
        ),
        status: {
          loading: false,
          error: null,
          success: true
        }
      };
      
    case CommunityActionTypes.JOIN_COMMUNITY_FAILURE:
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