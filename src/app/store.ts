import { configureStore } from '@reduxjs/toolkit';
import authFormReducer from '../features/authForm/authFormSlice';

export const store = configureStore({
  reducer: authFormReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
