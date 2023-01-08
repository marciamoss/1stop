import { createSlice } from '@reduxjs/toolkit';
import { addUser } from '../thunks/addUser';
import { fetchUser } from '../thunks/fetchUser';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      userId: '',
      newUser: false
    }
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log('in addUser fulfilled', action.payload);
      state.data.userId = action.payload.userId;
    });
    builder.addCase(addUser.rejected, (state, action) => {
        console.log('in addUser rejected');
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log('in fetchUser fulfilled', action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
        console.log('in fetchUser rejected');
    });
  },
});

export const userReducer = userSlice.reducer;
