import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import MovingComponent from 'react-moving-text';
import { addUser } from '../../store';
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const {signedIn, userId} = useSelector((state) => {
      return {
          signedIn: state.auth.data.signedIn,
          userId: state.auth.data.userId
      };
  });
  useEffect(() => {
    if(signedIn) {
      dispatch(addUser(userId));
    }
  }, [signedIn, dispatch, userId]);
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
            {[{label: "Music", link: "/music", delay: "500ms"}, {label: "News", link: "/news", delay: "1000ms"}].map(e =>
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
        <MovingComponent
          type="effect3D"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          fillMode="none">
          Sign-In by clicking above to see the contents
        </MovingComponent>
      }
    </div>
  );
}

export default LandingPage;
