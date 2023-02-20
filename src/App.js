import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";
import NewsPage from "./components/NewsPage/NewsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import VideosPage from "./components/VideosPage/VideosPage";
import { useInitAuth } from "./hooks";
import { APPROUTES } from "./constants/types";

const App = () => {
  const { signedIn } = useSelector((state) => {
    return {
      signedIn: state.auth.signedIn,
    };
  });
  useInitAuth();
  return (
    <Router>
      <Header />
      <Routes>
        {signedIn ? (
          <>
            {[
              { r: "/", p: <LandingPage /> },
              { r: "/music", p: <MusicPage /> },
              { r: "/news", p: <NewsPage /> },
              {
                r: "/news/bookmarked",
                p: <NewsPage bookmarkedPage={true} />,
              },
              { r: "/movies", p: <MoviesPage /> },
              { r: "/videos", p: <VideosPage /> },
            ].map((rt) => (
              <Route key={rt.r} path={rt.r} element={rt.p} />
            ))}
          </>
        ) : (
          <>
            {APPROUTES.map((r) => (
              <Route key={r} path={r} element={<LandingPage />} />
            ))}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
