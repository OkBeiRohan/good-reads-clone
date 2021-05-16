import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={LandingPage}/>
      </Switch>
    </Router>
  );
}
