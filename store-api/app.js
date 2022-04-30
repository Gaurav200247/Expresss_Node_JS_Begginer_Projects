require("dotenv").config();
require("express-async-errors");

const express = require("express");
const router = require("./Routes/Store");
const app = express();
const notFound = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");
const connectDB = require("./DB/Connect");

const port = 3000;

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>STORE API</h1><a href='/api/v1/products'>Get All Products</a>");
});

app.use("/api/v1/products", router);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on Port ${port}... `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
