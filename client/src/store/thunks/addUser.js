import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_VERCEL_URL
  ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
  : 'http://localhost:9000/api';

const addUser = createAsyncThunk('users/add', async (userId) => {
  const userExists = await axios.get(`${BASE_URL}/user/${userId}`);
  if(!(userExists?.data?.result).length) {
    const response = await axios.post(`${BASE_URL}/user`, {
      userId: userId,
    });
    return {userId: response.data.result.userId, newUser: true};
  }
  return {userId, newUser: false};
});

export { addUser };
