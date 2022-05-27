require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");
const connectDB = require("./DB/connect");
const router = require("./Router/main");

const port = process.env.port || 3000;

// middlewares
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Listening on PORT ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
