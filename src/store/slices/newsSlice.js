import { createSlice } from "@reduxjs/toolkit";
import { authInfo } from "./authSlice";
import {
  fetchNews,
  saveNews,
  removeNews,
  fetchUserNews,
} from "../thunks/newsApis";
const initialState = {
  isLoading: false,
  loadingError: false,
  loadingSavedNewsError: false,
  section: "",
  newsList: [],
  noNewsFound: false,
  savedNews: [],
  savedUri: "",
  actionFailedId: "",
};
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsSection(state, action) {
      state.section = action.payload;
      state.noNewsFound = false;
    },
    resetNewsSaveSuccess(state, action) {
      state.savedUri = "";
      if (!state.actionFailedId) {
        state.newsList = state.newsList.filter((s) => s.uri !== action.payload);
      }
      state.actionFailedId = "";
      if (state.newsList.length === 0) {
        state.section = "";
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNews.pending, (state, action) => {
      return { ...state, ...{ isLoading: true, loadingError: false } };
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...{ isLoading: false, loadingError: false },
      };
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      return { ...state, ...{ isLoading: false, loadingError: true } };
    });

    builder.addCase(saveNews.pending, (state, action) => {
      state.savedUri = "";
      state.actionFailedId = "";
    });
    builder.addCase(saveNews.fulfilled, (state, action) => {
      if (action.payload.news) {
        state.savedNews.push(action.payload.news);
        state.savedUri = action.payload.news.uri;
        state.actionFailedId = "";
      }
    });
    builder.addCase(saveNews.rejected, (state, action) => {
      state.savedUri = "";
      state.actionFailedId = action?.meta?.arg?.uri;
    });

    builder.addCase(removeNews.pending, (state, action) => {
      state.actionFailedId = "";
    });
    builder.addCase(removeNews.fulfilled, (state, action) => {
      state.actionFailedId = "";
      state.savedNews = state.savedNews.filter(
        (s) => s.uri !== action.payload.news.uri
      );
    });
    builder.addCase(removeNews.rejected, (state, action) => {
      state.actionFailedId = action?.meta?.arg?.uri;
    });

    builder.addCase(fetchUserNews.pending, (state, action) => {
      return { ...state, ...{ loadingSavedNewsError: false } };
    });
    builder.addCase(fetchUserNews.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...{ loadingSavedNewsError: false },
      };
    });
    builder.addCase(fetchUserNews.rejected, (state, action) => {
      return { ...state, ...{ loadingSavedNewsError: true } };
    });

    builder.addCase(authInfo, (state, action) => {
      if (!action.payload.signedIn) {
        return initialState;
      }
    });
  },
});

export const { setNewsSection, resetNewsSaveSuccess } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
