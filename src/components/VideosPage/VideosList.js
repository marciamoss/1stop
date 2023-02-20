import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "../Skeleton";
import VideosListItem from "./VideosListItem";
import { useFetchUserVideos } from "../../hooks";

function VideosList({ list, bookmarked }) {
  useFetchUserVideos({ bookmarked });
  const location = useLocation();
  const {
    loadingError,
    isLoading,
    noVideosFound,
    userId,
    savedVideos,
    loadingSavedVideosError,
  } = useSelector((state) => {
    return {
      loadingError: state.video.loadingError,
      isLoading: state.video.isLoading,
      noVideosFound: state.video.noVideosFound,
      userId: state.user.userId,
      savedVideos: state.video.savedVideos,
      loadingSavedVideosError: state.video.loadingSavedVideosError,
    };
  });

  let content;
  if (isLoading) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingError && location.pathname === "/videos") {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else if (
    loadingSavedVideosError &&
    location.pathname === "/videos/bookmarked"
  ) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching saved videos...
      </div>
    );
  } else {
    const contentData = !bookmarked ? list : savedVideos;
    content = contentData.map((video) => {
      return (
        <VideosListItem
          key={video.id}
          video={video}
          userId={userId}
          bookmarked={bookmarked}
        />
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold text-xl">
          {!bookmarked && list.length > 0 ? "List of Videos" : ""}
          {!loadingSavedVideosError
            ? bookmarked && savedVideos.length === 0
              ? "No saved videos"
              : bookmarked
              ? "Your Videos"
              : ""
            : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl">
        {noVideosFound ? "No Videos Found" : ""}
      </h1>
      <section className="max-w-fit mx-auto">{content}</section>
    </div>
  );
}

export default VideosList;
