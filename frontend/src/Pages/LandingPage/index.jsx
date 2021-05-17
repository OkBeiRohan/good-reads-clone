import React from "react";
import SignedOutHeader from "../../lib/Headers/Landing/SignedOut";
import "./styles.css";

function LandingPage() {
  document.title = "Reader Giant - We know what you'll love!";
  return <SignedOutHeader />;
}

export default LandingPage;
