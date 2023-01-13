import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import { BsBookmarkHeart } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { saveSong, resetSaveSuccess } from '../../store';

function MusicListItem({ song, userId }) {
  const dispatch = useDispatch();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  const {savedId, savedSongs} = useSelector((state) => {
    return {
      savedSongs: state.song.savedSongs,
      savedId: state.song.savedId
    };
  });

  const resetAlert = (id) => setTimeout(() => {
    dispatch(resetSaveSuccess(id));
  }, 2000);

  useEffect(() => {
    if(savedId === song.id){
      resetAlert(savedId);
    }
  }, [savedId, song.id, dispatch]);

  const handleClick = () => {
    if(!((savedSongs.filter(s=>s.id===song.id)).length > 0)) {
      dispatch(saveSong({...song, ...{userId}}));
    }else {
      setPreviouslySaved((savedSongs.filter(s=>s.id===song.id)).length > 0);
      resetAlert(song.id);
    }
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        <BsBookmarkHeart/>
      </button>
      {/* {error && <div>Error deleting user.</div>} */}
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
