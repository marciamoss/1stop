import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setNewsSection, fetchNews } from '../../store';
import NewsList from "./NewsList";
import Dropdown from "../Dropdown";
import "./NewsPage.css";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [showBookmarked, setShowBookmarked] = useState(false);

  const {section, newsList, savedNews } = useSelector((state) => {
    return {
      section: state.news.section,
      newsList: state.news.newsList,
      savedNews: state.news.savedNews
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

  useEffect(() => {
    if(savedNews.length===0) {
      setShowBookmarked(false);
    }
  }, [savedNews]);

  const handleSelect = (option) => {
    dispatch(setNewsSection(option));
  };
  const sections = ["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Home", "Insider", "Magazine", "NY Region", "Obituaries", "Opinion", "Politics", "Real Estate", "Science", "Sports", "Sunday Review", "Technology", "Theater", "T-Magazine", "Travel", "Upshot", "US", "World"];

  return (
    <div className="container news-page-content">
      {savedNews.length > 0 ?
        <h5 className="text-right text-blue-600">
          <button onClick={()=>setShowBookmarked(!showBookmarked)}>{!showBookmarked ? 'Bookmarked' : 'Back to Search'}</button>
        </h5> : ''}
        {showBookmarked ? <NewsList list={savedNews} bookmarked={true}/> :
        <>
        <div className="flex">
          <Dropdown options={sections} value={section} onChange={handleSelect} category={'Pick a news category'}/>
        </div>
        <NewsList list={newsList} bookmarked={false}/>
        </>}
    </div>
  )
}

export default NewsPage;