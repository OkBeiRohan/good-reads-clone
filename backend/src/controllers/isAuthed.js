const users = require("../models/users");
const bcrypt = require("bcryptjs");

const isAuthed = async (req, res) => {
  const user_id = req.user.user_id;
  const loggedUser = await users.findById(user_id);
  if (!loggedUser) {
    return res.json({
      auth_status: false,
      message: "User Doesnt Exists",
    });
  } else {
    const isEqual = await bcrypt.compare(req.user.password, loggedUser.password);
    if (isEqual)
      return res.json({
        auth_status: true,
        message: "Authenticated",
      });
    else return res.json({ auth_status: false, message: "Password mismatch" });
  }
};
module.exports = isAuthed;
