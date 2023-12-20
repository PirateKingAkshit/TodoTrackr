import express from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";
const router = express.Router();

// User Login
router.post("/login", userLogin);


//User Signup(Registration)
router.post("/signup", userSignup);

export default router;
