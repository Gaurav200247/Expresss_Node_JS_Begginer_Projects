const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../Errors/index");

const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError("Please provide Username and Password");
  }

  const id = new Date().getDate();
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

// ---------------------------------------------------------------

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your Authorized data, Your LuckyNumber is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
