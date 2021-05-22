import React, { useEffect, useState } from "react";
import api from "../../services/api";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";
import SignedOutHeader from "../../lib/Headers/Common/SignedOut";
import checkAuth from "../../services/auth";
import LoadingScreen from "react-loading-screen";
import Footer from "../../lib/Footers";

function UserPage({
  match: {
    params: { id },
  },
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  document.title = data
    ? data.status
      ? data.data.name + " - Reader Giants' Community"
      : "Reader Giant"
    : "Reader Giant";

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.post("/api/user", {
          id,
        });
        if (res.data) setData(res.data);
        else setData({ status: false, type: "nodata" });
      } catch (e) {
        setData({ status: false, type: "error", error: "" + e });
      }
    }
    getUser();

    async function auth() {
      const res = await checkAuth();
      setSignedIn(res.signedIn);
      setTimeout(() => {
        setLoading(res.loading);
      }, [1000]);
    }
    auth();
  }, [id]);

  return (
    <>
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="/assets/img/logo.png"
        text=""
      >
        <></>
      </LoadingScreen>
      {signedIn ? <SignedInHeader /> : <SignedOutHeader />}
      <h1>ID: {id}</h1>
      <br />
      <br />
      {data !== null ? (
        <>
          {data.status ? (
            <>
              <h1>Name: {data.data.name}</h1>
              <h1>Sex: {data.data.sex}</h1>
              <h1>Email: {data.data.username}</h1>
            </>
          ) : data.type === "empty" ? (
            "User Doesn't Exists"
          ) : data.type === "db" ? (
            "Connection Error!"
          ) : (
            data.error
          )}
        </>
      ) : (
        "Please Wait!"
      )}
      <Footer />
    </>
  );
}

export default UserPage;
