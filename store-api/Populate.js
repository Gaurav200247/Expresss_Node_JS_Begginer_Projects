const connectDB = require("./DB/Connect");
const Products = require("./Models/Store");
const jsonData = require("./products.json");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    Products.deleteMany();
    Products.create(jsonData);
    console.log("Data Creation Success !!");
    process.exit(0);
  } catch (error) {
    console.log("Data Creation Failed !!");
    console.log(error);
    process.exit(1);
  }
};

start();
