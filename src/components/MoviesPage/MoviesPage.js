import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./MoviesPage.css";
import { setMovie, searchMovie, fetchMovies } from "../../store";
import MoviesList from "./MoviesList";
import Button from "../Button";
import { BsSearch } from "react-icons/bs";

const MoviesPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { movieTitle, moviesList, isLoading } = useSelector((state) => {
    return {
      movieTitle: state.movie.movieTitle,
      moviesList: state.movie.moviesList,
      isLoading: state.movie.isLoading,
    };
  });

  return (
    <div className="movies-page-content">
      <div className="form container">
        <h5 className="text-right text-blue-600">
          {!bookmarkedPage ? (
            <Link
              className="text-blue-900 italic font-bold text-2xl"
              to="/movies/bookmarked"
            >
              Bookmarked
            </Link>
          ) : (
            <Link
              className="text-blue-900 italic font-bold text-2xl"
              to="/movies"
            >
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <MoviesList bookmarked={true} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-1">Find a movie</h2>
              <div className="flex justify-center">
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="relative w-3/4"
                >
                  <input
                    type="text"
                    className="h-14 w-full pl-16 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                    placeholder="Movie Title (Required)"
                    value={movieTitle}
                    onChange={(event) => dispatch(setMovie(event.target.value))}
                  />
                  <div className="absolute top-2 left-2">
                    <Button
                      disabled={!movieTitle}
                      loading={isLoading}
                      onClick={() =>
                        dispatch(searchMovie(movieTitle, fetchMovies))
                      }
                      className={`h-10 w-fit text-white rounded-lg ${
                        movieTitle
                          ? "bg-blue-900 hover:bg-green-900"
                          : "bg-gray-100 text-slate-300"
                      }  ${isLoading ? "bg-green-900" : ""}`}
                    >
                      <BsSearch size={25} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <MoviesList list={moviesList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
