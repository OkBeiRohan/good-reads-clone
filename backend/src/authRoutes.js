const router = require("express").Router();

const addBook = require("./controllers/books/addBook");
const isAuthed = require("./controllers/isAuthed");

/********
 * Defining API Endpoints (Request URL, Method and corresponding function to response)
 */
router.post("/auth", isAuthed);
router.post("/addbook", addBook);

module.exports = router;
