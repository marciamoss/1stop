import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchSongs, saveSong, fetchUserSongs } from '../thunks/songApis';

const initialState = {
  isLoading: false,
  loadingError: false,
  songTitle: '', 
  songsList: [],
  noSongsFound: false,
  savedSongs: [],
  savedId: ''
}
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong(state, action) {
        state.songTitle = action.payload;
        state.songsList = [];
        state.noSongsFound = false;
    },
    resetSaveSuccess(state, action) {
      state.savedId = '';
      state.songsList = state.songsList.filter(s => s.id !== action.payload);
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
      state.savedId = '';
    });
    builder.addCase(saveSong.fulfilled, (state, action) => {
      console.log('saveSong.fulfilled');
      if(action.payload.song) {
        state.savedSongs.push(action.payload.song);
        state.savedId = action.payload.song.id;
      }
    });
    builder.addCase(saveSong.rejected, (state, action) => {
      console.log('saveSong.rejected');
      state.savedId = '';
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

export const { setSong, resetSaveSuccess } = songSlice.actions;
export const songReducer = songSlice.reducer;
