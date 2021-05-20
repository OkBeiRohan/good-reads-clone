import React from "react";

// import "./styles.css";

function BookDetails({ isbn }) {
  document.title = isbn + " Book - Reader Giant";
  return <div className="mainContentContainer">{isbn}</div>;
}

export default BookDetails;
