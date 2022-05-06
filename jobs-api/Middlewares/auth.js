const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { unAuthenticated } = require("../Errors/index");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuthenticated("UnAuthorized User");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = { userID: decoded.userID, name: decoded.name };
    next();
  } catch (error) {
    throw new unAuthenticated("UnAuthorized User");
  }
};

module.exports = auth;
