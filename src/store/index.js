import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authInfo, validRoute } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { songReducer, setSong, resetSaveSuccess } from "./slices/songSlice";
import {
  newsReducer,
  setNewsSection,
  resetNewsSaveSuccess,
} from "./slices/newsSlice";
import {
  movieReducer,
  setMovie,
  fetchMovies,
  resetMovieSaveSuccess,
} from "./slices/movieSlice";
import {
  videoReducer,
  setVideo,
  resetVideoSaveSuccess,
} from "./slices/videoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    song: songReducer,
    news: newsReducer,
    movie: movieReducer,
    video: videoReducer,
  },
});

export {
  store,
  authInfo,
  validRoute,
  setSong,
  resetSaveSuccess,
  resetNewsSaveSuccess,
  setNewsSection,
  setMovie,
  fetchMovies,
  resetMovieSaveSuccess,
  setVideo,
  resetVideoSaveSuccess,
};
export * from "./thunks/authChange";
export * from "./thunks/userApis";
export * from "./thunks/songApis";
export * from "./thunks/newsApis";
export * from "./thunks/movieApis";
export * from "./thunks/videoApis";
