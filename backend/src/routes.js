const router = require("express").Router();

/********
 * Defining API Endpoints (Request URL, Method and corresponding function to response)
 */

router.get("/test", async (req, res) => {
  return res.json({ status: true });
});

module.exports = router;
