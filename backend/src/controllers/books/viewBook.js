const books = require("../../models/books");

const findBook = async (req, res) => {
  if (!req.body.ibn) return res.json({ status: false, type: "ibn" });
  const findBook = await books.findOne({ ibn: req.body.ibn });
  if (!findBook) return res.json({ status: false, type: "empty" });
  if (req.user.user_id) {
    const user = await users.findById(req.user.user_id).select("-password");
    if (!user) return res.json({ status: false, type: "empty" });
    let isReviewed;
    user.userdata.contributions.reviews.find((value) => {
      if (value.book.toString() === findBook._id.toString()) {
        isReviewed = true;
        return;
      } else {
        isReviewed = false;
        return;
      }
    });
    let isLiked;
    user.userdata.likes.books.find((value) => {
      if (value.book.toString() === findBook._id.toString()) {
        isLiked = true;
        return;
      } else {
        isLiked = false;
        return;
      }
    });
  }
  return res.json({ status: true, data: findBook, isReviewed, isLiked });
};

const viewBooks = async (req, res) => {
  if (!req.body.genre) return res.json({ status: false, type: "genre" });
  let findBooks;
  if (req.body.genre === "all")
    findBooks = await books.find().sort({ avg_rating: -1 });
  else
    findBooks = await books
      .find({ genre: { $eq: req.body.genre } })
      .sort({ avg_rating: -1 });
  if (findBooks.length === 0) return res.json({ status: false, type: "empty" });
  return res.json({ status: true, data: findBooks });
};

module.exports = { findBook, viewBooks };
