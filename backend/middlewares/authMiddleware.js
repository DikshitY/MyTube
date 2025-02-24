import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyUser = async (req, res, next) => {
  try {
    // const token = req.cookies.access_token;
    // console.log(req.headers.authorization.split" "])
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return next(createError(401, "Unauthorized Access!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
      if (err) return next(createError(403, "Invalid Token!"));
      req.user = userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
