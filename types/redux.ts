import { User, Event, Community } from './index';

// User onboarding state types
export interface UserOnboardingState {
  personalInfo: {
    firstName: string;
    lastName: string;
  };
  accountInfo: {
    email: string;
    password: string;
  };
  preferences: {
    interests: string[];
    location: string;
    notifications: boolean;
    locationSharing: boolean;
  };
  status: {
    loading: boolean;
    error: string | null;
    success: boolean;
    currentStep: number;
    completed: boolean;
  };
}

// Action types
export enum OnboardingActionTypes {
  // Personal info actions
  SET_FIRST_NAME = 'onboarding/SET_FIRST_NAME',
  SET_LAST_NAME = 'onboarding/SET_LAST_NAME',
  
  // Account info actions
  SET_EMAIL = 'onboarding/SET_EMAIL',
  SET_PASSWORD = 'onboarding/SET_PASSWORD',
  
  // Preferences actions
  SET_INTERESTS = 'onboarding/SET_INTERESTS',
  ADD_INTEREST = 'onboarding/ADD_INTEREST',
  REMOVE_INTEREST = 'onboarding/REMOVE_INTEREST',
  SET_LOCATION = 'onboarding/SET_LOCATION',
  TOGGLE_NOTIFICATIONS = 'onboarding/TOGGLE_NOTIFICATIONS',
  TOGGLE_LOCATION_SHARING = 'onboarding/TOGGLE_LOCATION_SHARING',
  
  // Status actions
  SET_LOADING = 'onboarding/SET_LOADING',
  SET_ERROR = 'onboarding/SET_ERROR',
  SET_SUCCESS = 'onboarding/SET_SUCCESS',
  SET_CURRENT_STEP = 'onboarding/SET_CURRENT_STEP',
  SET_COMPLETED = 'onboarding/SET_COMPLETED',
  
  // Form actions
  SUBMIT_ONBOARDING_REQUEST = 'onboarding/SUBMIT_ONBOARDING_REQUEST',
  SUBMIT_ONBOARDING_SUCCESS = 'onboarding/SUBMIT_ONBOARDING_SUCCESS',
  SUBMIT_ONBOARDING_FAILURE = 'onboarding/SUBMIT_ONBOARDING_FAILURE',
  
  // Reset action
  RESET_ONBOARDING = 'onboarding/RESET_ONBOARDING'
}

// Action interfaces
export interface SetFirstNameAction {
  type: OnboardingActionTypes.SET_FIRST_NAME;
  payload: string;
}

export interface SetLastNameAction {
  type: OnboardingActionTypes.SET_LAST_NAME;
  payload: string;
}

export interface SetEmailAction {
  type: OnboardingActionTypes.SET_EMAIL;
  payload: string;
}

export interface SetPasswordAction {
  type: OnboardingActionTypes.SET_PASSWORD;
  payload: string;
}

export interface SetInterestsAction {
  type: OnboardingActionTypes.SET_INTERESTS;
  payload: string[];
}

export interface AddInterestAction {
  type: OnboardingActionTypes.ADD_INTEREST;
  payload: string;
}

export interface RemoveInterestAction {
  type: OnboardingActionTypes.REMOVE_INTEREST;
  payload: string;
}

export interface SetLocationAction {
  type: OnboardingActionTypes.SET_LOCATION;
  payload: string;
}

export interface ToggleNotificationsAction {
  type: OnboardingActionTypes.TOGGLE_NOTIFICATIONS;
  payload: boolean;
}

export interface ToggleLocationSharingAction {
  type: OnboardingActionTypes.TOGGLE_LOCATION_SHARING;
  payload: boolean;
}

export interface SetLoadingAction {
  type: OnboardingActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: OnboardingActionTypes.SET_ERROR;
  payload: string | null;
}

export interface SetSuccessAction {
  type: OnboardingActionTypes.SET_SUCCESS;
  payload: boolean;
}

export interface SetCurrentStepAction {
  type: OnboardingActionTypes.SET_CURRENT_STEP;
  payload: number;
}

export interface SetCompletedAction {
  type: OnboardingActionTypes.SET_COMPLETED;
  payload: boolean;
}

