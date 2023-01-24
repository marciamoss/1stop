import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import VideosListItem from './VideosListItem';

function VideosList({list, bookmarked}) {
    const {loadingError, isLoading, noVideosFound, userId} = useSelector((state) => {
        return {
            loadingError: state.video.loadingError,
            isLoading: state.video.isLoading,
            noVideosFound: state.video.noVideosFound,
            userId: state.user.userId
        };
    });

    let content;
    if (isLoading) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingError) {
        content = <div className="m-2 container text-red-600 font-extrabold text-xl">Error fetching data...</div>;
    } else {
        content = list.map((video) => {
            return <VideosListItem key={video.id} video={video} userId={userId} bookmarked={bookmarked}/>;
        });
    }

    return (
        <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{list.length>0 ? !bookmarked ? 'List of Videos' : 'Your Videos' : '' }</h1>
        </div>
        <h1 className="m-2 container font-extrabold text-xl">{noVideosFound ? 'No Videos Found' : '' }</h1>
        <section className="max-w-fit mx-auto">
            {content}
        </section>
        </div>
    );
}

export default VideosList;
