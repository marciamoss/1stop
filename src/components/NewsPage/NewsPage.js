import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNewsSection, fetchNews } from "../../store";
import NewsList from "./NewsList";
import Dropdown from "../Dropdown";
import "./NewsPage.css";
import { SECTIONS } from "../../constants/types";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";

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
    <div className="container max-[770px]:text-sm text-xl text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/news/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/news"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <NewsList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div className="flex">
            <div className="relative w-1/3 max-[770px]:w-full m-2">
              <Dropdown
                options={SECTIONS}
                value={section}
                onChange={handleSelect}
                category={"Pick a news category"}
              />
              <div className="absolute top-10 left-1 max-[770px]:top-8">
                <Button
                  disabled={!section}
                  loading={isLoading}
                  onClick={() => dispatch(fetchNews(section))}
                  className={`h-fit w-fit border-0 ${
                    section
                      ? "text-blue-900 hover:text-green-900"
                      : "text-slate-300"
                  }  ${isLoading ? "text-green-900 text-2xl" : ""}`}
                >
                  <FaSearch size={30} />
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
