const { CustomAPIError } = require("../Errors/CustomError");

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message }); // if id not found in data
  }
  return res.status(500).json({ msg: "Something Went Wrong !!" }); // if id value is invalid or some validators error
};
module.exports = errorHandlerMiddleware;
