const users = require("../../models/users");

const getUsers = async (req, res) => {
  if (!req.body) return res.json({ status: false, type: "req-empty" });
  try {
    const user = await users.findById(req.body.id);
    if (!user) return res.json({ status: false, type: "empty" });
    else return res.json({ status: true, data: user });
  } catch (e) {
    return res.json({ status: false, type: "empty" });
  }
};

module.exports = getUsers;
