import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchNews, saveNews, removeNews, fetchUserNews } from '../thunks/newsApis';
const initialState = {
  isLoading: false,
  loadingError: false,
  section: '',
  newsList: [],
  noNewsFound: false,
  savedNews: [],
  savedUri: ''
};
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsSection(state, action) {
        state.section = action.payload;
        state.noNewsFound = false;
    },
    resetNewsSaveSuccess(state, action) {
      state.savedUri = '';
      state.newsList = state.newsList.filter(s => s.uri !== action.payload);
      if(state.newsList.length === 0){
        state.section='';
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNews.pending, (state, action) => {
      return { ...state, ...{isLoading: true, loadingError: false}};
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
        return { ...state, ...action.payload, ...{isLoading: false, loadingError: false}};
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      return { ...state, ...{isLoading: false, loadingError: true}};
    });

    builder.addCase(saveNews.pending, (state, action) => {
      state.savedUri = '';
    });
    builder.addCase(saveNews.fulfilled, (state, action) => {
      if(action.payload.news) {
        state.savedNews.push(action.payload.news);
        state.savedUri = action.payload.news.uri;
      }
    });
    builder.addCase(saveNews.rejected, (state, action) => {
      state.savedUri = '';
    });

    builder.addCase(removeNews.pending, (state, action) => {
    });
    builder.addCase(removeNews.fulfilled, (state, action) => {
      state.savedNews = state.savedNews.filter(s => s.uri !== action.payload.news.uri);
    });
    builder.addCase(removeNews.rejected, (state, action) => {
    });

    builder.addCase(fetchUserNews.pending, (state, action) => {
    });
    builder.addCase(fetchUserNews.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
    });
    builder.addCase(fetchUserNews.rejected, (state, action) => {
    });

    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const { setNewsSection, resetNewsSaveSuccess } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
