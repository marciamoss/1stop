import { createSlice } from '@reduxjs/toolkit';
import { addUser, fetchUser } from '../thunks/userApis';
import { authInfo } from './authSlice';
const initialState = {
  userId: '',
  newUser: false,
  songs: [],
  news: []
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
    });
    builder.addCase(addUser.rejected, (state, action) => {
        state.userId = '';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return { ...state, ...action.payload};
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
    });
    builder.addCase(authInfo, (state, action) => {
      if(!(action.payload.signedIn)) {
        return initialState;
      }
    });
  },
});

export const userReducer = userSlice.reducer;
