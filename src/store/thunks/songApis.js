import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
const keys = require("../../keys.js");

const BASE_URL = keys.mongo.api;

const fetchSongs = createAsyncThunk('song/fetch', async (songTitle) => {
  const songName = (songTitle).split(' ').join("+");
  const songsList = [];
  const response = await axios.post(`${BASE_URL}/music`, {songName});
  response.data.result.tracks.items.forEach(element => {
    let preview_url;
    if(element.preview_url === null) {
      preview_url = element.external_urls.spotify;
    } else {
      preview_url = element.preview_url;
    }
    let artists='';
    element.album.artists.forEach((a, index) => {
      artists = artists ? `${artists}, ${a.name}` : a.name;
    })
    songsList.push({
      id: element.id,
      artists,
      name: element.name,
      album: {name: element.album.name, url: element.album?.external_urls?.spotify, albumImage: element.album?.images[0]?.url},
      preview_url
    });
  });
  const noSongsFound = songsList.length === 0 ? true : false;
  return {songsList, noSongsFound};
});

const saveSong = createAsyncThunk('song/add', async (song) => {
  const response = await axios.post(`${BASE_URL}/music/save`, {song});
  if(response.data.message === "Successfully saved song"){
    return {song};
  }
});

const removeSong = createAsyncThunk('song/remove', async (song) => {
  const response = await axios.post(`${BASE_URL}/music/remove`, {song});
  if(response.data.message === "Successfully removed song"){
    return {song};
  }
});

const fetchUserSongs = createAsyncThunk('song/fetchUserSongs', async (userId) => {
  const response = await axios.get(`${BASE_URL}/music/${userId}`);
  return ({savedSongs: response.data.result});
});
  
export { fetchSongs, saveSong, removeSong, fetchUserSongs };