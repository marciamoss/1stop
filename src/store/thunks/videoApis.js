import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");
const BASE_URL = keys.mongo.api;

const fetchVideos = createAsyncThunk('video/fetch', async (videoTitle) => {
    let videosList = [];
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${videoTitle}&type=video&videoEmbeddable=true&key=${keys.video.apiKey}`);
 
    response?.data?.items.forEach(element => {
        if(element.id.videoId) { 
        videosList.push({
            id: element.id.videoId,
            title: element.snippet.title,
            description: element.snippet.description
        })}
    });
    
    const noVideosFound = videosList.length === 0 ? true : false;
    return {videosList, noVideosFound};
});

const saveVideo = createAsyncThunk('videos/add', async (video) => {
    const response = await axios.post(`${BASE_URL}/videos/save`, {video});
    if(response.data.message === "Successfully saved video"){
      return {video};
    }
});
  
const removeVideo = createAsyncThunk('videos/remove', async (video) => {
    const response = await axios.post(`${BASE_URL}/videos/remove`, {video});
    if(response.data.message === "Successfully removed video"){
      return {video};
    }
});
  
const fetchUserVideos = createAsyncThunk('videos/fetchUserVideos', async (userId) => {
    const response = await axios.get(`${BASE_URL}/videos/${userId}`);
    return ({savedVideos: response.data.result});
});
export { fetchVideos, saveVideo, removeVideo, fetchUserVideos };
