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
      album: {name: element.album.name, url: element.album?.external_urls?.spotify},
      preview_url
    });
  });
  const noSongsFound = songsList.length === 0 ? true : false;
  return {songsList, noSongsFound};
});
  
export { fetchSongs };