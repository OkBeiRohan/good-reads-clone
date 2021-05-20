const books = require("../../models/books");

const searchBook = async (req, res) => {
  if (!req.body.query) return res.json({ status: false, type: "empty" });
  const findBooks = await books
    .find({
      $or: [
        { ibn: { $regex: req.body.query, $options: "i" } },
        { title: { $regex: req.body.query, $options: "i" } },
      ],
    })
    .sort({ avg_rating: -1 })
    .select("-_id");
  return res.json({ status: true, data: findBooks });
};

module.exports = searchBook;
