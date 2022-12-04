import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
  joinedAt: {
    type: Date,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
