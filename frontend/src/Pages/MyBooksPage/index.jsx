import React from "react";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function MyBooksPage() {
  document.title = "My Books - Reader Giant";
  return (
    <>
      <SignedInHeader />
    </>
  );
}

export default MyBooksPage;
