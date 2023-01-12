import { useDispatch } from 'react-redux';
import ExpandablePanel from '../ExpandablePanel';
import { BsBookmarkHeart } from 'react-icons/bs';
import { saveSong } from '../../store';

function MusicListItem({ song, userId }) {
  const dispatch = useDispatch();

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
