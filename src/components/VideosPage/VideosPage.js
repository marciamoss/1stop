import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./VideosPage.css";
import { setVideo, fetchVideos } from "../../store";
import VideosList from "./VideosList";
import Button from "../Button";
import { BsSearch } from "react-icons/bs";

const VideoPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { videoTitle, videosList, isLoading } = useSelector((state) => {
    return {
      videoTitle: state.video.videoTitle,
      videosList: state.video.videosList,
      isLoading: state.video.isLoading,
    };
  });

  return (
    <div className="videos-page-content">
      <div className="form container">
        <h5 className="text-right text-blue-600">
          {!bookmarkedPage ? (
            <Link
              className="text-blue-900 italic font-bold text-2xl"
              to="/videos/bookmarked"
            >
              Bookmarked
            </Link>
          ) : (
            <Link className="text-blue-900 italic font-bold" to="/videos">
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <VideosList bookmarked={true} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-1">Find a video</h2>
              <div className="flex justify-center">
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="relative w-3/4"
                >
                  <input
                    type="text"
                    className="h-14 w-full pl-16 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                    placeholder="Video Title (Required)"
                    value={videoTitle}
                    onChange={(event) => dispatch(setVideo(event.target.value))}
                  />
                  <div className="absolute top-2 left-2">
                    <Button
                      disabled={!videoTitle}
                      loading={isLoading}
                      onClick={() => dispatch(fetchVideos(videoTitle))}
                      className={`h-10 w-fit text-white rounded-lg ${
                        videoTitle
                          ? "bg-blue-900 hover:bg-green-900"
                          : "bg-gray-100 text-slate-300"
                      }  ${isLoading ? "bg-green-900" : ""}`}
                    >
                      <BsSearch size={25} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <VideosList list={videosList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
