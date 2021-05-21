const router = require("express").Router();

const addBook = require("./controllers/books/addBook");
const { addReview, editReview } = require("./controllers/books/reviewHandler");
const { findBook } = require("./controllers/books/viewBook");
const isAuthed = require("./controllers/isAuthed");

/********
 * Defining API Endpoints (Request URL, Method and corresponding function to response)
 */
router.post("/auth", isAuthed);
router.post("/addbook", addBook);
router.post("/addreview", addReview);
router.post("/editreview", editReview);
router.post("/findbook", findBook);

module.exports = router;
