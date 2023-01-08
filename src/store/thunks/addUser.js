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

export { addUser };
