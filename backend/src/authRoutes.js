const router = require("express").Router();

const isAuthed = require("./controllers/isAuthed");

/********
 * Defining API Endpoints (Request URL, Method and corresponding function to response)
 */
router.post("/auth", isAuthed);

module.exports = router;
