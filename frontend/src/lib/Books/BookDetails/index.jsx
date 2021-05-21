import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import StarRatings from "react-star-ratings";
import checkAuth from "../../../services/auth";

import "./styles.css";

function BookDetails({ isbn }) {
  const [data, setData] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function auth() {
      const res = await checkAuth();
      setSignedIn(res.signedIn);
      if (res.signedIn) {
        setToken(res.token);
        try {
          const resx = await api.post(
            "/user/findbook",
            { ibn: isbn },
            {
              headers: { Authorization: `Bearer ${res.token}` },
            }
          );
          if (resx.data) {
            setData(resx.data);
            setReviewed(resx.data.isReviewed);
            setIsLiked(resx.data.isLiked);
          }
        } catch (e) {
          setData({ status: false, type: "catch", error: e });
        }
      } else {
        try {
          const resx = await api.post("/api/findbook", { ibn: isbn });
          if (resx.data) setData(resx.data);
        } catch (e) {
          setData({ status: false, type: "catch", error: e });
        }
      }
    }
    auth();
  }, [isbn]);

  document.title = data
    ? data.data.title
      ? data.data.title + " Book - Reader Giant"
      : "Reader Giant"
    : "Reader Giant";

  const submitReview = async () => {
    if (rating === 0) {
      setMessage("Please select a rating!");
      return;
    }
    if (comment === "") {
      setMessage("Enter your review!");
      return;
    }
    try {
      const res = await api.post(
        "/user/addreview",
        {
          rating,
          comment,
          ibn: data.data.ibn,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.status) {
        setMessage("Review added. Thankyou for your contribution");
        setReviewed(true);
      } else if (res.data.type === "exists")
        setMessage("You have already reviewed for this title");
      else if (res.data.auth_status === false) {
        setMessage("Authentication Error! Try refreshing!");
        return;
      } else setMessage("Unknown Error Occurred!");
    } catch (e) {
      setMessage("" + e);
    }
  };

  const likeHandler = async () => {
    setDisabled(true);
    try {
      const res = await api.post(
        "/user/likebook",
        {
          liked: isLiked,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.status) {
        setDisabled(false);
        if (isLiked) setIsLiked(false);
        else setIsLiked(true);
      }
    } catch (e) {
      setDisabled(false);
      console.log(e);
    }
  };

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
                      {data.data.avg_rating > 0 ||
                      data.data.reviews.length > 0 ? (
                        <>
                          <div className="bookRating">
                            <StarRatings
                              rating={data.data.avg_rating}
                              starRatedColor="orange"
                              starDimension="15px"
                              starSpacing="0px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </div>{" "}
                          <span style={{ color: "rgb(123 123 123)" }}>
                            {data.data.avg_rating}
                          </span>
                          <span style={{ color: "#000", marginLeft: "10px" }}>
                            From {data.data.reviews.length} Ratings
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "#000", marginBottom: "10px" }}>
                          No reviews yet!
                        </span>
                      )}
                      <br />
                    </div>
                    <div className="bookDescription">
                      {data.data.description}
                    </div>
                    <div>
                      <div className="bookHeaders">
                        <h2>Genres</h2>
                      </div>
                      <div className="bookGenres">
                        {data.data.genre.map((genre, index) => (
                          <a key={index} href={`/genres/${genre}`}>
                            {genre}
                            {index !== data.data.genre.length - 1 ? "," : ""}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="bookISBN">ISBN: {isbn}</div>
                    {signedIn ? (
                      <button
                        className={
                          isLiked
                            ? "genreLikeButton bookLiked liked"
                            : "genreLikeButton bookLiked"
                        }
                        onClick={likeHandler}
                        disabled={disabled}
                      >
                        {isLiked ? "Liked" : "Like"}
                      </button>
                    ) : (
                      ""
                    )}
                    <a
                      className="genreLikeButton bookLiked"
                      href={data.data.buy_url}
                    >
                      Buy Now
                    </a>
                  </div>
                  <div className="bookReviews">
                    <div className="reviewHeader">
                      <h2>Reviews</h2>
                    </div>
                    <div className="reviews">
                      {signedIn ? (
                        <div className="userReviewPrompt">
                          <div className="userReviewAvatar">
                            <img src="/assets/img/noavatar.png" alt="" />
                          </div>
                          {!reviewed ? (
                            <div className="userReviewBody">
                              <div className="userReviewTitle">
                                {data.data.reviews.length === 0
                                  ? "Be the first to "
                                  : ""}
                                Rate and Review {data.data.title}
                              </div>
                              <div className="userReviewContent">
                                <StarRatings
                                  rating={rating}
                                  starRatedColor="orange"
                                  changeRating={(e) => {
                                    setRating(e);
                                  }}
                                  starHoverColor="gold"
                                  starDimension="30px"
                                  starSpacing="0px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                                <textarea
                                  value={comment}
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                  required
                                  placeholder="Write your review!"
                                />
                                <button
                                  style={{ marginTop: "15px" }}
                                  className="genreLikeButton bookLiked"
                                  onClick={submitReview}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="userReviewBody">
                              <div className="userReviewTitle">Your Review</div>
                              <div className="userReviewContent">
                                <StarRatings
                                  rating={data.myReview.rating}
                                  starRatedColor="orange"
                                  starDimension="20px"
                                  starSpacing="0px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                                <div>{data.myReview.comment}</div>
                              </div>
                            </div>
                          )}
                          <span
                            style={{
                              marginLeft: "10px",
                              fontSize: "14px",
                            }}
                          >
                            {message}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {data.data.reviews.length > 0
                        ? data.data.reviews.map((review, index) => (
                            <div
                              key={index}
                              className="userReviewPrompt"
                              style={{
                                display: reviewed
                                  ? review._id === data.myReview._id
                                    ? "none"
                                    : "flex"
                                  : "flex",
                              }}
                            >
                              <div className="userReviewAvatar">
                                <img src={review.avatar} alt="" />
                              </div>
                              <div className="userReviewBody">
                                <div className="userReviewTitle">
                                  {review.name}
                                </div>
                                <div className="userReviewContent">
                                  <StarRatings
                                    rating={review.rating}
                                    starRatedColor="orange"
                                    starDimension="20px"
                                    starSpacing="0px"
                                    numberOfStars={5}
                                    name="rating"
                                  />
                                  <div>{review.comment}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
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
