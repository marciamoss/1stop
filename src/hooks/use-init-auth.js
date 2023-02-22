import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authInfo, authChange } from "../store";
const keys = require("../keys.js");

function useInitAuth() {
  const dispatch = useDispatch();
  const { token, authUserId, userName } = localStorage.getItem("1stop")
    ? JSON.parse(localStorage.getItem("1stop"))
    : "";

  useEffect(() => {
    if (authUserId) {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          auto_select: false,
        });
      }
      dispatch(
        authInfo({
          signedIn: true,
          token,
          authUserId,
          userName,
          showError: false,
          errorMessage: null,
        })
      );
    } else {
      dispatch(authChange(authInfo, true));
    }
  }, [dispatch, token, authUserId, userName]);
}

export default useInitAuth;
