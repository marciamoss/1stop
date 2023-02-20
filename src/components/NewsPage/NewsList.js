import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "../Skeleton";
import NewsListItem from "./NewsListItem";
import { useFetchUserNews } from "../../hooks";

function NewsList({ list, bookmarked }) {
  useFetchUserNews({ bookmarked });
  const location = useLocation();
  const {
    loadingError,
    isLoading,
    noNewsFound,
    userId,
    savedNews,
    loadingSavedNewsError,
  } = useSelector((state) => {
    return {
      loadingError: state.news.loadingError,
      isLoading: state.news.isLoading,
      noNewsFound: state.news.noNewsFound,
      userId: state.user.userId,
      savedNews: state.news.savedNews,
      loadingSavedNewsError: state.news.loadingSavedNewsError,
    };
  });

  let content;
  if (isLoading) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingError && location.pathname === "/news") {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else if (
    loadingSavedNewsError &&
    location.pathname === "/news/bookmarked"
  ) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching saved articles...
      </div>
    );
  } else {
    const contentData = !bookmarked ? list : savedNews;
    content = contentData.map((news) => {
      return (
        <NewsListItem
          key={news.uri}
          news={news}
          userId={userId}
          bookmarked={bookmarked}
        />
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold text-xl">
          {!bookmarked && list.length > 0 ? "News List" : ""}
          {!loadingSavedNewsError
            ? bookmarked && savedNews.length === 0
              ? "No saved articles"
              : bookmarked
              ? "Saved Articles"
              : ""
            : ""}
        </h1>
      </div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold text-xl">
          {noNewsFound ? "No Articles Found" : ""}
        </h1>
      </div>
      {content}
    </div>
  );
}

export default NewsList;
