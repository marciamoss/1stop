import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";
import NewsPage from "./components/NewsPage/NewsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import { authInfo } from './store';
import jwt_decode from "jwt-decode";
const keys = require("./keys.js");

const App = () =>  {
    const dispatch = useDispatch();
    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.auth.signedIn,
        };
    });
    useEffect(() => {
        const handleGoogleSignIn = (response) => {
            const responsePayload = jwt_decode(response.credential);
            localStorage.setItem("authInfo_1stop", JSON.stringify({signedIn: true, authUserId: responsePayload.sub, userName: responsePayload.name, showError: false, errorMessage: null}));
            dispatch(authInfo({signedIn: true, authUserId: responsePayload.sub, userName: responsePayload.name, showError: false, errorMessage: null}));
        }
        window.google.accounts.id.initialize({
            client_id: keys.gAuth.clientId,
            callback: handleGoogleSignIn,
            auto_select: false
        });
        if(document.cookie.indexOf('g_state={"i_l":0}') < 0) {
            localStorage.removeItem("authInfo_1stop");
        }
        if(!signedIn && (document.cookie.indexOf('g_state={"i_l":0}') >= 0) && localStorage.getItem("authInfo_1stop")) {
            dispatch(authInfo(JSON.parse(localStorage.getItem("authInfo_1stop"))));
        }
    },[signedIn, dispatch])

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
                    </>
                :
                    <>
                        {["/", "/music", "/news", "/movies"].map(r => <Route key={r} path={r} element={<LandingPage/>} />)}
                    </>
                }
            </Routes>
        </Router>
    );
};

export default App;