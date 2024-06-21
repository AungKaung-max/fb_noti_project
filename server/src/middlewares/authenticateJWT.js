const jwt = require("jsonwebtoken");
const config = require("../config/config");
const UserModel = require("../model/userModel");

// const authenticateJWT = async (req, res, next) => {
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwtSecret);
//     const user = await UserModel.findById(decoded.userId);
//     console.log(user);
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     req.user = { userId: user._id }; // Attach user object to request
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Unauthorized: Token expired" });
//     }
//     return res.status(403).json({ message: "Forbidden: Token is invalid" });
//   }
// };

const authenticateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Token is invalid" });
      }
      req.user = user; // Attach the user info to the request object
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = authenticateJWT;
