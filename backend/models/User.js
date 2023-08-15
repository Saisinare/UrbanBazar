// Import required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isSeller: { 
    type: Boolean
   },
  cart: {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
});
const User = mongoose.model("User", userSchema);
User.createIndexes();
module.exports = User;
