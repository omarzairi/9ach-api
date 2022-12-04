import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/Auth.js";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";
import protectAdmin from "../Middleware/adminAuth.js";
const userRoute = express.Router();

userRoute.get(
  "/",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
  })
);
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const emailf = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ email: emailf });

    if (user && password == user.password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.name, user.isAdmin),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password !" });
    }
  })
);
userRoute.post(
  "/loginadmin",
  asyncHandler(async (req, res) => {
    const emailf = req.body.email.toLowerCase();

    const password = req.body.password;
    const user = await User.findOne({ email: emailf });

    if (user && password == user.password) {
      if (user.isAdmin) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id, user.name, user.isAdmin),
        });
      } else {
        res.status(401).json({ msg: "Hmmm You Are Not An Admin." });
      }
    } else {
      res.status(401).json({ msg: "Invalid Email or Password !" });
    }
  })
);
userRoute.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    email.toLowerCase();
    name.toLowerCase();
    const userExiste = await User.findOne({ email });
    const userExiste1 = await User.findOne({ name });
    if (userExiste || userExiste1) {
      if (userExiste) {
        res.status(401).json({ msg: "User With This Email Already Exists!" });
      } else {
        res.status(401).json({ msg: "User With This Name Already Exists!" });
      }
    } else {
      const user = await User.create({
        name,
        email,
        password,
        joinedAt: new Date(),
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          joinedAt: user.joinedAt,
          token: generateToken(user._id, user.name, user.isAdmin),
        });
      } else {
        res.status(401).json({ msg: "Verify Info" });
      }
    }
  })
);
userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        joinedAt: user.joinedAt,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found !");
    }
  })
);
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.joinedAt = req.body.joinedAt || user.joinedAt;
      const updated = await user.save();
      res.json({
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        isAdmin: updated.isAdmin,
        joinetAt: updated.joinedAt,
        token: generateToken(updated._id, updated.name, updated.isAdmin),
        msg: "Profile Updated Successfully !",
      });
    } else {
      res.status(404);
      throw new Error("User Not Found !");
    }
  })
);
userRoute.put(
  "/adminprofile",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.joinedAt = req.body.joinedAt || user.joinedAt;
      const updated = await user.save();
      res.json({
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        isAdmin: updated.isAdmin,
        joinetAt: updated.joinedAt,
        token: generateToken(updated._id, updated.name, updated.isAdmin),
        msg: "Profile Updated Successfully !",
      });
    } else {
      res.status(404);
      throw new Error("User Not Found !");
    }
  })
);
export default userRoute;
