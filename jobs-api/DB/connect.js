const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB Connected..."))
    .catch(() => console.log("Connection Failed"));
};

module.exports = connectDB;
