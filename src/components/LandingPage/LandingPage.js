import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import MovingComponent from 'react-moving-text';
import { addUser, fetchUser } from '../../store';
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const {signedIn, userId, errorMessage, newUser} = useSelector((state) => {
      return {
          signedIn: state.auth.data.signedIn,
          userId: state.auth.data.userId,
          errorMessage: state.auth.data.errorMessage,
          newUser: state.user.data.newUser
      };
  });
  useEffect(() => {
    if(signedIn) {
      dispatch(fetchUser(userId));
    }
  }, [signedIn, dispatch, userId]);

  useEffect(() => {
    if(newUser){
      dispatch(addUser(userId));
    }
  }, [ newUser, dispatch, userId]);
  return (
    <div className="container mx-auto landing-page-content">
      {signedIn ?
        <>
          <MovingComponent
            type="effect3D"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            fillMode="none">
            What's on your mind?
          </MovingComponent>
          <>
          {[{label: "Music", link: "/music", delay: "500ms"}, {label: "News", link: "/news", delay: "1000ms"}, {label: "Movies", link: "/movies", delay: "1500ms"},
            {label: "Books", link: "/books", delay: "2000ms"}, {label: "Videos", link: "/videos", delay: "2500ms"}].map(e =>
              <div key={e.label} className="landing-page-items">
                <MovingComponent
                  type="slideInFromLeft"
                  duration="1000ms"
                  delay={e.delay}
                  direction="normal"
                  timing="ease"
                  iteration="1"
                  fillMode="backwards">
                  <Link className="link" to={e.link}>{e.label}</Link>
                </MovingComponent>
              </div>
            )}
          </>
        </>
      :
        <>
          <MovingComponent
            type="effect3D"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            fillMode="none">
            Sign-In by clicking above to see the contents
          </MovingComponent>
          {errorMessage === 'opt_out_or_no_session' ? <div className="text-2xl text-red-600 font-bold ml-5 mr-5"><br></br>Login to your google account in this browser before you try again</div> : ''}
        </>
      }
    </div>
  );
}

export default LandingPage;
