const { StatusCodes } = require("http-status-codes");
const { BadRequest, unAuthenticated } = require("../Errors");
const User = require("../Models/User");

const Register = async (req, res) => {
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequest("Please Provide name, email & password");
  // }
  // const salt = await bcryptjs.genSalt(10);
  // const hashedPassword = await bcryptjs.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };
  // const user = await User.create({ ...tempUser });
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// ---------------------------------------------------------------------------------

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide Email and password in login");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new unAuthenticated("User Does not Exist !! Invalid Credentials");
  }

  const isPasswordCorrect = await user.comaparePassword(password);

  if (!isPasswordCorrect) {
    throw new unAuthenticated("Invalid Credentials");
  }

  const userToken = user.generateJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, userToken });
};

module.exports = { Register, Login };
