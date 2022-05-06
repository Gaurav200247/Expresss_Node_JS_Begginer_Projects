// const { CustomAPIError } = require("../Errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // default Object
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong !!, Please try again later.",
  };

  // if (err instanceof CustomAPIError) {
  //   res.status(err.statusCode).json({ msg: err.message });
  // }

  // if email entered is not unique for registeration
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, Please choose another value`;
    customError.statusCode = 400;
  }

  // if some values are not sent to server during request. like : password or email
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  // if id is not valid
  if (err.name === "CastError") {
    customError.msg = `No Item Found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
