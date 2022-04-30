const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB connected."))
    .catch(() => console.log("DB connection failed."));
};

module.exports = connectDB;
