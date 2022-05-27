require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const ProductRoute = require("./Routes/ProductsRoute");
const errHandlerMiddleware = require("./Middlewares/ErrorHandler");
const notFoundMiddleware = require("./Middlewares/notFound");

const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(express.static("./public"));

app.use(express.json());
app.use(fileupload({ useTempFiles: true, createParentPath: true })); // to enable file-upload middleware
// By default this module uploads files into RAM.
// Setting useTempFiles option to True turns on using temporary files instead of utilising RAM.
// This avoids memory overflow issues when uploading large files or in case of uploading lots of files at same time.

// routes
app.use("/api/v1/products", ProductRoute);

// Middleware
app.use(errHandlerMiddleware);
app.use(notFoundMiddleware);

// app.get("/hello", (req, res) => {
//   res.send("Hello");
// });

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DB Connected..."))
      .catch(() => console.log("Connection Failed"));

    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
