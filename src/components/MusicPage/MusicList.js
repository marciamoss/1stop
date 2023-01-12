import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import MusicListItem from './MusicListItem';

function MusicList() {
    const {loadingError, songsList, isLoading, noSongsFound, userId} = useSelector((state) => {
        return {
            loadingError: state.song.loadingError,
            songsList: state.song.songsList,
            isLoading: state.song.isLoading,
            noSongsFound: state.song.noSongsFound,
            userId: state.user.userId
        };
    });

    let content;
    if (isLoading) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingError) {
        content = <div className="m-2 container text-red-600 font-extrabold text-xl">Error fetching data...</div>;
    } else {
        content = songsList.map((song) => {
            return <MusicListItem key={song.id} song={song} userId={userId}/>;
        });
    }

    return (
        <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{songsList.length>0 ? 'List of Songs' : '' }</h1>
        </div>
        <h1 className="m-2 container font-extrabold text-xl">{noSongsFound ? 'No Songs Found' : '' }</h1>
        {content}
        </div>
    );
}

export default MusicList;
