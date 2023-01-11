import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");

const fetchNews = createAsyncThunk('news/fetch', async (section) => {
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section.toLowerCase().replace(/\s+/g, '')}.json?api-key=${keys.nyt.apiKey}`);
    let newsList = response?.data?.results.filter(n => n.title !== '' && n.short_url !== '');
    return {newsList}
});
  
export { fetchNews };