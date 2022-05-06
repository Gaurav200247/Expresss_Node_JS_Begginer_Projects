const BadRequest = require("./BadRequest");
const unAuthenticated = require("./unAuthenticated");
const notFound = require("./notFound");
const CustomAPIError = require("./custom-error");

module.exports = { CustomAPIError, BadRequest, unAuthenticated, notFound };
