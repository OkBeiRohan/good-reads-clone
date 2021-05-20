import React from "react";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";

function AddBookPage() {
  document.title = "Add Book - Reader Giant";
  return (
    <>
      <SignedInHeader />
    </>
  );
}

export default AddBookPage;
