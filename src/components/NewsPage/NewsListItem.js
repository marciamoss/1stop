import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { saveNews, removeNews, resetNewsSaveSuccess } from "../../store";
import { useFormatDate, useResetAlert, useSaveDeleteItem } from "../../hooks";

function NewsListItem({ news, userId, bookmarked }) {
  const dispatch = useDispatch();
  const { rDate } = useFormatDate(news.published_date);
  const { savedUri, savedNews, actionFailedId } = useSelector((state) => {
    return {
      savedNews: state.news.savedNews,
      savedUri: state.news.savedUri,
      actionFailedId: state.news.actionFailedId,
    };
  });
  const { resetAlert } = useResetAlert(
    news.uri,
    savedUri,
    actionFailedId,
    resetNewsSaveSuccess
  );

  const { previouslySaved, deleteConfirm, setDeleteConfirm, handleClick } =
    useSaveDeleteItem(
      savedNews,
      news,
      "uri",
      resetAlert,
      userId,
      saveNews,
      bookmarked
    );

  const header = (
    <>
      <button className="mr-3" onClick={handleClick}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {news.title}, {news.byline}, {rDate}
    </>
  );

  return (
    <>
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          dispatch={dispatch}
          dispatchFn={removeNews({ uri: news.uri, userId: userId })}
          confirmMessage={`Removing "${news.title}"?`}
        />
      ) : (
        ""
      )}
      {savedUri === news.uri ||
      previouslySaved ||
      actionFailedId === news.uri ? (
        <div
          className={`flex items-center ${
            actionFailedId ? "bg-red-500" : "bg-green-500"
          } text-white text-lg font-bold px-4 py-3" role="alert"`}
        >
          <FaInfoCircle />
          {actionFailedId ? (
            <p className="ml-1">Action Failed At This Time!</p>
          ) : (
            <p className="ml-1">
              {previouslySaved
                ? `Previously Bookmarked: "${news.title}"`
                : `Bookmarked "${news.title}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-xl">
          <div className="text-left">
            {news.multimedia ? (
              <a
                href={news.short_url}
                target="blank"
                className="italic text-blue-600"
              >
                <img
                  className="inline h-20 w-20"
                  src={news.multimedia[0].url}
                  alt="N/A"
                />
              </a>
            ) : (
              <a
                href={news.short_url}
                target="blank"
                className="italic text-blue-600"
              >
                <BiNews className="inline h-20 w-20" />
              </a>
            )}
          </div>
          {news.abstract},
          <a
            href={news.short_url}
            target="blank"
            className="ml-1 italic text-blue-600 visited:text-purple-600"
          >
            <br />
            Click here to read the full article
          </a>
        </div>
      </ExpandablePanel>
    </>
  );
}

export default NewsListItem;