export interface SubmitOnboardingRequestAction {
  type: OnboardingActionTypes.SUBMIT_ONBOARDING_REQUEST;
}

export interface SubmitOnboardingSuccessAction {
  type: OnboardingActionTypes.SUBMIT_ONBOARDING_SUCCESS;
}

export interface SubmitOnboardingFailureAction {
  type: OnboardingActionTypes.SUBMIT_ONBOARDING_FAILURE;
  payload: string;
}

export interface ResetOnboardingAction {
  type: OnboardingActionTypes.RESET_ONBOARDING;
}

export type OnboardingAction =
  | SetFirstNameAction
  | SetLastNameAction
  | SetEmailAction
  | SetPasswordAction
  | SetInterestsAction
  | AddInterestAction
  | RemoveInterestAction
  | SetLocationAction
  | ToggleNotificationsAction
  | ToggleLocationSharingAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction
  | SetCurrentStepAction
  | SetCompletedAction
  | SubmitOnboardingRequestAction
  | SubmitOnboardingSuccessAction
  | SubmitOnboardingFailureAction
  | ResetOnboardingAction;

// Event state types
export interface EventFormState {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: string;
  category: string;
  image: string | null;
}

export interface EventState {
  form: EventFormState;
  events: Event[];
  status: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

// Event action types
export enum EventActionTypes {
  // Form field actions
  SET_TITLE = 'event/SET_TITLE',
  SET_DESCRIPTION = 'event/SET_DESCRIPTION',
  SET_LOCATION = 'event/SET_LOCATION',
  SET_DATE = 'event/SET_DATE',
  SET_TIME = 'event/SET_TIME',
  SET_PRICE = 'event/SET_PRICE',
  SET_CATEGORY = 'event/SET_CATEGORY',
  SET_IMAGE = 'event/SET_IMAGE',
  RESET_FORM = 'event/RESET_FORM',
  
  // API actions
  CREATE_EVENT_REQUEST = 'event/CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS = 'event/CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILURE = 'event/CREATE_EVENT_FAILURE',
  
  FETCH_EVENTS_REQUEST = 'event/FETCH_EVENTS_REQUEST',
  FETCH_EVENTS_SUCCESS = 'event/FETCH_EVENTS_SUCCESS',
  FETCH_EVENTS_FAILURE = 'event/FETCH_EVENTS_FAILURE',
  
  UPDATE_EVENT_REQUEST = 'event/UPDATE_EVENT_REQUEST',
  UPDATE_EVENT_SUCCESS = 'event/UPDATE_EVENT_SUCCESS',
  UPDATE_EVENT_FAILURE = 'event/UPDATE_EVENT_FAILURE',
  
