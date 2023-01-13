import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import { BsBookmarkHeart } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { saveSong, resetSaveSuccess } from '../../store';

function MusicListItem({ song, userId }) {
  const dispatch = useDispatch();
  const {savedId} = useSelector((state) => {
    return {
      savedId: state.song.savedId
    };
  });

  useEffect(() => {
    setTimeout(() => {
      if(savedId === song.id){
        dispatch(resetSaveSuccess(savedId));
      }
    }, 1000);
  }, [savedId, song.id, dispatch]);

  const handleClick = () => {
    dispatch(saveSong({...song, ...{userId}}));
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        <BsBookmarkHeart/>
      </button>
      {/* {error && <div>Error deleting user.</div>} */}
      {song.name}
      {(savedId === song.id) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">Bookmarked "{song.name}"</p>
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
