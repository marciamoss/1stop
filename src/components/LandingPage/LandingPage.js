import React from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import MovingComponent from 'react-moving-text';
import "./LandingPage.css";

const LandingPage = () => {
  const location = useLocation();
  const showLanding = (["/", "/music", "/news", "/movies"].filter(r => r===location.pathname)).length>0;
  const {signedIn, errorMessage} = useSelector((state) => {
    return {
        signedIn: state.auth.signedIn,
        errorMessage: state.auth.errorMessage,
    };
  });
  if (!showLanding) {
      return;
  }
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
          {[{label: "Music", link: "/music", delay: "500ms"}, {label: "News", link: "/news", delay: "1000ms"}, {label: "Movies", link: "/movies", delay: "1500ms"}].map(e =>
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
          {errorMessage === 'opt_out_or_no_session' ? <div className="text-3xl text-red-600 font-bold ml-5 mr-5"><br></br>Login to your google account in this browser before you try again</div> : ''}
          <MovingComponent
            type="effect3D"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            fillMode="none">
            Sign-In by clicking above to see the contents
          </MovingComponent>
        </>
      }
    </div>
  );
}

export default LandingPage;