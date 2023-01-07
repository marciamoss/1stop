import jwt_decode from "jwt-decode";

export const authChange = (authInfo) => async (dispatch, getState) => {
    if (getState().auth.data.signedIn) {
        if(!(getState().auth.data.showError)) {
          window.google.accounts.id.revoke(getState().auth.data.userId, () => {
            dispatch(authInfo({signedIn: false, userId: null, userName: null, showError: false, errorMessage: null}));
          });
        }
    }
    else {
        const handleGoogleSignIn = (response) => {
            const responsePayload = jwt_decode(response.credential);
            dispatch(authInfo({signedIn: true, userId: responsePayload.sub, userName: responsePayload.name, showError: false, errorMessage: null}));
        }
        await window.google.accounts.id.initialize({
            client_id: '526973545082-tq3so0e5fc1rilc26f7vb50on5f2cgp6.apps.googleusercontent.com',
            callback: handleGoogleSignIn,
            auto_select: false
        });
        await window.google.accounts.id.prompt(response => {
            if (response.isNotDisplayed() || response.isSkippedMoment() || response.isDismissedMoment()) {
                document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                if(response.isNotDisplayed()) {
                    dispatch(authInfo({signedIn: false, userId: null, userName: null, showError: true, errorMessage: response.getNotDisplayedReason()}));
                } else if(response.isSkippedMoment()){
                    dispatch(authInfo({signedIn: false, userId: null, userName: null, showError: true, errorMessage: response.getSkippedReason()}));
                }
            }
        });
    }
}