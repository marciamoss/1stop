import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");

const BASE_URL = keys.mongo.api;

const addUser = createAsyncThunk('users/add', async (userId) => {
  await axios.post(`${BASE_URL}/user`, {
      userId: userId,
  })
  return {userId: userId};
});

const fetchUser = createAsyncThunk('users/fetch', async (userId) => {
  const userExists = await axios.get(`${BASE_URL}/user/${userId}`);
  if((userExists?.data?.result).length) {
    return {userId, newUser: false};
  }
  return {userId: '', newUser: true};
});

export { addUser, fetchUser };
