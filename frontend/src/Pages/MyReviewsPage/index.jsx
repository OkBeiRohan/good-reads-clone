import React from "react";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function MyReviewsPage() {
  document.title = "My Reviews - Reader Giant";
  return (
    <>
      <SignedInHeader />
    </>
  );
}

export default MyReviewsPage;
