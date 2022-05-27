const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPI");

class BadRequest extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;
