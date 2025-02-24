import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

//CREATE A USER
authRouter.post("/signup", signUp);
//SIGN IN
authRouter.post("/login", login);
//USER LOGOUT
authRouter.post("/logout", verifyUser, logout);

export default authRouter;
