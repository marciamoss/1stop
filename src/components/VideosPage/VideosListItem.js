import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import ConfirmModal from '../ConfirmModal';
import { BsFillBookmarkHeartFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { saveVideo, removeVideo, resetVideoSaveSuccess } from '../../store';
import { useResetAlert, useDeleteItem } from '../../hooks';

function VideosListItem({ video, userId, bookmarked }) {
  const dispatch = useDispatch();
  const {savedId, savedVideos} = useSelector((state) => {
    return {
      savedVideos: state.video.savedVideos,
      savedId: state.video.savedId
    };
  });
  const {resetAlert} = useResetAlert(video.id, savedId, resetVideoSaveSuccess );

  const { previouslySaved, deleteConfirm, setDeleteConfirm, handleClick } =
  useDeleteItem(savedVideos, video, "id", resetAlert, userId, saveVideo, bookmarked);

  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill/> : <BsFillBookmarkDashFill/>}
      </button>
      {video.title}
    </>
  );

  return (
    <>
      {deleteConfirm ? <ConfirmModal setDeleteConfirm={setDeleteConfirm} dispatch={dispatch} dispatchFn={removeVideo({id: video.id, userId: userId})} confirmMessage={`Removing "${video.title}"?`}/> : ''}
      {(savedId === video.id || previouslySaved) ?
        <div className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-3" role="alert">
          <FaInfoCircle/>
          <p className="ml-1">{previouslySaved ? ` Previously Bookmarked: "${video.title}"` : `Bookmarked "${video.title}"`}</p>
        </div> : ''}
        <ExpandablePanel header={header}>
          <section className="max-w-full mx-auto">
            <iframe key={video.id} className="w-full sm:aspect-[4/3]" width="760" height="415" src={`https://www.youtube-nocookie.com/embed/${video.id}`} title="YouTube video player" allowFullScreen></iframe>
          </section>
      </ExpandablePanel>
    </>);
}
export default VideosListItem;
