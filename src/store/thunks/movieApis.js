import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const keys = require("../../keys.js");
const BASE_URL = keys.mongo.api;

const searchMovie = (movieTitle, fetchMovies) => async (dispatch) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: keys.movie.url,
      params: { q: movieTitle },
      headers: keys.imdb,
    });

    const moviesFiltered = response?.data?.results
      ?.filter((m) => m.titleType === "movie")
      ?.slice(0, 4);

    !moviesFiltered
      ? dispatch(fetchMovies({ moviesList: [], noMoviesFound: true }))
      : moviesFiltered?.forEach((m) => {
          let cast = "";
          m?.principals?.forEach(
            (p, index) => (cast = index === 0 ? p?.name : `${cast}, ${p?.name}`)
          );

          cast = cast === "" ? "unavailable" : cast;
          dispatch(searchMovieDetails({ cast, id: m.id }));
        });
  } catch (error) {
    dispatch(
      fetchMovies({
        ...{
          moviesList: [],
          isLoading: false,
          loadingError: true,
          noMoviesFound: false,
        },
      })
    );
  }
};

const searchMovieDetails = createAsyncThunk("movie/search", async (movie) => {
  const { data } = await axios.request({
    method: "GET",
    url: keys.movie.detailsUrl,
    params: {
      tconst: `${movie.id.substring(7, movie.id.lastIndexOf("/"))}`,
      currentCountry: "US",
    },
    headers: keys.imdb,
  });

  let details = {
    id: data?.id,
    title: data?.title?.title || "unavailable",
    posterUrl: data?.title?.image?.url || "",
    runningTimeInMinutes: data?.title?.runningTimeInMinutes || "unavailable",
    genres: data?.genres?.join(", ") || "unavailable",
    summary: data?.plotOutline?.text || "unavailable",
    rating: data?.ratings?.rating || "unavailable",
    certificate: data?.certificates?.US[0]?.certificate || "",
    releaseDate: data?.releaseDate,
  };
  return { movie: details };
});

const saveMovie = createAsyncThunk("movie/add", async (movie) => {
  const response = await axios.post(`${BASE_URL}/movies/save`, { movie });
  if (response.data.message === "Successfully saved movie") {
    return { movie };
  }
});

const removeMovie = createAsyncThunk("movie/remove", async (movie) => {
  const response = await axios.post(`${BASE_URL}/movies/remove`, { movie });
  if (response.data.message === "Successfully removed movie") {
    return { movie };
  }
});

const fetchUserMovies = createAsyncThunk(
  "movie/fetchUserMovies",
  async (userId) => {
    const response = await axios.get(`${BASE_URL}/movies/${userId}`);
    return { savedMovies: response.data.result };
  }
);

export {
  searchMovie,
  saveMovie,
  removeMovie,
  fetchUserMovies,
  searchMovieDetails,
};
