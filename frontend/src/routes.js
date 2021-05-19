import React from "react";
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

async function PrivateRoute({ component: Component, ...rest }) {
  const { signedIn } = await checkAuth();
  console.log(signedIn);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return true ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
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
