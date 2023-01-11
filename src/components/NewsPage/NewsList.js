import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import NewsListItem from './NewsListItem';

function NewsList() {
    const {loadingError, newsList, isLoading} = useSelector((state) => {
        return {
            loadingError: state.news.loadingError,
            newsList: state.news.newsList,
            isLoading: state.news.isLoading,
        };
    });

    let content;
    if (isLoading) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingError) {
        content = <div className="m-2 container text-red-600 font-extrabold text-xl">Error fetching data...</div>;
    } else {
        content = newsList.map((news) => {
            return <NewsListItem key={news.uri} news={news} />;
        });
    }
    return (
        <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 container font-extrabold text-xl">{newsList.length>0 ? 'News List' : '' }</h1>
        </div>
        {content}
        </div>
    );
}

export default NewsList;
