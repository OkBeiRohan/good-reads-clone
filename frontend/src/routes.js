import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import UserPage from "./Pages/UserPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user/:id" component={UserPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
