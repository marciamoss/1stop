import { createSlice } from "@reduxjs/toolkit";
import { authInfo } from "./authSlice";
import { saveMovie, removeMovie, fetchUserMovies } from "../thunks/movieApis";

const initialState = {
  isLoading: false,
  loadingError: false,
  loadingSavedMoviesError: false,
  movieTitle: "",
  moviesList: [],
  noMoviesFound: false,
  savedMovies: [],
  savedId: "",
  actionFailedId: "",
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMovies(state, action) {
      return { ...state, ...action.payload };
    },
    setMovie(state, action) {
      state.movieTitle = action.payload;
      state.moviesList = [];
      state.noMoviesFound = false;
    },
    resetMovieSaveSuccess(state, action) {
      state.savedId = "";
      if (!state.actionFailedId) {
        state.moviesList = state.moviesList.filter(
          (s) => s.id !== action.payload
        );
      }
      state.actionFailedId = "";
      if (state.moviesList.length === 0) {
        state.movieTitle = "";
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(saveMovie.pending, (state, action) => {
      state.savedId = "";
      state.actionFailedId = "";
    });
    builder.addCase(saveMovie.fulfilled, (state, action) => {
      if (action.payload.movie) {
        state.savedMovies.push(action.payload.movie);
        state.savedId = action.payload.movie.id;
        state.actionFailedId = "";
      }
    });
    builder.addCase(saveMovie.rejected, (state, action) => {
      state.savedId = "";
      state.actionFailedId = action?.meta?.arg?.id;
    });

    builder.addCase(removeMovie.pending, (state, action) => {
      state.actionFailedId = "";
    });
    builder.addCase(removeMovie.fulfilled, (state, action) => {
      state.actionFailedId = "";
      state.savedMovies = state.savedMovies.filter(
        (s) => s.id !== action.payload.movie.id
      );
    });
    builder.addCase(removeMovie.rejected, (state, action) => {
      state.actionFailedId = action?.meta?.arg?.id;
    });

    builder.addCase(fetchUserMovies.pending, (state, action) => {
      return { ...state, ...{ loadingSavedMoviesError: false } };
    });
    builder.addCase(fetchUserMovies.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...{ loadingSavedMoviesError: false },
      };
    });
    builder.addCase(fetchUserMovies.rejected, (state, action) => {
      return { ...state, ...{ loadingSavedMoviesError: true } };
    });

    builder.addCase(authInfo, (state, action) => {
      if (!action.payload.signedIn) {
        return initialState;
      }
    });
  },
});

export const { setMovie, fetchMovies, resetMovieSaveSuccess } =
  movieSlice.actions;
export const movieReducer = movieSlice.reducer;
