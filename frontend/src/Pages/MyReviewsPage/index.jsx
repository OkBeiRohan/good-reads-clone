import React from "react";
import Footer from "../../lib/Footers";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function MyReviewsPage() {
  document.title = "My Reviews - Reader Giant";
  return (
    <>
      <SignedInHeader />
      <Footer />
    </>
  );
}

export default MyReviewsPage;
