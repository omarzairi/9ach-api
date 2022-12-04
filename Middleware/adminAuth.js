import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decrypt = Jwt.verify(token, "9ACHproject");
      req.user = await User.findById(decrypt.id).select("-password");
      if (decrypt.isAdmin) {
        next();
      } else {
        res.status(401).json({
          msg: "Sorry This Function Is Only For Admins Log In With An Admin Account!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
    }
  }
  if (!token) {
    res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
  }
});
export default protectAdmin;
