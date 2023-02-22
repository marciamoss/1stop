import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./MoviesPage.css";
import { setMovie, searchMovie, fetchMovies } from "../../store";
import MoviesList from "./MoviesList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";

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
    <div className="container max-[770px]:text-sm text-xl text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/movies/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/movies"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <MoviesList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1">Find a movie</h2>
            <div className="flex justify-center">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="relative w-3/4 max-[770px]:w-full m-2"
              >
                <input
                  type="text"
                  className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                  placeholder="Movie Title (Required)"
                  value={movieTitle}
                  onChange={(event) => dispatch(setMovie(event.target.value))}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!movieTitle}
                    loading={isLoading}
                    onClick={() =>
                      dispatch(searchMovie(movieTitle, fetchMovies))
                    }
                    className={`h-fit w-fit border-0 ${
                      movieTitle
                        ? "text-blue-900 hover:text-green-900"
                        : "text-slate-300"
                    }  ${isLoading ? "text-green-900 text-2xl" : ""}`}
                  >
                    <FaSearch size={30} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <MoviesList list={moviesList} bookmarked={false} />
        </>
      )}
    </div>
  );
};

export default MoviesPage;
