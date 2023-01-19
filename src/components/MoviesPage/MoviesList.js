import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import MoviesListItem from './MoviesListItem';

function MoviesList({list, bookmarked}) {
    const {loadingError, isLoading, noMoviesFound, userId} = useSelector((state) => {
        return {
            loadingError: state.movie.loadingError,
            isLoading: state.movie.isLoading,
            noMoviesFound: state.movie.noMoviesFound,
            userId: state.user.userId
        };
    });

    let content;
    if (isLoading) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingError) {
        content = <div className="m-2 container text-red-600 font-extrabold text-xl">Error fetching data...</div>;
    } else {
        content = list.map((movie) => {
            return <MoviesListItem key={movie.id} movie={movie} userId={userId} bookmarked={bookmarked}/>;
        });
    }

    return (
        <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{list.length>0 ? !bookmarked ? 'List of Movies' : 'Your Movies' : '' }</h1>
        </div>
        <h1 className="m-2 container font-extrabold text-xl">{noMoviesFound ? 'No Movies Found' : '' }</h1>
        {content}
        </div>
    );
}

export default MoviesList;
