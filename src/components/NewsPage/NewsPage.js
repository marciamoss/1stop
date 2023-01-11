import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setNewsSection, fetchNews } from '../../store';
import NewsList from "./NewsList";
import Dropdown from "../Dropdown";
import "./NewsPage.css";

const NewsPage = () => {
  const dispatch = useDispatch();

  const {section} = useSelector((state) => {
    return {
      section: state.news.section,
    };
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if(section) {
        dispatch(fetchNews(section));
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [section, dispatch]);

  const handleSelect = (option) => {
    dispatch(setNewsSection(option));
  };
  const sections = ["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Home", "Insider", "Magazine", "NY Region", "obituaries", "Opinion", "Politics", "Real Estate", "Science", "Sports", "Sunday Review", "Technology", "Theater", "T-Magazine", "Travel", "Upshot", "US", "World"];

  return (
    <div className="container news-page-content">
      <div className="flex">
        <Dropdown options={sections} value={section} onChange={handleSelect} category={'Pick a news category'}/>
      </div>
      <NewsList/>
    </div>
  )
}

export default NewsPage;