  DELETE_EVENT_REQUEST = 'event/DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS = 'event/DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILURE = 'event/DELETE_EVENT_FAILURE',
}

// Event action interfaces
export interface SetTitleAction {
  type: EventActionTypes.SET_TITLE;
  payload: string;
}

export interface SetDescriptionAction {
  type: EventActionTypes.SET_DESCRIPTION;
  payload: string;
}

export interface SetEventLocationAction {
  type: EventActionTypes.SET_LOCATION;
  payload: string;
}

export interface SetDateAction {
  type: EventActionTypes.SET_DATE;
  payload: string;
}

export interface SetTimeAction {
  type: EventActionTypes.SET_TIME;
  payload: string;
}

export interface SetPriceAction {
  type: EventActionTypes.SET_PRICE;
  payload: string;
}

export interface SetCategoryAction {
  type: EventActionTypes.SET_CATEGORY;
  payload: string;
}

export interface SetImageAction {
  type: EventActionTypes.SET_IMAGE;
  payload: string | null;
}

export interface ResetFormAction {
  type: EventActionTypes.RESET_FORM;
}

export interface CreateEventRequestAction {
  type: EventActionTypes.CREATE_EVENT_REQUEST;
}

export interface CreateEventSuccessAction {
  type: EventActionTypes.CREATE_EVENT_SUCCESS;
  payload: Event;
}

export interface CreateEventFailureAction {
  type: EventActionTypes.CREATE_EVENT_FAILURE;
  payload: string;
}

export interface FetchEventsRequestAction {
  type: EventActionTypes.FETCH_EVENTS_REQUEST;
}

export interface FetchEventsSuccessAction {
  type: EventActionTypes.FETCH_EVENTS_SUCCESS;
  payload: Event[];
}

export interface FetchEventsFailureAction {
  type: EventActionTypes.FETCH_EVENTS_FAILURE;
  payload: string;
}

export interface UpdateEventRequestAction {
  type: EventActionTypes.UPDATE_EVENT_REQUEST;
}

export interface UpdateEventSuccessAction {
  type: EventActionTypes.UPDATE_EVENT_SUCCESS;
  payload: Event;
}

export interface UpdateEventFailureAction {
  type: EventActionTypes.UPDATE_EVENT_FAILURE;
  payload: string;
}

export interface DeleteEventRequestAction {
  type: EventActionTypes.DELETE_EVENT_REQUEST;
}

export interface DeleteEventSuccessAction {
  type: EventActionTypes.DELETE_EVENT_SUCCESS;
  payload: string; // event id
}

export interface DeleteEventFailureAction {
  type: EventActionTypes.DELETE_EVENT_FAILURE;
  payload: string;
}

export type EventAction =
  | SetTitleAction
  | SetDescriptionAction
  | SetEventLocationAction
  | SetDateAction
  | SetTimeAction
  | SetPriceAction
  | SetCategoryAction
  | SetImageAction
  | ResetFormAction
  | CreateEventRequestAction
  | CreateEventSuccessAction
  | CreateEventFailureAction
  | FetchEventsRequestAction
  | FetchEventsSuccessAction
  | FetchEventsFailureAction
  | UpdateEventRequestAction
  | UpdateEventSuccessAction
  | UpdateEventFailureAction
  | DeleteEventRequestAction
  | DeleteEventSuccessAction
  | DeleteEventFailureAction;

// Auth state types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Auth action types
export enum AuthActionTypes {
  // Status actions
  SET_LOADING = 'auth/SET_LOADING',
  SET_ERROR = 'auth/SET_ERROR',
  SET_USER = 'auth/SET_USER',
  
  // Login actions
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = 'auth/LOGIN_FAILURE',
  
  // Register actions
  REGISTER_REQUEST = 'auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS',
  REGISTER_FAILURE = 'auth/REGISTER_FAILURE',
  
  // Logout action
  LOGOUT = 'auth/LOGOUT',
  
  // Check auth actions
  CHECK_AUTH_REQUEST = 'auth/CHECK_AUTH_REQUEST',
  CHECK_AUTH_SUCCESS = 'auth/CHECK_AUTH_SUCCESS',
  CHECK_AUTH_FAILURE = 'auth/CHECK_AUTH_FAILURE',
}

// Auth action interfaces
export interface SetAuthLoadingAction {
  type: AuthActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetAuthErrorAction {
  type: AuthActionTypes.SET_ERROR;
  payload: string | null;
}

export interface SetUserAction {
  type: AuthActionTypes.SET_USER;
  payload: User | null;
}

export interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: User;
}

export interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

export interface RegisterRequestAction {
  type: AuthActionTypes.REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: User;
}

export interface RegisterFailureAction {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export interface CheckAuthRequestAction {
  type: AuthActionTypes.CHECK_AUTH_REQUEST;
}

export interface CheckAuthSuccessAction {
  type: AuthActionTypes.CHECK_AUTH_SUCCESS;
  payload: User;
}

export interface CheckAuthFailureAction {
  type: AuthActionTypes.CHECK_AUTH_FAILURE;
}

export type AuthAction =
  | SetAuthLoadingAction
  | SetAuthErrorAction
  | SetUserAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction
  | CheckAuthRequestAction
  | CheckAuthSuccessAction
  | CheckAuthFailureAction;

// Community state types
export interface CommunityFormData {
  name: string;
  description: string;
  location: string;
  category: string;
  guidelines?: string;
}

export interface CommunityState {
  form: CommunityFormData;
  communities: Community[];
  status: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

// Community action types
export enum CommunityActionTypes {
  // Form field actions
  SET_NAME = 'community/SET_NAME',
  SET_DESCRIPTION = 'community/SET_DESCRIPTION',
  SET_LOCATION = 'community/SET_LOCATION',
  SET_CATEGORY = 'community/SET_CATEGORY',
  SET_GUIDELINES = 'community/SET_GUIDELINES',
  RESET_FORM = 'community/RESET_FORM',
  
