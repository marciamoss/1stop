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
      console.log('saveMovie.pending');
      state.savedId = '';
    });
    builder.addCase(saveMovie.fulfilled, (state, action) => {
      console.log('saveMovie.fulfilled');
      if(action.payload.movie) {
        state.savedMovies.push(action.payload.movie);
        state.savedId = action.payload.movie.id;
      }
    });
    builder.addCase(saveMovie.rejected, (state, action) => {
      console.log('saveMovie.rejected');
      state.savedId = '';
    });

    builder.addCase(removeMovie.pending, (state, action) => {
      console.log('removeMovie.pending');
    });
    builder.addCase(removeMovie.fulfilled, (state, action) => {
      console.log('removeMovie.fulfilled');
      state.savedMovies = state.savedMovies.filter(s => s.id !== action.payload.movie.id);
    });
    builder.addCase(removeMovie.rejected, (state, action) => {
      console.log('removeMovie.rejected');
    });

    builder.addCase(fetchUserMovies.pending, (state, action) => {
      console.log('fetchUserMovies.pending');
    });
    builder.addCase(fetchUserMovies.fulfilled, (state, action) => {
        console.log('fetchUserMovies.fulfilled');
        return { ...state, ...action.payload };
    });
    builder.addCase(fetchUserMovies.rejected, (state, action) => {
      console.log('fetchUserMovies.rejected');
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
