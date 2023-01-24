import { createSlice } from '@reduxjs/toolkit';
import { authInfo } from './authSlice';
import { fetchVideos, saveVideo, removeVideo, fetchUserVideos } from '../thunks/videoApis';

const initialState = {
  isLoading: false,
  loadingError: false,
  videoTitle: '', 
  videosList: [],
  noVideosFound: false,
  savedVideos: [],
  savedId: ''
}
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo(state, action) {
        state.videoTitle = action.payload;
        state.videosList = [];
        state.noVideosFound = false;
    },
    resetVideoSaveSuccess(state, action) {
      state.savedId = '';
      state.videosList = state.videosList.filter(s => s.id !== action.payload);
      if(state.videosList.length === 0){
        state.videoTitle='';
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchVideos.pending, (state, action) => {
      return { ...state, ...{isLoading: true, loadingError: false}};
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
        return { ...state, ...action.payload, ...{isLoading: false, loadingError: false}};
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      return { ...state, ...{isLoading: false, loadingError: true}};
    });

    builder.addCase(saveVideo.pending, (state, action) => {
      state.savedId = '';
    });
    builder.addCase(saveVideo.fulfilled, (state, action) => {
      if(action.payload.video) {
        state.savedVideos.push(action.payload.video);
        state.savedId = action.payload.video.id;
      }
    });
    builder.addCase(saveVideo.rejected, (state, action) => {
      state.savedId = '';
    });

    builder.addCase(removeVideo.pending, (state, action) => {
    });
    builder.addCase(removeVideo.fulfilled, (state, action) => {
      state.savedVideos = state.savedVideos.filter(s => s.id !== action.payload.video.id);
    });
    builder.addCase(removeVideo.rejected, (state, action) => {
    });

    builder.addCase(fetchUserVideos.pending, (state, action) => {
    });
    builder.addCase(fetchUserVideos.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
    });
    builder.addCase(fetchUserVideos.rejected, (state, action) => {
    });

    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const { setVideo, resetVideoSaveSuccess } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
