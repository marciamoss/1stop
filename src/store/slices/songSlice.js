import { createSlice } from "@reduxjs/toolkit";
import { authInfo } from "./authSlice";
import {
  fetchSongs,
  saveSong,
  removeSong,
  fetchUserSongs,
} from "../thunks/songApis";

const initialState = {
  isLoading: false,
  loadingError: false,
  loadingSavedSongsError: false,
  songTitle: "",
  songsList: [],
  noSongsFound: false,
  savedSongs: [],
  savedId: "",
  actionFailedId: "",
};
const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong(state, action) {
      state.songTitle = action.payload;
      state.songsList = [];
      state.noSongsFound = false;
    },
    resetSaveSuccess(state, action) {
      state.savedId = "";
      if (!state.actionFailedId) {
        state.songsList = state.songsList.filter(
          (s) => s.id !== action.payload
        );
      }
      state.actionFailedId = "";
      if (state.songsList.length === 0) {
        state.songTitle = "";
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSongs.pending, (state, action) => {
      return { ...state, ...{ isLoading: true, loadingError: false } };
    });
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...{ isLoading: false, loadingError: false },
      };
    });
    builder.addCase(fetchSongs.rejected, (state, action) => {
      return { ...state, ...{ isLoading: false, loadingError: true } };
    });

    builder.addCase(saveSong.pending, (state, action) => {
      state.savedId = "";
      state.actionFailedId = "";
    });
    builder.addCase(saveSong.fulfilled, (state, action) => {
      if (action.payload.song) {
        state.savedSongs.push(action.payload.song);
        state.savedId = action.payload.song.id;
        state.actionFailedId = "";
      }
    });
    builder.addCase(saveSong.rejected, (state, action) => {
      state.savedId = "";
      state.actionFailedId = action?.meta?.arg?.id;
    });

    builder.addCase(removeSong.pending, (state, action) => {
      state.actionFailedId = "";
    });
    builder.addCase(removeSong.fulfilled, (state, action) => {
      state.actionFailedId = "";
      state.savedSongs = state.savedSongs.filter(
        (s) => s.id !== action.payload.song.id
      );
    });
    builder.addCase(removeSong.rejected, (state, action) => {
      state.actionFailedId = action?.meta?.arg?.id;
    });

    builder.addCase(fetchUserSongs.pending, (state, action) => {
      return { ...state, ...{ loadingSavedSongsError: false } };
    });
    builder.addCase(fetchUserSongs.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...{ loadingSavedSongsError: false },
      };
    });
    builder.addCase(fetchUserSongs.rejected, (state, action) => {
      return { ...state, ...{ loadingSavedSongsError: true } };
    });

    builder.addCase(authInfo, (state, action) => {
      if (!action.payload.signedIn) {
        return initialState;
      }
    });
  },
});

export const { setSong, resetSaveSuccess } = songSlice.actions;
export const songReducer = songSlice.reducer;
