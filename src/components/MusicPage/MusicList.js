import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import MusicListItem from './MusicListItem';

function MusicList({list, bookmarked}) {
    const {loadingError, isLoading, noSongsFound, userId} = useSelector((state) => {
        return {
            loadingError: state.song.loadingError,
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
        content = list.map((song) => {
            return <MusicListItem key={song.id} song={song} userId={userId} bookmarked={bookmarked}/>;
        });
    }

    return (
        <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{list.length>0 ? !bookmarked ? 'List of Songs' : 'Your Songs' : '' }</h1>
        </div>
        <h1 className="m-2 container font-extrabold text-xl">{noSongsFound ? 'No Songs Found' : '' }</h1>
        {content}
        </div>
    );
}

export default MusicList;
