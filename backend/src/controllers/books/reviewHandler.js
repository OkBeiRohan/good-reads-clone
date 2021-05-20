const books = require("../../models/books");
const users = require("../../models/users");

const addReview = async (req, res) => {
  if (!req.body.user_id) return res.json({ status: false, type: "user" });
  if (!req.body.ibn) return res.json({ status: false, type: "ibn" });
  try {
    const findBook = await books.findOne({ ibn: req.body.ibn });
    if (!findBook) return res.json({ status: false, type: "bookdoesntexists" });
    const findUser = await users.findById(req.body.user_id);
    if (!findUser) return res.json({ status: false, type: "userdoesntexists" });

    const isReviewed = findUser.userdata.contributions.reviews.find((value) => {
      if (value.book.toString() === findBook._id.toString()) return true;
      else return false;
    });
    if (isReviewed) return res.json({ status: false, type: "exists" });

    findBook.reviews.push({
      user_id: req.body.user_id,
      rating: req.body.rating,
      comment: req.body.comment,
      res_upvotes: 0,
      date: new Date(),
    });

    findBook.avg_rating =
      (findBook.avg_rating + req.body.rating) / findBook.reviews.length;
    findUser.userdata.contributions.reviews.push(findBook._id);

    await findBook.save();
    await findUser.save();
    return res.json({ status: true });
  } catch (e) {
    return res.json({ status: false, error: e });
  }
};

const editReview = async (req, res) => {
  return res.json({ status: false });
};

const removeReview = async (req, res) => {
  return res.json({ status: false });
};

module.exports = { addReview, editReview, removeReview };
