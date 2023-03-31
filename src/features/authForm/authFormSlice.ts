import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormState } from '../../types/AuthFormState';
import { Error } from '../../types/Error';

const initialState: AuthFormState = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
  activeField: 'sign in',
  error: Error.NONE,
  isRegistered: false,
  isLoading: false,
};

export const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setInputValue: (
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) => {
      const { name, value } = action.payload;

      state[name] = value;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsRegistered: (state, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload;
    },
    setActiveField: (state, action: PayloadAction<string>) => {
      state.activeField = action.payload;
    },
  },
});

export default authFormSlice.reducer;

export const { actions } = authFormSlice;
