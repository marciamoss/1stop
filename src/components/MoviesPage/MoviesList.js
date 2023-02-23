import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import { useLocation } from "react-router-dom";
import MoviesListItem from "./MoviesListItem";
import { useFetchUserMovies } from "../../hooks";

function MoviesList({ list, bookmarked }) {
  useFetchUserMovies({ bookmarked });
  const location = useLocation();
  const {
    loadingError,
    isLoading,
    noMoviesFound,
    userId,
    savedMovies,
    loadingSavedMoviesError,
  } = useSelector((state) => {
    return {
      loadingError: state.movie.loadingError,
      isLoading: state.movie.isLoading,
      noMoviesFound: state.movie.noMoviesFound,
      userId: state.user.userId,
      savedMovies: state.movie.savedMovies,
      loadingSavedMoviesError: state.movie.loadingSavedMoviesError,
    };
  });

  let content;
  if (isLoading) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingError && location.pathname === "/movies") {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else if (
    loadingSavedMoviesError &&
    location.pathname === "/movies/bookmarked"
  ) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching saved Movies...
      </div>
    );
  } else {
    const contentData = !bookmarked ? list : savedMovies;
    content = contentData.map((movie) => {
      return (
        <MoviesListItem
          key={movie.id}
          movie={movie}
          userId={userId}
          bookmarked={bookmarked}
        />
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold text-xl">
          {!bookmarked && list.length > 0 && !loadingError
            ? "List of Movies"
            : ""}
          {!loadingSavedMoviesError
            ? bookmarked && savedMovies.length === 0
              ? "No saved movies"
              : bookmarked
              ? "Your Movies"
              : ""
            : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl">
        {noMoviesFound ? "No Movies Found" : ""}
      </h1>
      {content}
    </div>
  );
}

export default MoviesList;
