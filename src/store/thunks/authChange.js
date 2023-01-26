import jwt_decode from "jwt-decode";
const keys = require("../../keys.js");

export const authChange = (authInfo, initalRender=false) => async (dispatch, getState) => {
    if(window.google) {
        if (getState().auth.signedIn) {
            if(!(getState().auth.showError)) {
            window.google.accounts.id.revoke(getState().auth.authUserId, () => {
                dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: false, errorMessage: null}));
            });
            }
        }
        else {
            const handleGoogleSignIn = (response) => {
                const responsePayload = jwt_decode(response.credential);
                dispatch(authInfo({signedIn: true, authUserId: responsePayload.sub, userName: responsePayload.name, showError: false, errorMessage: null}));
            }
            await window.google.accounts.id.initialize({
                client_id: keys.gAuth.clientId,
                callback: handleGoogleSignIn,
                auto_select: false
            });
            await window.google.accounts.id.prompt(response => {
                if(response.getDismissedReason() !== 'credential_returned') {
                    if (response.isNotDisplayed() || response.isSkippedMoment() || response.isDismissedMoment()) {
                        document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                        if(response.isNotDisplayed()) {
                            if(response.getNotDisplayedReason() === "opt_out_or_no_session") {
                                if(!initalRender) {
                                    const client = window.google.accounts.oauth2.initTokenClient({
                                        client_id: keys.gAuth.clientId,
                                        scope: "email",
                                        callback: (()=>dispatch(authChange(authInfo))),
                                        error_callback: ((error) => dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: error.message})))
                                    });
                                    client.requestAccessToken();
                                }
                            } else {
                                dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getNotDisplayedReason()}));
                            }
                        } else if(response.isSkippedMoment()){
                            if(response.getSkippedReason() !== "tap_outside") {
                                dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getSkippedReason()}));
                            }
                        }
                    }
                }
            });
        }
    }
}
