import React from "react";

// import "./styles.css";

function SearchBook({ query }) {
  document.title = query + " - Reader Giant";
  return (
    <div className="mainContentContainer">
      <div className="mainContent">{query}</div>
    </div>
  );
}

export default SearchBook;
