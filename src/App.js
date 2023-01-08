import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";

const App = () =>  {
    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.auth.data.signedIn,
        };
    });
    return (
        <Router>
            <Header/>
            <Routes>
                {signedIn ?
                    <>
                    <Route path="/" element={<LandingPage/>} />
                    </>
                :
                    <>
                    {["/"].map(r => <Route key={r} path={r} element={<LandingPage/>} />)}
                    </>
                }
            </Routes>
        </Router>
    );
};

export default App;