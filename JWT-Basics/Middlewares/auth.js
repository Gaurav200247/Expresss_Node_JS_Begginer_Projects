const jwt = require("jsonwebtoken");
const { unAunthenticatedError } = require("../Errors/index");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAunthenticatedError("No Token Provided");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next(); // passes functionality to dashboard.
  } catch (error) {
    throw new unAunthenticatedError("Not Authorized to this Route");
  }
};

module.exports = authenticationMiddleware;
