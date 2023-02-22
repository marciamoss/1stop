import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./VideosPage.css";
import { setVideo, fetchVideos } from "../../store";
import VideosList from "./VideosList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";

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
    <div className="container max-[770px]:text-sm text-xl text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/videos/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/videos"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <VideosList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1">Find a video</h2>
            <div className="flex justify-center">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="relative w-3/4 max-[770px]:w-full m-2"
              >
                <input
                  type="text"
                  className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                  placeholder="Video Title (Required)"
                  value={videoTitle}
                  onChange={(event) => dispatch(setVideo(event.target.value))}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!videoTitle}
                    loading={isLoading}
                    onClick={() => dispatch(fetchVideos(videoTitle))}
                    className={`h-fit w-fit border-0 ${
                      videoTitle
                        ? "text-blue-900 hover:text-green-900"
                        : "text-slate-300"
                    }  ${isLoading ? "text-green-900 text-2xl" : ""}`}
                  >
                    <FaSearch size={30} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <VideosList list={videosList} bookmarked={false} />
        </>
      )}
    </div>
  );
};

export default VideoPage;
