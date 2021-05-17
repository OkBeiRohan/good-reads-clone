const jwt = require("jsonwebtoken");

//Checks if the token is valid or not. Attaches payload to the user property in request.
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.json({
      auth_status: false,
      message: "Not Authenticated",
      error: "Not Authenticated",
    });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "readergiant");
  } catch (err) {
    return res.json({
      auth_status: false,
      message: "Error 500",
      error: "Error 500. Unable to verify admin token",
    });
  }
  if (!decodedToken) {
    return res.json({
      status: false,
      auth_status: false,
      message: "Not Authenticated Error 401",
      error: "Not Authenticated Error 401",
    });
  }
  req.user = decodedToken;
  next();
};
