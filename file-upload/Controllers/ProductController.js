const { StatusCodes } = require("http-status-codes");
const Product = require("../Model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};
const createProduct = async (req, res) => {
  const products = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ products });
};

module.exports = { getAllProducts, createProduct };
