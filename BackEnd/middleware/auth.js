const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied!" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add check from the token
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid!" });
  }
};
