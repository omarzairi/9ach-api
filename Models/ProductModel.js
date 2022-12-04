import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  name: String,
  price: {
    current: {
      value: Number,
      text: String,
    },
    prev: {
      value: Number,
      text: String,
    },
  },
  isSellingFast: Boolean,
  isInStock: Boolean,
  dateCreation: Date,
  media: Array,
  categorie: String,
  categId: Number,
  brandName: String,
  comments: Array,
});
ProductSchema.index({ name: "text" });
const Product = mongoose.model("Product", ProductSchema);
export default Product;
