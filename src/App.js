import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";
import NewsPage from "./components/NewsPage/NewsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import VideosPage from "./components/VideosPage/VideosPage";
import { useInitAuth } from './hooks';

const App = () =>  {
    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.auth.signedIn,
        };
    });
    useInitAuth();
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
                        <Route path="/videos" element={<VideosPage/>}/>
                    </>
                :
                    <>
                        {["/", "/music", "/news", "/movies", "/videos"].map(r => <Route key={r} path={r} element={<LandingPage/>} />)}
                    </>
                }
            </Routes>
        </Router>
    );

};

export default App;