import { createSlice } from '@reduxjs/toolkit';
import { addUser } from '../thunks/addUser';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log('User Added', action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
        console.log('in rejected user add failed');
    });
  },
});

export const userReducer = userSlice.reducer;
