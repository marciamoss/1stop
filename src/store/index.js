import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  authInfo,
} from './slices/authSlice';
import { userReducer } from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

  },
});

export { store, authInfo };
export * from './thunks/authChange';
export * from './thunks/addUser';
