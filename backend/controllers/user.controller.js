import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET A USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    res.status(200).json({ message: "User fetched successfully!", user });
  } catch (error) {
    next(error);
  }
};

// CHANNEL CREATE AND EDIT
export const channel = async (req, res, next) => {
  if (req.user.userId === req.params.id) {
    try {
      let imageUrl = null;
      let imageId = null;

      if (req.files && req.files.image) {
        const existingUser = await User.findById(req.params.id);
        if (existingUser.imageId) {
          await cloudinary.uploader.destroy(existingUser.imageId);
        }
        const uploadedImage = await cloudinary.uploader.upload(
          req.files.image.tempFilePath
        );
        imageId = uploadedImage.public_id;
        imageUrl = uploadedImage.secure_url;

        const updatedUser = {
          username: req.body.username,
          imageUrl,
          imageId,
          channel: true,
          channelName: req.body.channelName,
        };

        const user = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: updatedUser,
          },
          { new: true }
        );
        res.status(200).json({ message: "User updated successfully!", user });
      } else {
        const updatedUser = {
          username: req.body.username,
          channel: true,
          channelName: req.body.channelName,
        };

        const user = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: updatedUser,
          },
          { new: true }
        );

        res.status(200).json({ message: "User updated successfully!", user });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only create or update your channel!"));
  }
};

// DELETE A USER
export const deleteUser = async (req, res, next) => {
  if (req.user.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only delete your account!"));
  }
};

// SUBSCRIBE A CHANNEL
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, {
      $addToSet: { subscribedChannels: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json({ message: "Channel subscribed!" });
  } catch (error) {
    next(error);
  }
};

// UNSUBSCRIBE A CHANNEL
export const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { subscribedChannels: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json({ message: "Channel UnSubscribed!" });
  } catch (error) {
    next(error);
  }
};

// LIKE A VIDEO
export const like = async (req, res, next) => {
  const userId = req.user.userId;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });

    res.status(200).json({ message: "The video has been liked!" });
  } catch (error) {
    next(error);
  }
};

// DISLIKE A VIDEO
export const dislike = async (req, res, next) => {
  const userId = req.user.userId;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });

    res.status(200).json({ message: "The video has been disliked!" });
  } catch (error) {
    next(error);
  }
};
