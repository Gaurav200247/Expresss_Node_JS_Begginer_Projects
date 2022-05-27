const BadRequest = require("./BadRequest");
const AuthenticationError = require("./Authentication");
const CustomAPIError = require("./customAPI");
const notFoundError = require("./notFound");

module.exports = {
  BadRequest,
  AuthenticationError,
  CustomAPIError,
  notFoundError,
};
