import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "../Skeleton";
import MusicListItem from "./MusicListItem";
import { useFetchUserMusic } from "../../hooks";

function MusicList({ list, bookmarked }) {
  useFetchUserMusic({ bookmarked });
  const location = useLocation();
  const {
    loadingError,
    isLoading,
    noSongsFound,
    userId,
    savedSongs,
    loadingSavedSongsError,
  } = useSelector((state) => {
    return {
      loadingError: state.song.loadingError,
      isLoading: state.song.isLoading,
      noSongsFound: state.song.noSongsFound,
      userId: state.user.userId,
      savedSongs: state.song.savedSongs,
      loadingSavedSongsError: state.song.loadingSavedSongsError,
    };
  });

  let content;
  if (isLoading) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingError && location.pathname === "/music") {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else if (
    loadingSavedSongsError &&
    location.pathname === "/music/bookmarked"
  ) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching saved songs...
      </div>
    );
  } else {
    const contentData = !bookmarked ? list : savedSongs;
    content = contentData.map((song) => {
      return (
        <MusicListItem
          key={song.id}
          song={song}
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
          {!bookmarked && list.length > 0 ? "List of Songs" : ""}
          {!loadingSavedSongsError
            ? bookmarked && savedSongs.length === 0
              ? "No saved songs"
              : bookmarked
              ? "Your Songs"
              : ""
            : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl">
        {noSongsFound ? "No Songs Found" : ""}
      </h1>
      {content}
    </div>
  );
}

export default MusicList;
