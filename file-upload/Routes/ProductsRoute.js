const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
} = require("../Controllers/ProductController");
const { uploadProductImage } = require("../Controllers/UploadController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
