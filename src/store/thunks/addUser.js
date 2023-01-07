import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async (userId) => {
  const usersList = await axios.get('http://localhost:3005/users');
  const userExists = (usersList.data.filter(r => r.userId===userId)).length>0;
  if(!userExists) {
    const response = await axios.post('http://localhost:3005/users', {
      userId: userId,
    });
    return response.data;
  }
  return 'user exists';
  
});

export { addUser };
