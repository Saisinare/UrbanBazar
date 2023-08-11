const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  review: [
    {
      reviewer_name: String,
      rating: Number,
      date: Date,
      rating_out_of_5: Number,
    },
  ],
  product_quantity: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Product", ProductSchema);
