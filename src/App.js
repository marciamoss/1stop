import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";
import NewsPage from "./components/NewsPage/NewsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";

const App = () =>  {
    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.auth.signedIn,
        };
    });
    return (
        <Router>
            <Header/>
            <Routes>
                {signedIn ?
                    <>
                        <Route path="/" element={<LandingPage/>} />
                        <Route path="/music" element={<MusicPage/>} />
                        <Route path="/news" element={<NewsPage/>} />
                        <Route path="/movies" element={<MoviesPage/>}/>
                        <Route path="/books" element={<div className="container text-center text-2xl font-bold">To Do...</div>}/>
                        <Route path="/videos" element={<div className="container text-center text-2xl font-bold">To Do...</div>}/>
                    </>
                :
                    <>
                        {["/", "/music", "/news", "/movies", "/books", "/videos"].map(r => <Route key={r} path={r} element={<LandingPage/>} />)}
                    </>
                }
            </Routes>
        </Router>
    );
};

export default App;