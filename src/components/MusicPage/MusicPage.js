import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./MusicPage.css";
import { setSong, fetchSongs } from '../../store';
import MusicList from "./MusicList";

const MusicPage = () => {
  const dispatch = useDispatch();
  const {songTitle} = useSelector((state) => {
      return {
        songTitle: state.song.songTitle
      };
  });
  useEffect(() => {
    const timerId = setTimeout(() => {
      if(songTitle) {
        dispatch(fetchSongs(songTitle));
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [songTitle, dispatch]);

  return (
    <div className="music-page-content">
      <div className="form container">
        <div>
            <h2 className="text-2xl font-bold">Find a song</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <input className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none" 
                placeholder="Song Title (Required)" 
                value={songTitle}
                onChange={(event)=>dispatch(setSong(event.target.value))}/>
            </form>
        </div>
        <MusicList/>
      </div>
    </div>
  )
}

export default MusicPage;
