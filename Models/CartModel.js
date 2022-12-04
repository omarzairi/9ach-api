import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
