import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      signedIn: false,
      userId: null,
      userName: null,
      showError: false,
      errorMessage: null
    }
  },
  reducers: {
    authInfo(state, action) {
      state.data = {
        signedIn: action.payload.signedIn,
        userId: action.payload.userId,
        userName: action.payload.userName,
        showError: action.payload.showError,
        errorMessage: action.payload.errorMessage
      };
    }
  }
});

export const { authInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;

