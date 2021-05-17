const users = require("../../models/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  if (!req.body) return res.json({ status: false, type: "empty" });
  const checkUser = await users.find({ username: req.body.username });
  if (checkUser.length > 0)
    return res.json({ status: false, type: "username" });
  const checkNumber = await users.find({ number: req.body.number });
  if (checkNumber.length > 0)
    return res.json({ status: false, type: "number" });
  var stringpass = req.body.password;
  if (typeof stringpass == "number") stringpass = req.body.password.toString();
  var hashedPassword = await bcrypt.hash(stringpass, 12);
  var user = new users({
    name: req.body.name,
    number: req.body.number,
    sex: req.body.sex,
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
