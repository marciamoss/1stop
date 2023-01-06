import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  authInfo,
} from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export { store, authInfo };
export * from './thunks/authChange';