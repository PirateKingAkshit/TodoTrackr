import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";


const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);
  if (!verify) {
    return res.status(403).json({ message: "Invalid token" });
  } else {
    req.user = await User.findById(verify._id).select("-password");
    next();
  }
});

export default authenticateUser
