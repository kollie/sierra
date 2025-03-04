import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { onboardingReducer } from './onboarding/reducer';
import { eventReducer } from './event/reducer';
import { authReducer } from './auth/reducer';
import { communityReducer } from './community/reducer';
import { RootState } from '@/types/redux';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    event: eventReducer,
    auth: authReducer,
    community: communityReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
});

// Export types for dispatch and selector hooks
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;