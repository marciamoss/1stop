import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authInfo } from '../store';
import jwt_decode from "jwt-decode";
const keys = require("../keys.js");

function useInitAuth() {
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
        window.google?.accounts?.id?.initialize({
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
}

export default useInitAuth;
