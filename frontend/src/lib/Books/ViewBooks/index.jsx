import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import StarRatings from "react-star-ratings";

import "./styles.css";

function ViewBooks({ genre, signedIn, token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (signedIn === true) {
        try {
          const res = await api.post(
            "/user/viewbooks",
            { genre },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (res.data)
            if (res.data.status) setData(res.data);
            else setData(res.data);
          else setData({ status: false });
        } catch (e) {
          setData({ status: false, type: "catch", error: "" + e });
        }
      } else {
        try {
          const res = await api.post("/api/viewbooks", { genre });
          if (res.data)
            if (res.data.status) setData(res.data);
            else setData(res.data);
          else setData({ status: false });
        } catch (e) {
          setData({ status: false, type: "catch", error: "" + e });
        }
      }
    }
    loadData();
  }, [signedIn, genre, token]);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="mainContentFloat">
          <div className="leftContainer">
            <div style={{ margin: "10px 0px 10px 0px" }}>
              <h1
                style={{
                  fontSize: "24px",
                  float: "left",
                  textTransform: "capitalize",
                }}
              >
                {genre === "all" ? "Top Rated Books" : genre}
              </h1>
              <div style={{ float: "right" }}>
                <div style={{ width: "180px" }}>
                  {genre === "all" ? (
                    ""
                  ) : signedIn && data !== null ? (
                    <button
                      className={
                        data.isLiked
                          ? "genreLikeButton bookLiked liked"
                          : "genreLikeButton bookLiked"
                      }
                    >
                      {data.isLiked ? "Liked" : "Like"}
                    </button>
                  ) : (
                    ""
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
                {data !== null
                  ? data.status
                    ? data.data.map((book, index) => (
                        <div key={index} className="book">
                          <img
                            src={book.cover_img}
                            alt=""
                            className="bookTitleImage"
                            style={{ width: "auto", height: "200px" }}
                          />
                          <div className="bookSearchDetails">
                            <a href={"/book/" + book.ibn}>
                              <h2>{book.title}</h2>
                            </a>
                            <div className="bookSearchAuthor">
                              By {book.author}
                              <br />
                              Rating:{" "}
                              <StarRatings
                                rating={book.avg_rating}
                                starRatedColor="orange"
                                starDimension="15px"
                                starSpacing="0px"
                                numberOfStars={5}
                                name="rating"
                              />
                              <br />
                              Language: {book.language}
                            </div>
                            <div className="bookSearchDescription">
                              {book.description}
                            </div>
                          </div>
                        </div>
                      ))
                    : "No Books Found"
                  : "Please Wait"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBooks;
