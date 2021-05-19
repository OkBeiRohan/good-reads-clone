import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import checkAuth from "./services/auth";
import DiscoverPage from "./Pages/DiscoverPage";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import UserPage from "./Pages/UserPage";
import LoadingScreen from "react-loading-screen";

function PrivateRoute({ component: Component, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    checkAuth().then((res) => {
      setSignedIn(res.signedIn);
      setTimeout(() => {
        setLoading(res.loading);
      }, [500]);
    });
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loading ? (
          <LoadingScreen
            loading={loading}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            logoSrc="/assets/img/logo.png"
            text=""
          />
        ) : signedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/user/:id" component={UserPage} />
        <PrivateRoute
          exact
          path="/discover/loggedin"
          component={DiscoverPage}
        />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
