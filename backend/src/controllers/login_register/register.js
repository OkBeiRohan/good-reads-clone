const users = require("../../models/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  var stringpass = req.body.password;
  if (typeof stringpass == "number") stringpass = req.body.password.toString();
  var hashedPassword = await bcrypt.hash(stringpass, 12);
  var user = new users({
    username: req.body.username,
    password: hashedPassword,
  });
  user.save(function (err, n) {
    if (err) return res.status(500).json({ error: err });
    console.log(n.username + " saved");
  });

  res.status(200).json({ status: "Success! I think" });
};

module.exports = register;
