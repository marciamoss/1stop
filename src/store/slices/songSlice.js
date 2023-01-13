import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchSongs, saveSong, fetchUserSongs } from '../thunks/songApis';

const initialState = {
  isLoading: false,
  loadingError: false,
  songTitle: '', 
  songsList: [],
  noSongsFound: false,
  savedSongs: []
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
    builder.addCase(saveSong.pending, (state, action) => {
      console.log('saveSong.pending');
    });
    builder.addCase(saveSong.fulfilled, (state, action) => {
        console.log('saveSong.fulfilled');
        if(action.payload.song) {
          state.savedSongs.push(action.payload.song);
        }
    });
    builder.addCase(saveSong.rejected, (state, action) => {
      console.log('saveSong.rejected');
    });
    builder.addCase(fetchUserSongs.pending, (state, action) => {
      console.log('fetchUserSongs.pending');
    });
    builder.addCase(fetchUserSongs.fulfilled, (state, action) => {
        console.log('fetchUserSongs.fulfilled');
        return { ...state, ...action.payload };
    });
    builder.addCase(fetchUserSongs.rejected, (state, action) => {
      console.log('fetchUserSongs.rejected');
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
