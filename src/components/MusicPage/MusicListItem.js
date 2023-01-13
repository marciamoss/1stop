import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import { BsFillBookmarkHeartFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { saveSong, resetSaveSuccess } from '../../store';

function MusicListItem({ song, userId, bookmarked }) {
  const dispatch = useDispatch();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  const {savedId, savedSongs} = useSelector((state) => {
    return {
      savedSongs: state.song.savedSongs,
      savedId: state.song.savedId
    };
  });

  const resetAlert = useCallback(
    (id) => setTimeout(() => {
      dispatch(resetSaveSuccess(id));
    }, 1500), [dispatch]
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
      console.log("remove saved");
    }
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill/> : <BsFillBookmarkDashFill/>}
      </button>
      {song.name}
      {(savedId === song.id || previouslySaved) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">{previouslySaved ? `"${song.name}" Already Bookmarked` : `Bookmarked "${song.name}"`}</p>
        </div> : ''
      }
    </>
  );
  return (
    <ExpandablePanel header={header}>
        <div className="text-xl">Artists: {song.artists}, 
        <a href={song.album.url} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">
        Album: {song.album.name},
        </a>
        <a href={song.preview_url} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">
            Click for a preview
        </a>
      </div>
    </ExpandablePanel>
  );
}

export default MusicListItem;
