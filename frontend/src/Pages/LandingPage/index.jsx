import React, { useEffect, useState } from "react";
import SignedOutHeader from "../../lib/Headers/Landing/SignedOut";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import "./styles.css";

function LandingPage() {
  document.title = "Reader Giant - We know what you'll love!";

  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkAuth(jwt) {
      try {
        const res = await api.post(
          "/user/auth",
          {},
          {
            headers: { Authorization: `Bearer ${jwt.token}` },
          }
        );
        if (res.data.auth_status) {
          setTimeout(() => {
            setLoading(false);
          }, [1000]);
          setSignedIn(true);
        } else {
          setLoading(false);
          localStorage.removeItem("currentUser");
        }
      } catch (e) {
        localStorage.removeItem("currentUser");
        setTimeout(() => {
          setLoading(false);
        }, [500]);
      }
    }
    if (localStorage.getItem("currentUser") !== null) {
      setLoading(true);
      const obj = localStorage.getItem("currentUser");
      const jwt = JSON.parse(obj);
      checkAuth(jwt);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    }
  }, [history]);

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
      {signedIn ? <SignedOutHeader /> : <SignedOutHeader />}
    </>
  );
}

export default LandingPage;
