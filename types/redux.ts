// Event interaction types
export enum EventInteractionActionTypes {
  TOGGLE_LIKE = 'eventInteraction/TOGGLE_LIKE',
  TOGGLE_PARTICIPATION = 'eventInteraction/TOGGLE_PARTICIPATION',
  SET_LOADING = 'eventInteraction/SET_LOADING',
  SET_ERROR = 'eventInteraction/SET_ERROR'
}

export interface EventInteractionState {
  likedEvents: string[];
  participatingEvents: string[];
  status: {
    loading: boolean;
    error: string | null;
  };
}

// Event interaction action interfaces
export interface ToggleLikeAction {
  type: EventInteractionActionTypes.TOGGLE_LIKE;
  payload: string;
}

export interface ToggleParticipationAction {
  type: EventInteractionActionTypes.TOGGLE_PARTICIPATION;
  payload: string;
}

export interface SetLoadingAction {
  type: EventInteractionActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: EventInteractionActionTypes.SET_ERROR;
  payload: string | null;
}

export type EventInteractionAction =
  | ToggleLikeAction
  | ToggleParticipationAction
  | SetLoadingAction
  | SetErrorAction;

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
  DELETE_EVENT_FAILURE = 'event/DELETE_EVENT_FAILURE'
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
  payload: string;
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

// Onboarding types
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
    currentStep: number;
  };
}

export enum OnboardingActionTypes {
  // Personal info actions
  SET_FIRST_NAME = 'onboarding/SET_FIRST_NAME',
  SET_LAST_NAME = 'onboarding/SET_LAST_NAME',
  
  // Account info actions
  SET_EMAIL = 'onboarding/SET_EMAIL',
  SET_PASSWORD = 'onboarding/SET_PASSWORD',
  
  // Preferences actions
  SET_INTERESTS = 'onboarding/SET_INTERESTS',
  SET_LOCATION = 'onboarding/SET_LOCATION',
  TOGGLE_NOTIFICATIONS = 'onboarding/TOGGLE_NOTIFICATIONS',
  TOGGLE_LOCATION_SHARING = 'onboarding/TOGGLE_LOCATION_SHARING',
  
  // Status actions
  SET_CURRENT_STEP = 'onboarding/SET_CURRENT_STEP',
  RESET_ONBOARDING = 'onboarding/RESET_ONBOARDING'
}

// Onboarding action interfaces
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

export interface SetCurrentStepAction {
  type: OnboardingActionTypes.SET_CURRENT_STEP;
  payload: number;
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
  | SetLocationAction
  | ToggleNotificationsAction
  | ToggleLocationSharingAction
  | SetCurrentStepAction
  | ResetOnboardingAction;

// Root state type
export interface RootState {
  onboarding: UserOnboardingState;
  event: EventState;
  auth: AuthState;
  community: CommunityState;
  eventInteraction: EventInteractionState;
}