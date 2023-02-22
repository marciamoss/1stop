import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import { useInitAuth } from "./hooks";
import { APPROUTES, APPROUTESCOMPONENTS } from "./constants/types";

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
            {APPROUTESCOMPONENTS.map((rt) => (
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
