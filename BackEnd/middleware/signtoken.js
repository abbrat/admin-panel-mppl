const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No Token, Authorization Denied!" });
    }
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token is not Valid!" });
    }
  };
  


jwt.sign(
    payload,
    config.get("jwtSecret"),
    {
      expiresIn: 3600000000000000000000000,
    },
    (err, token) => {
      if (err) throw err;
      res.json({ msg: "OTP Successfully Verified!", tkn: token });
    }
  );