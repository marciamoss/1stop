import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { saveMovie, removeMovie, fetchUserMovies } from '../thunks/movieApis';

const initialState = {
  isLoading: false,
  loadingError: false,
  movieTitle: '', 
  moviesList: [],
  noMoviesFound: false,
  savedMovies: [],
  savedId: ''
}
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    fetchMovies(state, action) {
      return { ...state, ...action.payload};
    },
    setMovie(state, action) {
        state.movieTitle = action.payload;
        state.moviesList = [];
        state.noMoviesFound = false;
    },
    resetMovieSaveSuccess(state, action) {
      state.savedId = '';
      state.moviesList = state.moviesList.filter(s => s.id !== action.payload);
      if(state.moviesList.length === 0){
        state.movieTitle='';
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(saveMovie.pending, (state, action) => {
      state.savedId = '';
    });
    builder.addCase(saveMovie.fulfilled, (state, action) => {
      if(action.payload.movie) {
        state.savedMovies.push(action.payload.movie);
        state.savedId = action.payload.movie.id;
      }
    });
    builder.addCase(saveMovie.rejected, (state, action) => {
      state.savedId = '';
    });

    builder.addCase(removeMovie.pending, (state, action) => {
    });
    builder.addCase(removeMovie.fulfilled, (state, action) => {
      state.savedMovies = state.savedMovies.filter(s => s.id !== action.payload.movie.id);
    });
    builder.addCase(removeMovie.rejected, (state, action) => {
    });

    builder.addCase(fetchUserMovies.pending, (state, action) => {
    });
    builder.addCase(fetchUserMovies.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
    });
    builder.addCase(fetchUserMovies.rejected, (state, action) => {
    });

    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const { setMovie, fetchMovies, resetMovieSaveSuccess } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
