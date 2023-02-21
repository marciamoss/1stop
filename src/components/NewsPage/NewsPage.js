import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNewsSection, fetchNews } from "../../store";
import NewsList from "./NewsList";
import Dropdown from "../Dropdown";
import "./NewsPage.css";
import { SECTIONS } from "../../constants/types";
import Button from "../Button";
import { BsSearch } from "react-icons/bs";

const NewsPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();

  const { section, newsList, isLoading } = useSelector((state) => {
    return {
      section: state.news.section,
      newsList: state.news.newsList,
      isLoading: state.news.isLoading,
    };
  });

  const handleSelect = (option) => {
    dispatch(setNewsSection(option));
  };

  return (
    <div className="container news-page-content">
      <h5 className="text-right text-blue-600">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold text-2xl"
            to="/news/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link className="text-blue-900 italic font-bold text-2xl" to="/news">
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <NewsList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div className="flex">
            <div className="relative w-1/3">
              <Dropdown
                options={SECTIONS}
                value={section}
                onChange={handleSelect}
                category={"Pick a news category"}
              />
              <div className="absolute top-11 left-2 mr-10">
                <Button
                  disabled={!section}
                  loading={isLoading}
                  onClick={() => dispatch(fetchNews(section))}
                  className={`h-10 w-fit text-white rounded-lg ${
                    section
                      ? "bg-blue-900 hover:bg-green-900"
                      : "bg-gray-100 text-slate-300"
                  }  ${isLoading ? "bg-green-900" : ""}`}
                >
                  <BsSearch size={25} />
                </Button>
              </div>
            </div>
          </div>
          <NewsList list={newsList} bookmarked={false} />
        </>
      )}
    </div>
  );
};

export default NewsPage;
