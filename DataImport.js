import express from "express";
import users from "./data/users.js";
import User from "./Models/userModel.js";
const ImportData = express.Router();
ImportData.post("/user", async (req, res) => {
  await User.remove();
  const importU = await User.insertMany(users);
  res.send({ importU });
});
export default ImportData;
