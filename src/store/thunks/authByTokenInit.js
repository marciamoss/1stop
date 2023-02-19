import authByToken from "./authByToken";
const keys = require("../../keys.js");

const authByTokenInit =
  ({ authInfo }) =>
  async (dispatch) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: keys.gAuth.clientId,
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      callback: ({ access_token }) =>
        dispatch(authByToken({ authInfo, access_token })),
      error_callback: (error) =>
        dispatch(
          authInfo({
            signedIn: false,
            authUserId: null,
            userName: null,
            showError: true,
            errorMessage: error.message,
            token: null,
          })
        ),
    });
    client.requestAccessToken();
  };

export default authByTokenInit;
