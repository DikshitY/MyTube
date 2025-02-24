import express from "express";
import {
  channel,
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unSubscribe,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// userRouter.post("/signup", async (req, res) => {
//   try {
//     const existingUser = await User.findOne({ email: req.body.email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     let imageId = null;
//     let imageUrl = null;

//     if (req.files && req.files.image) {
//       const uploadedImage = await cloudinary.uploader.upload(
//         req.files.image.tempFilePath
//       );

//       imageUrl = uploadedImage.secure_url;
//       imageId = uploadedImage.public_id;
//     }
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//       imageUrl,
//       imageId,
//     });

//     const user = await newUser.save();
//     res.status(200).json({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// GET USER
userRouter.get("/find/:id", getUser);
// CHANNEL CREATE AND EDIT
userRouter.put("/:id", verifyUser, channel);
// DELETE USER
userRouter.delete("/:id", verifyUser, deleteUser);
// SUBSCRIBE A USER
userRouter.put("/sub/:id", verifyUser, subscribe);
// UNSUBSCRIBE A USER
userRouter.put("/unsub/:id", verifyUser, unSubscribe);
// LIKE A VIDEO
userRouter.put("/like/:videoId", verifyUser, like);
// DISLIKE A VIDEO
userRouter.put("/dislike/:videoId", verifyUser, dislike);

export default userRouter;
