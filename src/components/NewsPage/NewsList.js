import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import NewsListItem from './NewsListItem';

function NewsList({list, bookmarked}) {
    const {loadingError, isLoading, noNewsFound, userId} = useSelector((state) => {
        return {
            loadingError: state.news.loadingError,
            isLoading: state.news.isLoading,
            noNewsFound: state.news.noNewsFound,
            userId: state.user.userId
        };
    });

    let content;
    if (isLoading) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingError) {
        content = <div className="m-2 container text-red-600 font-extrabold text-xl">Error fetching data...</div>;
    } else {
        content = list.map((news) => {
            return <NewsListItem key={news.uri} news={news}  userId={userId} bookmarked={bookmarked}/>;
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 container font-extrabold text-xl">{list.length>0 ? !bookmarked ? 'News List' : 'Saved News' : '' }</h1>
            </div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{noNewsFound ? 'No News Found' : '' }</h1>
        </div>
        {content}
        </div>
    );
}

export default NewsList;
