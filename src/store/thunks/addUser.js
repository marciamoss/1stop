import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async (userId) => {
  // const usersList = await axios.get('https://vercel-json.vercel.app/users_1Stop');
  const usersList = await axios.get('http://localhost:3005/users_1Stop');
  const userExists = (usersList.data.filter(r => r.userId===userId));
  if(!userExists.length) {
    // const response = await axios.post('https://vercel-json.vercel.app/users_1Stop', {
    const response = await axios.post('http://localhost:3005/users_1Stop', {
      userId: userId,
    });
    return response.data;
  }
  return userExists;
  
});

export { addUser };
