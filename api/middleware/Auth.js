const jwt = require("jsonwebtoken");
const config = require("config");

const Auth = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Unauthorized access");

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
};

module.exports = Auth;
