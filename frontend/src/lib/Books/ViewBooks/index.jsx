import React from "react";

import "./styles.css";

function ViewBooks({ genre }) {
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="mainContentFloat">
          <div className="leftContainer">
            <div style={{ margin: "10px 0px 10px 0px" }}>
              <h1 style={{ fontSize: "24px", float: "left" }}>
                {genre === "all" ? "Top Rated Books" : genre}
              </h1>
              <div style={{ float: "right" }}>
                <div style={{ width: "180px" }}>
                  {genre === "all" ? (
                    ""
                  ) : (
                    <button className="genreLikeButton">Liked</button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ fontSize: "14px", marginBottom: "30px" }}>
              <span style={{ display: "inline" }}>
                Find the best books and have your moment with them here. Start
                browsing books below
              </span>
            </div>
            <div className="booksContainer">
              <div className="viewBooksHeader">
                <h2>
                  {genre === "all"
                    ? "Top Rated Books"
                    : "Top rated books from " + genre}
                </h2>
              </div>
              <div className="viewBooks">
                <div className="book">
                  <img
                    src="https://i.ibb.co/vdnNPsh/51-Uoq-RAxw-EL.jpg"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBooks;
