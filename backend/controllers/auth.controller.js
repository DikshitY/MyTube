import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      channelName: req.body.username,
    });
    const user = await newUser.save();

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next(createError(400, "Invalid Credentials!"));
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;

    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ message: "Login successfull", user: others });
    res.status(200).json({ message: "Login successfull!", token, user: others });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    next(error);
  }
};
