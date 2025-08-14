const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  specifications: Object,
  imageUrl: String,
  embedding: { type: [Number], select: false },
});

module.exports = mongoose.model("Product", productSchema);
