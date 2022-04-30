const mongoose = require("mongoose");

const ConnectDB = (url) => {
  return mongoose.connect(url);
  // .then(() => console.log("Connected to Database..."))
  // .catch(() => console.log("DB Connection Failed!!"));
};

module.exports = ConnectDB;
