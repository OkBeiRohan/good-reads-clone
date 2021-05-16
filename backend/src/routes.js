const router = require("express").Router();

/********
 * Routes and Methods, and corresponding functions for them are defined below
 */

router.get("/test", async (req, res) => {
  return res.json({ status: true });
});

module.exports = router;
