import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { GiSaxophone } from "react-icons/gi";
import { saveSong, removeSong, resetSaveSuccess } from "../../store";
import { useResetAlert, useSaveDeleteItem } from "../../hooks";

function MusicListItem({ song, userId, bookmarked }) {
  const dispatch = useDispatch();
  const { savedId, savedSongs, actionFailedId } = useSelector((state) => {
    return {
      savedSongs: state.song.savedSongs,
      savedId: state.song.savedId,
      actionFailedId: state.song.actionFailedId,
    };
  });
  const { resetAlert } = useResetAlert(
    song.id,
    savedId,
    actionFailedId,
    resetSaveSuccess
  );

  const { previouslySaved, deleteConfirm, setDeleteConfirm, handleClick } =
    useSaveDeleteItem(
      savedSongs,
      song,
      "id",
      resetAlert,
      userId,
      saveSong,
      bookmarked
    );

  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {song.name}
    </>
  );

  return (
    <>
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          dispatch={dispatch}
          dispatchFn={removeSong({ id: song.id, userId: userId })}
          confirmMessage={`Removing "${song.name}"?`}
        />
      ) : (
        ""
      )}
      {savedId === song.id || previouslySaved || actionFailedId === song.id ? (
        <div
          className={`flex items-center ${
            actionFailedId ? "bg-red-500" : "bg-green-500"
          } text-white text-lg font-bold px-4 py-3" role="alert"`}
        >
          <FaInfoCircle />
          {actionFailedId ? (
            <p className="ml-1">Action Failed At This Time!</p>
          ) : (
            <p className="ml-1">
              {previouslySaved
                ? ` Previously Bookmarked: "${song.name}"`
                : `Bookmarked "${song.name}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-xl max-[770px]:text-sm">
          <div className="text-left">
            <a
              href={song.album.url}
              target="blank"
              className="italic text-blue-600"
            >
              {song.album.albumImage ? (
                <img
                  className="inline h-20 w-20"
                  src={song.album.albumImage}
                  alt="N/A"
                />
              ) : (
                <GiSaxophone className="inline h-20 w-20" />
              )}
            </a>
          </div>
          Artists: {song.artists},
          <a
            href={song.album.url}
            target="blank"
            className="ml-1 italic text-blue-600 visited:text-purple-600"
          >
            Album: {song.album.name},
          </a>
          <a
            href={song.preview_url}
            target="blank"
            className="ml-1 italic text-blue-600 visited:text-purple-600"
          >
            Click for a preview
          </a>
        </div>
      </ExpandablePanel>
    </>
  );
}
export default MusicListItem;
