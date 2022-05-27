const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPI");

class notFoundError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.StatusCodes = StatusCodes.NOT_FOUND;
  }
}
module.exports = notFoundError;
