import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signedIn: false,
  authUserId: null,
  userName: null,
  showError: false,
  errorMessage: null,
  validRoute: false,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authInfo(state, action) {
      return { ...state, ...action.payload };
    },
    validRoute(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { authInfo, validRoute } = authSlice.actions;
export const authReducer = authSlice.reducer;
