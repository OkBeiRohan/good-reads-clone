import React from "react";
import Footer from "../../lib/Footers";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function AddBookPage() {
  document.title = "Add Book - Reader Giant";
  return (
    <>
      <SignedInHeader />
      <Footer />
    </>
  );
}

export default AddBookPage;
