const path = require("path");
const fs = require("fs");

const { BadRequest } = require("../Errors");
const { StatusCodes } = require("http-status-codes");

const cloudinary = require("cloudinary").v2;

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequest("No Files Uploaded");
  }
  console.log(req.files);

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequest("please upload image only");
  }

  const maxSize = 1024 * 1024; // 1 MB

  if (productImage.size > maxSize) {
    throw new BadRequest(
      "Image size in very large! please upload image smaller than 1 MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  const productImage = req.files.image;

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: "File-Upload",
  });
  console.log(result);

  fs.unlinkSync(req.files.image.tempFilePath);

  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
