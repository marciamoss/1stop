import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const keys = require("../../keys.js");
const BASE_URL = keys.mongo.api;

const searchMovie = (movieTitle, fetchMovies) => async (dispatch) => {
  dispatch(fetchMovies({isLoading: true, loadingError: false}));
  let moviesList = [];
  let moviesList1 = [];
  let moviesList2 = [];
  let details = [];

  let response = await axios.request({
    method: 'GET',
    url: keys.movie.url,
    params: {q: movieTitle},
    headers: keys.imdb
  });

  let moviesFiltered = (response?.data?.results?.filter(m => m.titleType === "movie"))?.slice(0,4);
  moviesFiltered?.forEach(m=>{
    let cast = '';
    m?.principals?.forEach((p,index) => cast = index === 0 ? p?.name : `${cast}, ${p?.name}`);
    cast = cast === '' ? 'unavailable' : cast;
    moviesList1.push({cast, id: m.id})
  })
  let noMoviesFound = !moviesFiltered ? true : false;
  dispatch(fetchMovies({moviesList, noMoviesFound}));
  
  moviesFiltered?.forEach(element => {
    details.push(axios.request({
      method: 'GET',
      url: keys.movie.detailsUrl,
      params: {tconst: `${(element.id).substring(7,(element.id).lastIndexOf("/"))}`, currentCountry: 'US'},
      headers: keys.imdb
    }));
  })

  Promise.all(details).then(overView => {
    overView.forEach(({data}) => {
      moviesList2.push({
        id: data?.id,
        title: data?.title?.title || 'unavailable',
        posterUrl: data?.title?.image?.url || '',
        runningTimeInMinutes: data?.title?.runningTimeInMinutes || 'unavailable',
        genres: data?.genres?.join(', ') || 'unavailable',
        summary: data?.plotOutline?.text || 'unavailable',
        rating: data?.ratings?.rating || 'unavailable',
        certificate: data?.certificates?.US[0]?.certificate || '',
        releaseDate: data?.releaseDate
      });
    });
    moviesList = moviesList1.map(ml1 => ({...ml1, ...moviesList2.find(ml2 => ml2.id === ml1.id)}));
    noMoviesFound = moviesList.length === 0 ? true : false;
    dispatch(fetchMovies({ moviesList, ...{isLoading: false, loadingError: false, noMoviesFound}}));
  }).catch(e=> dispatch(fetchMovies({ moviesList, ...{isLoading: false, loadingError: true, noMoviesFound: false}})));
};

const saveMovie = createAsyncThunk('movie/add', async (movie) => {
  const response = await axios.post(`${BASE_URL}/movies/save`, {movie});
  if(response.data.message === "Successfully saved movie"){
    return {movie};
  }
});

const removeMovie = createAsyncThunk('movie/remove', async (movie) => {
  const response = await axios.post(`${BASE_URL}/movies/remove`, {movie});
  if(response.data.message === "Successfully removed movie"){
    return {movie};
  }
});

const fetchUserMovies = createAsyncThunk('movie/fetchUserMovies', async (userId) => {
  const response = await axios.get(`${BASE_URL}/movies/${userId}`);
  return ({savedMovies: response.data.result});
});
  
export { searchMovie, saveMovie, removeMovie, fetchUserMovies };