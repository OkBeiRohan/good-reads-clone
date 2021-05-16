const router = require("express").Router();

router.get("/test", async (req, res) => {
  return res.json({ status: true });
});

module.exports = router;
