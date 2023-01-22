import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import ConfirmModal from '../ConfirmModal';
import { BsFillBookmarkHeartFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { saveMovie, removeMovie, resetMovieSaveSuccess } from '../../store';
import useFormatDate from '../../hooks/use-format-date';
import useResetAlert from '../../hooks/use-reset-alert';

function MoviesListItem({ movie, userId, bookmarked }) {
  const dispatch = useDispatch();
  const { rDate } = useFormatDate(movie.releaseDate);
  const [previouslySaved, setPreviouslySaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const {savedId, savedMovies} = useSelector((state) => {
    return {
      savedMovies: state.movie.savedMovies,
      savedId: state.movie.savedId
    };
  });
  const {resetAlert} = useResetAlert(movie.id, savedId, resetMovieSaveSuccess);

  const handleClick = () => {
    if(!bookmarked) {
      if(!((savedMovies.filter(s=>s.id===movie.id)).length > 0)) {
        dispatch(saveMovie({...movie, ...{userId}}));
      }else {
        setPreviouslySaved((savedMovies.filter(s=>s.id===movie.id)).length > 0);
        resetAlert(movie.id);
      }
    } else {
      setDeleteConfirm(true);
    }
  };

  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill/> : <BsFillBookmarkDashFill/>}
      </button>
      <div>{movie.title} 
        <div className="text-base italic">{movie.certificate ? movie.certificate : 'N/A'} Released: {rDate ? rDate : 'Unavailable'}</div>
      </div>
    </>
  );

  return (
    <>
      {deleteConfirm ? <ConfirmModal setDeleteConfirm={setDeleteConfirm} dispatch={dispatch} dispatchFn={removeMovie({id: movie.id, userId: userId})} confirmMessage={`Removing "${movie.title}"?`}/> : ''}
      {(savedId === movie.id || previouslySaved) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">{previouslySaved ? `Previously Bookmarked: "${movie.title}"` : `Bookmarked "${movie.title}"`}</p>
        </div> : ''}
      <ExpandablePanel header={header}>
        <div className="text-xl">
          <div className="text-left">
            <a href={`https://www.imdb.com${movie.id}`} target="blank" className="italic text-blue-600">
            {movie.posterUrl ? <img className="inline h-20 w-20" src={movie.posterUrl} alt="N/A"/> : <MdOutlineLocalMovies className="inline h-20 w-20"/>}</a>
          </div>
          <div className="italic">Plot: {movie.summary}</div>
          <div className="italic md:indent-12">Genres: {movie.genres}</div>
          <div className="italic md:indent-12">Cast: {movie.cast}</div>
          <div className="italic md:indent-12">Running Time<sub className="ml-1 font-features sups">(in mins)</sub> : {movie.runningTimeInMinutes}, Ratings: {movie.rating}</div>
        </div>
      </ExpandablePanel>
    </>);
}
export default MoviesListItem;
