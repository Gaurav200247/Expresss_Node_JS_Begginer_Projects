require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./Middlewares/notFound");
const errHandlerMiddleware = require("./Middlewares/ErrorHandler");
const { sendEmail } = require("./Controllers/SendEmail");

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Send Email</h1>\n<a href='/send'>send-email</a>");
});

app.get("/send", sendEmail);

// Middlewares
app.use(notFoundMiddleware);
app.use(errHandlerMiddleware);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
