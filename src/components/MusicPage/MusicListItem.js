import ExpandablePanel from '../ExpandablePanel';

function MusicListItem({ song }) {
  const header = <>{song.name}</>;
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
