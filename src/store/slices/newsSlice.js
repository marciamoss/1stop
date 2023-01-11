import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchNews } from '../thunks/fetchNews';
const initialState = {
    newsList: [],
    section: '',
    isLoading: false,
    loadingError: false,
};
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsSection(state, action) {
        state.section = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNews.pending, (state, action) => {
      console.log('fetchNews.pending');
      return { ...state, ...{isLoading: true, loadingError: false}};
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
        console.log('fetchNews.fulfilled');
        return { ...state, ...action.payload, ...{isLoading: false, loadingError: false}};
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      console.log('fetchNews.rejected');
      return { ...state, ...{isLoading: false, loadingError: true}};
    });
    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const { setNewsSection } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
