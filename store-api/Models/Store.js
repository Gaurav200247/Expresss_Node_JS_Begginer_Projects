const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Name"],
  },
  price: {
    type: Number,
    required: [true, "Must Provide Price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4,
  },
  created_At: { type: Date, default: Date.now() },
  company: {
    type: String,

    enum: {
      values: ["ikea", "caressa", "marcos", "liddy"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "caressa", "marcos", "liddy"],
  },
});

module.exports = mongoose.model("StoreProducts", productsSchema);
