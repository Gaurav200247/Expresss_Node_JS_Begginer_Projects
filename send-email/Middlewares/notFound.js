const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Route Does not Exist");
};

module.exports = notFoundMiddleware;
