import React, { useEffect, useState } from "react";
import api from "../../../services/api";

import "./styles.css";

function BookDetails({ isbn }) {
  const [data, setData] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.post("/api/findbook", { ibn: isbn });
        if (res.data) if (res.data.status) setData(res.data);
      } catch (e) {}
    }
    getData();
  }, [isbn]);

  document.title = data
    ? data.data.title
      ? data.data.title + " Book - Reader Giant"
      : "Reader Giant"
    : "Reader Giant";

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        {data !== null ? (
          data.status ? (
            <div className="mainContentFloat">
              <div className="bookDetails">
                <div id="topcol">
                  <div className="bookImage">
                    <div className="bookTitleImage">
                      <img src={data.data.cover_img} alt={data.data.title} />
                    </div>
                  </div>
                  <div className="bookData">
                    <h1 className="bookTitle">{data.data.title}</h1>
                    <div className="bookAuthor">by {data.data.author}</div>
                    <div className="bookRatingContainer">
                      <div className="bookRating">
                        <span
                          size="12x12"
                          className={
                            data.data.avg_rating >= 1
                              ? "staticStar p10"
                              : "staticStar p0"
                          }
                        ></span>
                        <span
                          size="12x12"
                          className={
                            data.data.avg_rating >= 2
                              ? "staticStar p10"
                              : "staticStar p0"
                          }
                        ></span>
                        <span
                          size="12x12"
                          className={
                            data.data.avg_rating >= 3
                              ? "staticStar p10"
                              : "staticStar p0"
                          }
                        ></span>
                        <span
                          size="12x12"
                          className={
                            data.data.avg_rating >= 4
                              ? "staticStar p10"
                              : "staticStar p0"
                          }
                        ></span>
                        <span
                          size="12x12"
                          className={
                            data.data.avg_rating >= 5
                              ? "staticStar p10"
                              : "staticStar p0"
                          }
                        ></span>
                      </div>{" "}
                      <span style={{ color: "rgb(123 123 123)" }}>
                        {data.data.avg_rating}
                      </span>
                      <span style={{ color: "#000", marginLeft: "10px" }}>
                        From {data.data.reviews.length} Ratings
                      </span>
                      <br />
                    </div>
                    <div className="bookDescription">
                      {data.data.description}
                    </div>
                    {isbn}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BookDetails;
