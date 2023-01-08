import { createSlice } from '@reduxjs/toolkit';
import { addUser } from '../thunks/addUser';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      userId: null
    }
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.data.userId = action.payload.userId;
      console.log(`${state.data.userId} Add complete. New User: ${action.payload.newUser}`);
    });
    builder.addCase(addUser.rejected, (state, action) => {
        console.log('in rejected user add failed');
    });
  },
});

export const userReducer = userSlice.reducer;
