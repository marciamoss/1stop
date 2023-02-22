import jwt_decode from "jwt-decode";
import authByTokenInit from "./authByTokenInit";
const keys = require("../../keys.js");

export const authChange =
  (authInfo, initialRender = false) =>
  async (dispatch, getState) => {
    if (window.google && getState().auth.validRoute) {
      if (getState().auth.signedIn) {
        localStorage.removeItem("1stop");
        const revokeFn = getState().auth.token
          ? window.google.accounts.oauth2.revoke
          : window.google.accounts.id.revoke;
        const revokeId = getState().auth.token
          ? getState().auth.token
          : getState().auth.authUserId;
        revokeFn(revokeId, () => {
          dispatch(
            authInfo({
              signedIn: false,
              authUserId: null,
              userName: null,
              showError: false,
              errorMessage: null,
              token: null,
            })
          );
        });
      } else {
        const handleGoogleSignIn = (response) => {
          const responsePayload = jwt_decode(response.credential);
          localStorage.setItem(
            "1stop",
            JSON.stringify({
              token: null,
              authUserId: responsePayload.sub,
              userName: responsePayload.name,
            })
          );
          dispatch(
            authInfo({
              signedIn: true,
              authUserId: responsePayload.sub,
              userName: responsePayload.name,
              showError: false,
              errorMessage: null,
              token: null,
            })
          );
        };
        await window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          callback: handleGoogleSignIn,
          auto_select: false,
        });
        await window.google.accounts.id.prompt((response) => {
          if (response.getDismissedReason() !== "credential_returned") {
            if (
              response.isNotDisplayed() ||
              response.isSkippedMoment() ||
              response.isDismissedMoment()
            ) {
              document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
              if (response.isNotDisplayed()) {
                if (
                  response.getNotDisplayedReason() === "opt_out_or_no_session"
                ) {
                  if (!initialRender) {
                    dispatch(authByTokenInit({ authInfo }));
                  }
                } else {
                  dispatch(
                    authInfo({
                      signedIn: false,
                      authUserId: null,
                      userName: null,
                      showError: true,
                      errorMessage: response.getNotDisplayedReason(),
                      token: null,
                    })
                  );
                }
              } else if (response.isSkippedMoment()) {
                if (response.getSkippedReason() !== "tap_outside") {
                  dispatch(
                    authInfo({
                      signedIn: false,
                      authUserId: null,
                      userName: null,
                      showError: true,
                      errorMessage: response.getSkippedReason(),
                      token: null,
                    })
                  );
                }
              }
            }
          }
        });
      }
    }
  };
