import jwt_decode from "jwt-decode";
const keys = require("../../keys.js");

export const authChange = (authInfo) => async (dispatch, getState) => {
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
                        dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getNotDisplayedReason()}));
                    } else if(response.isSkippedMoment()){
                        dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: response.getSkippedReason()}));
                    }
                }
            }
        });
    }
}