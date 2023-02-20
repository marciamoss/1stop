import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNewsSection, fetchNews } from "../../store";
import NewsList from "./NewsList";
import Dropdown from "../Dropdown";
import "./NewsPage.css";
import { SECTIONS } from "../../constants/types";

const NewsPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();

  const { section, newsList } = useSelector((state) => {
    return {
      section: state.news.section,
      newsList: state.news.newsList,
    };
  });

  const handleSelect = (option) => {
    dispatch(setNewsSection(option));
  };

  return (
    <div className="container news-page-content">
      <h5 className="text-right text-blue-600">
        {!bookmarkedPage ? (
          <Link className="link" to="/news/bookmarked">
            Bookmarked
          </Link>
        ) : (
          <Link className="link" to="/news">
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <NewsList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div className="flex">
            <div>
              <Dropdown
                options={SECTIONS}
                value={section}
                onChange={handleSelect}
                category={"Pick a news category"}
              />
            </div>
            <div
              className={`${
                section ? "bg-blue-300 font-bold" : "bg-gray-100 text-slate-300"
              } border-solid self-end  ml-1 rounded h-fit text-sm border-2`}
            >
              <button
                disabled={!section}
                onClick={() => dispatch(fetchNews(section))}
                className="p-2"
              >
                Search
              </button>
            </div>
          </div>
          <NewsList list={newsList} bookmarked={false} />
        </>
      )}
    </div>
  );
};

export default NewsPage;
