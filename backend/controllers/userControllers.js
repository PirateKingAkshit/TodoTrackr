import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(401).json({ message: "Wrong Email/Password" }); // Unauthorized
  }

  const checkPassword = await bcrypt.compare(password, userExist.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Wrong Email/Password" }); // Bad request
  }

  const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.status(200).json({
    name:userExist.name,
    _id: userExist._id,
    email: userExist.email,
    token,
  });
});

export const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(401).json({ message: "Email Already Exist" }); // Unauthorized
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds); // Hashing password

  const newUser = await User.create({ name, email, password: passwordHash });

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.status(200).json({
    name: newUser.name,
    _id: newUser._id,
    email: newUser.email,
    token,
  });
});
