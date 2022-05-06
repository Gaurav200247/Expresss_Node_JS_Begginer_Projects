const express = require("express");
const router = express.Router();

const { Login, Register } = require("../Controllers/auth");

router.route("/register").post(Register);
router.route("/login").post(Login);

module.exports = router;
