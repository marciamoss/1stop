import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./VideosPage.css";
import { setVideo, fetchVideos } from '../../store';
import VideosList from "./VideosList";

const VideoPage = () => {
  const dispatch = useDispatch();
  const [showBookmarked, setShowBookmarked] = useState(false);
  const {videoTitle, videosList, savedVideos} = useSelector((state) => {
      return {
        videoTitle: state.video.videoTitle,
        videosList: state.video.videosList,
        savedVideos: state.video.savedVideos
      };
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if(videoTitle) {
        dispatch(fetchVideos(videoTitle));
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [videoTitle, dispatch]);

  useEffect(() => {
    if(savedVideos.length===0) {
      setShowBookmarked(false);
    }
  }, [savedVideos]);

  return (
    <div className="music-page-content">
      <div className="form container">
        {savedVideos.length > 0 ?
        <h5 className="text-right text-blue-600">
          <button onClick={()=>setShowBookmarked(!showBookmarked)}>{!showBookmarked ? 'Bookmarked' : 'Back to Search'}</button>
        </h5> : ''}
          {showBookmarked ? <VideosList list={savedVideos} bookmarked={true}/> :
            <>
              <div>
                <h2 className="text-2xl font-bold">Find a video</h2>
                <form onSubmit={(event) => event.preventDefault()}>
                  <input className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                    placeholder="Video Title (Required)"
                    value={videoTitle}
                    onChange={(event)=>dispatch(setVideo(event.target.value))}/>
                </form>
              </div>
              <VideosList list={videosList} bookmarked={false}/>
            </>
          }
      </div>
    </div>
  )
}

export default VideoPage;
