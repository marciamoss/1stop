import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./MoviesPage.css";
import { setMovie, searchMovie, fetchMovies } from "../../store";
import MoviesList from "./MoviesList";

const MoviesPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { movieTitle, moviesList } = useSelector((state) => {
    return {
      movieTitle: state.movie.movieTitle,
      moviesList: state.movie.moviesList,
    };
  });

  return (
    <div className="movies-page-content">
      <div className="form container">
        <h5 className="text-right text-blue-600">
          {!bookmarkedPage ? (
            <Link className="link" to="/movies/bookmarked">
              Bookmarked
            </Link>
          ) : (
            <Link className="link" to="/movies">
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <MoviesList bookmarked={true} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold">Find a movie</h2>
              <form onSubmit={(event) => event.preventDefault()}>
                <input
                  className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                  placeholder="Movie Title (Required)"
                  value={movieTitle}
                  onChange={(event) => dispatch(setMovie(event.target.value))}
                />
                <button
                  disabled={!movieTitle}
                  onClick={() => dispatch(searchMovie(movieTitle, fetchMovies))}
                  className={`${
                    movieTitle
                      ? "bg-blue-300 font-bold"
                      : "bg-gray-100 text-slate-300"
                  } border-solid self-end  ml-1 rounded h-fit w-24 text-sm border-2`}
                >
                  Search
                </button>
              </form>
            </div>
            <MoviesList list={moviesList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
