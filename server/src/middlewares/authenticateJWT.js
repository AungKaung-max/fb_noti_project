const jwt = require("jsonwebtoken");
const config = require("../config/config");
const UserModel = require("../model/userModel");

const authenticateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Token is invalid" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = authenticateJWT;
