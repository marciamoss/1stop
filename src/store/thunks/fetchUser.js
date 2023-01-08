import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");

const BASE_URL = keys.mongo.api;
const fetchUser = createAsyncThunk('users/fetch', async (userId) => {
    console.log('BASE_URL', `${BASE_URL}/user/${userId}`);
    const userExists = await axios.get(`${BASE_URL}/user/${userId}`);
    if((userExists?.data?.result).length) {
      return {userId, newUser: false};
    }
    return {userId: '', newUser: true};
  });
  
  export { fetchUser };