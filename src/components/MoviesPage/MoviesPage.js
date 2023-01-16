import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./MoviesPage.css";
import { setMovie, searchMovie, fetchMovies } from '../../store';
import MoviesList from "./MoviesList";

const MoviesPage = () => {
  const dispatch = useDispatch();
  const [showBookmarked, setShowBookmarked] = useState(false);
  const {movieTitle, moviesList, savedMovies} = useSelector((state) => {
      return {
        movieTitle: state.movie.movieTitle,
        moviesList: state.movie.moviesList,
        savedMovies: state.movie.savedMovies
      };
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if(movieTitle) {
        dispatch(searchMovie(movieTitle, fetchMovies))
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [movieTitle, dispatch]);

  useEffect(() => {
    if(savedMovies.length===0) {
      setShowBookmarked(false);
    }
  }, [savedMovies]);

  return (
    <div className="movies-page-content">
      <div className="form container">
        {savedMovies.length > 0 ?
        <h5 className="text-right text-blue-600">
          <button onClick={()=>setShowBookmarked(!showBookmarked)}>{!showBookmarked ? 'Bookmarked' : 'Back to Search'}</button>
        </h5> : ''}
          {showBookmarked ? <MoviesList list={savedMovies} bookmarked={true}/> :
            <>
              <div>
                <h2 className="text-2xl font-bold">Find a movie</h2>
                <form onSubmit={(event) => event.preventDefault()}>
                  <input className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                    placeholder="Movie Title (Required)"
                    value={movieTitle}
                    onChange={(event)=>dispatch(setMovie(event.target.value))}/>
                </form>
              </div>
              <MoviesList list={moviesList} bookmarked={false}/>
            </>
          }
      </div>
    </div>
  )
}

export default MoviesPage;
