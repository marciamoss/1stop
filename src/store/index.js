import { configureStore } from '@reduxjs/toolkit';
import { authReducer, authInfo } from './slices/authSlice';
import { userReducer } from './slices/userSlice';
import { songReducer, setSong } from './slices/songSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    song: songReducer
  },
});

export { store, authInfo, setSong };
export * from './thunks/authChange';
export * from './thunks/addUser';
export * from './thunks/fetchUser';
export * from './thunks/fetchSongs';

