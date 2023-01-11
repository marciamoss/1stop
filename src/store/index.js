import { configureStore } from '@reduxjs/toolkit';
import { authReducer, authInfo } from './slices/authSlice';
import { userReducer } from './slices/userSlice';
import { songReducer, setSong } from './slices/songSlice';
import { newsReducer, setNewsSection } from './slices/newsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    song: songReducer,
    news: newsReducer
  },
});

export { store, authInfo, setSong, setNewsSection };
export * from './thunks/authChange';
export * from './thunks/addUser';
export * from './thunks/fetchUser';
export * from './thunks/fetchSongs';
export * from './thunks/fetchNews';


