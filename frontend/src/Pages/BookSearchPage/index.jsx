import React, { useState, useEffect } from "react";
import Footer from "../../lib/Footers";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";
import SignedOutHeader from "../../lib/Headers/Common/SignedOut";
import checkAuth from "../../services/auth";
import LoadingScreen from "react-loading-screen";
import SearchBook from "../../lib/Books/SearchBook";

function BookSearchPage({
  match: {
    params: { query },
  },
}) {
  document.title = "Search - Reader Giant";
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function auth() {
      const res = await checkAuth();
      setSignedIn(res.signedIn);
      setTimeout(() => {
        setLoading(res.loading);
      }, [1000]);
    }
    auth();
  }, []);
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
      <Footer />
      <SearchBook query={query} />
    </>
  );
}

export default BookSearchPage;
