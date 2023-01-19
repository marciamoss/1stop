import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import ConfirmModal from '../ConfirmModal';
import { BsFillBookmarkHeartFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { GiSaxophone } from 'react-icons/gi';
import { saveSong, removeSong, resetSaveSuccess } from '../../store';

function MusicListItem({ song, userId, bookmarked }) {
  const dispatch = useDispatch();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const {savedId, savedSongs} = useSelector((state) => {
    return {
      savedSongs: state.song.savedSongs,
      savedId: state.song.savedId
    };
  });

  const resetAlert = useCallback(
    (id) => setTimeout(() => {
      dispatch(resetSaveSuccess(id));
    }, 1000), [dispatch]
  );

  useEffect(() => {
    if(savedId === song.id){
      resetAlert(savedId);
    }
  }, [savedId, song.id, dispatch, resetAlert]);

  const handleClick = () => {
    if(!bookmarked) {
      if(!((savedSongs.filter(s=>s.id===song.id)).length > 0)) {
        dispatch(saveSong({...song, ...{userId}}));
      }else {
        setPreviouslySaved((savedSongs.filter(s=>s.id===song.id)).length > 0);
        resetAlert(song.id);
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
      {song.name}
    </>
  );

  return (
    <>
      {deleteConfirm ? <ConfirmModal setDeleteConfirm={setDeleteConfirm} dispatch={dispatch} dispatchFn={removeSong({id: song.id, userId: userId})} confirmMessage={`Removing "${song.name}"?`}/> : ''}
      {(savedId === song.id || previouslySaved) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">{previouslySaved ? `"${song.name}" Previously Bookmarked` : `Bookmarked "${song.name}"`}</p>
        </div> : ''}
      <ExpandablePanel header={header}>
        <div className="text-xl">
          <div className="text-left">
            <a href={song.album.url} target="blank" className="italic text-blue-600">
            {song.album.albumImage ? <img className="inline h-20 w-20" src={song.album.albumImage} alt="N/A"/> : <GiSaxophone className="inline h-20 w-20"/>}
            </a>
          </div>
          Artists: {song.artists},
          <a href={song.album.url} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">Album: {song.album.name},</a>
          <a href={song.preview_url} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">Click for a preview</a>
        </div>
      </ExpandablePanel>
    </>);
}
export default MusicListItem;
