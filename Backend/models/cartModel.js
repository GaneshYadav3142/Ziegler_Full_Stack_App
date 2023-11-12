const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  productID: { type: String, required: true },
  quantity: { type: Number, default: 1 },
 
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
