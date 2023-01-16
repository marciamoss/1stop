import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import ConfirmModal from '../ConfirmModal';
import { BsFillBookmarkHeartFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { saveMovie, removeMovie, resetMovieSaveSuccess } from '../../store';

function MoviesListItem({ movie, userId, bookmarked }) {
  const dispatch = useDispatch();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const {savedId, savedMovies} = useSelector((state) => {
    return {
      savedMovies: state.movie.savedMovies,
      savedId: state.movie.savedId
    };
  });

  const resetAlert = useCallback(
    (id) => setTimeout(() => {
      dispatch(resetMovieSaveSuccess(id));
    }, 1000), [dispatch]
  );

  useEffect(() => {
    if(savedId === movie.id){
      resetAlert(savedId);
    }
  }, [savedId, movie.id, dispatch, resetAlert]);

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
        <div className="text-base italic">{movie.certificate ? movie.certificate : 'N/A'} Released: {movie.releaseDate}</div>
      </div>
    </>
  );

  return (
    <>
      {deleteConfirm ? <ConfirmModal setDeleteConfirm={setDeleteConfirm} dispatch={dispatch} dispatchFn={removeMovie({id: movie.id, userId: userId})} confirmMessage={`Removing "${movie.title}"?`}/> : ''}
      {(savedId === movie.id || previouslySaved) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">{previouslySaved ? `"${movie.title}" Previously Bookmarked` : `Bookmarked "${movie.title}"`}</p>
        </div> : ''}
      <ExpandablePanel header={header}>
        <div className="text-xl">
          Plot: {movie.summary} <br/>
          <div className="italic md:indent-12">Genres: {movie.genres}<br/></div>
          <div className="italic md:indent-12">Cast: {movie.cast}<br/></div>
          <div className="italic md:indent-12">Running Time<sub className="ml-1 font-features sups">(in mins)</sub> : {movie.runningTimeInMinutes}</div>
          <div className="italic md:indent-12">Ratings: {movie.rating}, <a href={movie.posterUrl} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">Poster</a></div>
        </div>
      </ExpandablePanel>
    </>);
}
export default MoviesListItem;
