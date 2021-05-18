import React, { useEffect, useState } from "react";
import SignedOutHeader from "../../lib/Headers/Landing/SignedOut";
import SignedInHeader from "../../lib/Headers/Landing/SignedIn";
import LoadingScreen from "react-loading-screen";
import "./styles.css";

function LandingPage() {
  document.title = "Reader Giant - We know what you'll love!";

  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="/assets/img/logo.png"
        text=""
      />
      {signedIn ? <SignedInHeader /> : <SignedOutHeader />}
    </>
  );
}

export default LandingPage;
