const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPI");

class AuthenticationError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = AuthenticationError;
