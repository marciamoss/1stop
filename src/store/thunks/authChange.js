export const authChange = (authInfo) => async (dispatch, getState) => {
    if (getState().auth.signedIn) {
        if(!(getState().auth.showError)) {
          window.google.accounts.id.revoke(getState().auth.authUserId, () => {
            localStorage.removeItem("authInfo_1stop");
            dispatch(authInfo({signedIn: false, authUserId: null, userName: null, showError: false, errorMessage: null}));
          });
        }
    }
    else {
        await window.google.accounts.id.prompt(response => {
            if(response.getDismissedReason() !== 'credential_returned') {
                localStorage.removeItem("authInfo_1stop");
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