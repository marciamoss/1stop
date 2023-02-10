import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  signedIn: false,
  authUserId: null,
  userName: null,
  showError: false,
  errorMessage: null,
  validRoute: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInfo(state, action) {
      return { ...state, ...action.payload};
    }
  }
});

export const { authInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;