  // API actions
  CREATE_COMMUNITY_REQUEST = 'community/CREATE_COMMUNITY_REQUEST',
  CREATE_COMMUNITY_SUCCESS = 'community/CREATE_COMMUNITY_SUCCESS',
  CREATE_COMMUNITY_FAILURE = 'community/CREATE_COMMUNITY_FAILURE',
  
  FETCH_COMMUNITIES_REQUEST = 'community/FETCH_COMMUNITIES_REQUEST',
  FETCH_COMMUNITIES_SUCCESS = 'community/FETCH_COMMUNITIES_SUCCESS',
  FETCH_COMMUNITIES_FAILURE = 'community/FETCH_COMMUNITIES_FAILURE',
  
  JOIN_COMMUNITY_REQUEST = 'community/JOIN_COMMUNITY_REQUEST',
  JOIN_COMMUNITY_SUCCESS = 'community/JOIN_COMMUNITY_SUCCESS',
  JOIN_COMMUNITY_FAILURE = 'community/JOIN_COMMUNITY_FAILURE',
}

// Community action interfaces
export interface SetNameAction {
  type: CommunityActionTypes.SET_NAME;
  payload: string;
}

export interface SetCommunityDescriptionAction {
  type: CommunityActionTypes.SET_DESCRIPTION;
  payload: string;
}

export interface SetCommunityLocationAction {
  type: CommunityActionTypes.SET_LOCATION;
  payload: string;
}

export interface SetCommunityCategoryAction {
  type: CommunityActionTypes.SET_CATEGORY;
  payload: string;
}

export interface SetGuidelinesAction {
  type: CommunityActionTypes.SET_GUIDELINES;
  payload: string;
}

export interface ResetCommunityFormAction {
  type: CommunityActionTypes.RESET_FORM;
}

export interface CreateCommunityRequestAction {
  type: CommunityActionTypes.CREATE_COMMUNITY_REQUEST;
}

export interface CreateCommunitySuccessAction {
  type: CommunityActionTypes.CREATE_COMMUNITY_SUCCESS;
  payload: Community;
}

export interface CreateCommunityFailureAction {
  type: CommunityActionTypes.CREATE_COMMUNITY_FAILURE;
  payload: string;
}

export interface FetchCommunitiesRequestAction {
  type: CommunityActionTypes.FETCH_COMMUNITIES_REQUEST;
}

export interface FetchCommunitiesSuccessAction {
  type: CommunityActionTypes.FETCH_COMMUNITIES_SUCCESS;
  payload: Community[];
}

export interface FetchCommunitiesFailureAction {
  type: CommunityActionTypes.FETCH_COMMUNITIES_FAILURE;
  payload: string;
}

export interface JoinCommunityRequestAction {
  type: CommunityActionTypes.JOIN_COMMUNITY_REQUEST;
}

export interface JoinCommunitySuccessAction {
  type: CommunityActionTypes.JOIN_COMMUNITY_SUCCESS;
  payload: {
    communityId: string;
    joined: boolean;
  };
}

export interface JoinCommunityFailureAction {
  type: CommunityActionTypes.JOIN_COMMUNITY_FAILURE;
  payload: string;
}

export type CommunityAction =
  | SetNameAction
  | SetCommunityDescriptionAction
  | SetCommunityLocationAction
  | SetCommunityCategoryAction
  | SetGuidelinesAction
  | ResetCommunityFormAction
  | CreateCommunityRequestAction
  | CreateCommunitySuccessAction
  | CreateCommunityFailureAction
  | FetchCommunitiesRequestAction
  | FetchCommunitiesSuccessAction
  | FetchCommunitiesFailureAction
  | JoinCommunityRequestAction
  | JoinCommunitySuccessAction
  | JoinCommunityFailureAction;

// Root state type
export interface RootState {
  onboarding: UserOnboardingState;
  event: EventState;
  auth: AuthState;
  community: CommunityState;
}