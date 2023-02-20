import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./VideosPage.css";
import { setVideo, fetchVideos } from "../../store";
import VideosList from "./VideosList";

const VideoPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { videoTitle, videosList } = useSelector((state) => {
    return {
      videoTitle: state.video.videoTitle,
      videosList: state.video.videosList,
    };
  });

  return (
    <div className="videos-page-content">
      <div className="form container">
        <h5 className="text-right text-blue-600">
          {!bookmarkedPage ? (
            <Link className="link" to="/videos/bookmarked">
              Bookmarked
            </Link>
          ) : (
            <Link className="link" to="/videos">
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <VideosList bookmarked={true} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold">Find a video</h2>
              <form onSubmit={(event) => event.preventDefault()}>
                <input
                  className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                  placeholder="Video Title (Required)"
                  value={videoTitle}
                  onChange={(event) => dispatch(setVideo(event.target.value))}
                />
                <button
                  disabled={!videoTitle}
                  onClick={() => dispatch(fetchVideos(videoTitle))}
                  className={`${
                    videoTitle
                      ? "bg-blue-300 font-bold"
                      : "bg-gray-100 text-slate-300"
                  } border-solid self-end  ml-1 rounded h-fit w-24 text-sm border-2`}
                >
                  Search
                </button>
              </form>
            </div>
            <VideosList list={videosList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
