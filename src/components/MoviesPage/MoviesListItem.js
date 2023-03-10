import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineLocalMovies } from "react-icons/md";
import { saveMovie, removeMovie, resetMovieSaveSuccess } from "../../store";
import { useFormatDate, useResetAlert, useSaveDeleteItem } from "../../hooks";

function MoviesListItem({ movie, userId, bookmarked }) {
  const dispatch = useDispatch();
  const { rDate } = useFormatDate(movie.releaseDate);
  const { savedId, savedMovies, actionFailedId } = useSelector((state) => {
    return {
      savedMovies: state.movie.savedMovies,
      savedId: state.movie.savedId,
      actionFailedId: state.movie.actionFailedId,
    };
  });
  const { resetAlert } = useResetAlert(
    movie.id,
    savedId,
    actionFailedId,
    resetMovieSaveSuccess
  );

  const { previouslySaved, deleteConfirm, setDeleteConfirm, handleClick } =
    useSaveDeleteItem(
      savedMovies,
      movie,
      "id",
      resetAlert,
      userId,
      saveMovie,
      bookmarked
    );

  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      <div>
        {movie.title}
        <div className="text-base max-[770px]:text-sm italic">
          {movie.certificate ? movie.certificate : "N/A"} Released:{" "}
          {rDate ? rDate : "Unavailable"}
        </div>
      </div>
    </>
  );

  return (
    <>
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          dispatch={dispatch}
          dispatchFn={removeMovie({ id: movie.id, userId: userId })}
          confirmMessage={`Removing "${movie.title}"?`}
        />
      ) : (
        ""
      )}
      {savedId === movie.id ||
      previouslySaved ||
      actionFailedId === movie.id ? (
        <div
          className={`flex items-center ${
            actionFailedId ? "bg-red-500" : "bg-green-500"
          } text-white text-lg font-bold px-4 py-3" role="alert"`}
        >
          <FaInfoCircle />
          {actionFailedId ? (
            <p className="ml-1">Action Failed At This Time!</p>
          ) : (
            <p className="ml-1">
              {previouslySaved
                ? ` Previously Bookmarked: "${movie.title}"`
                : `Bookmarked "${movie.title}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-xl max-[770px]:text-sm">
          <div className="text-left">
            <a
              href={`https://www.imdb.com${movie.id}`}
              target="blank"
              className="italic text-blue-600"
            >
              {movie.posterUrl ? (
                <img
                  className="inline h-20 w-20"
                  src={movie.posterUrl}
                  alt="N/A"
                />
              ) : (
                <MdOutlineLocalMovies className="inline h-20 w-20" />
              )}
            </a>
          </div>
          <div className="italic">Plot: {movie.summary}</div>
          <div className="italic md:indent-12">Genres: {movie.genres}</div>
          <div className="italic md:indent-12">Cast: {movie.cast}</div>
          <div className="italic md:indent-12">
            Running Time<sub className="ml-1 font-features sups">(in mins)</sub>{" "}
            : {movie.runningTimeInMinutes}, Ratings: {movie.rating}
          </div>
        </div>
      </ExpandablePanel>
    </>
  );
}
export default MoviesListItem;
