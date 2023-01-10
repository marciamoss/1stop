import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchSongs } from '../thunks/fetchSongs';
const initialState = {
  isLoading: false,
  loadingError: false,
  songTitle: '', 
  songsList: [],
  noSongsFound: false
}
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong(state, action) {
        state.songTitle = action.payload;
        state.songsList = [];
        state.noSongsFound = false;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchSongs.pending, (state, action) => {
      console.log('fetchSongs.pending');
      return { ...state, ...{isLoading: true, loadingError: false}};
    });
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
        console.log('fetchSongs.fulfilled');
        return { ...state, ...action.payload, ...{isLoading: false, loadingError: false}};
    });
    builder.addCase(fetchSongs.rejected, (state, action) => {
      console.log('fetchSongs.rejected');
      return { ...state, ...{isLoading: false, loadingError: true}};
    });
    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const { setSong } = songSlice.actions;
export const songReducer = songSlice.reducer;
