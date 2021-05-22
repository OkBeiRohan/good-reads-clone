import React from "react";
import Footer from "../../lib/Footers";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function MyBooksPage() {
  document.title = "My Books - Reader Giant";
  return (
    <>
      <SignedInHeader />
      <Footer />
    </>
  );
}

export default MyBooksPage;
