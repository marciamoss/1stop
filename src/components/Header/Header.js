import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { authInfo, authChange } from "../../store";
import { useFetchUser, useAddUser, useCheckRoute } from "../../hooks";
import PageNotFound from "../PageNotFound/PageNotFound";
import { APPROUTES } from "../../constants/types";

const Header = () => {
  useCheckRoute();
  const location = useLocation();
  const dispatch = useDispatch();
  const { signedIn, userName, showError, errorMessage } = useSelector(
    (state) => {
      return {
        signedIn: state.auth.signedIn,
        userName: state.auth.userName,
        showError: state.auth.showError,
        errorMessage: state.auth.errorMessage,
      };
    }
  );
  useFetchUser();
  useAddUser();

  const showHeader =
    APPROUTES.filter((r) => r === location.pathname).length > 0;
  if (!showHeader) {
    return <PageNotFound />;
  }
  return (
    <nav className="py-6 px-10 w-full bg-black">
      <div className="flex justify-between items-center container mx-auto bg-black">
        <div>
          <h1 className="text-xl text-zinc-50 font-bold">
            <Link to="/">1Stop</Link>
          </h1>
        </div>
        <>
          {showError ? (
            <div>
              <h1 className="text-xl text-red-600 font-bold ml-5 mr-5">
                Signin Failure: {errorMessage}, Try again
              </h1>
            </div>
          ) : (
            ""
          )}
        </>
        <>
          {signedIn ? (
            <div>
              <h1 className="text-center text-xl text-zinc-50 font-bold">
                Hello {userName}
              </h1>
            </div>
          ) : (
            ""
          )}
        </>
        <button
          onClick={() => dispatch(authChange(authInfo))}
          className="text-xl text-zinc-50 font-bold"
        >
          <div className="flex items-center">
            <span className="mr-1">{!signedIn ? "Sign In" : "Sign Out"}</span>
            <FcGoogle />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Header;
