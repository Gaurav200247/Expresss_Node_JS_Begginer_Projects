const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../Controllers/main");

const authMiddleware = require("../Middlewares/auth");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
