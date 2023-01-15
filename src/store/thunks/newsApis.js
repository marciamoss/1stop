import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");

const BASE_URL = keys.mongo.api;

const fetchNews = createAsyncThunk('news/fetch', async (section) => {
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section.toLowerCase().replace(/\s+/g, '')}.json?api-key=${keys.nyt.apiKey}`);
    let newsList = response?.data?.results.filter(n => n.title !== '' && n.short_url !== '');
    return {newsList}
});

const saveNews = createAsyncThunk('news/add', async (news) => {
    const response = await axios.post(`${BASE_URL}/news/save`, {news});
    if(response.data.message === "Successfully saved news"){
      return {news};
    }
  });
  
  const removeNews = createAsyncThunk('news/remove', async (news) => {
    const response = await axios.post(`${BASE_URL}/news/remove`, {news});
    if(response.data.message === "Successfully removed news"){
      return {news};
    }
  });
  
  const fetchUserNews = createAsyncThunk('news/fetchUserNews', async (userId) => {
    const response = await axios.get(`${BASE_URL}/news/${userId}`);
    return ({savedNews: response.data.result});
  });
  
export { fetchNews, saveNews, removeNews, fetchUserNews };
