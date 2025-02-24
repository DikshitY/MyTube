import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET A VIDEO
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json({ message: "Video fetched successfully!", video });
  } catch (error) {
    next(error);
  }
};

// GET OWN VIDEO
export const getOwnVideo = async (req, res, next) => {
  try {
    const videos = await Video.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ message: "Your videos fetched successfully!", videos });
  } catch (error) {
    next(error);
  }
};

// ADD A VIDEO
export const addVideo = async (req, res, next) => {
  if (req.files && req.files.video && req.files.thumbnail) {
    try {
      const uploadedVideo = await cloudinary.uploader.upload(
        req.files.video.tempFilePath,
        { resource_type: "video" }
      );
      const uploadedThumbnail = await cloudinary.uploader.upload(
        req.files.thumbnail.tempFilePath
      );
      const newVideo = new Video({
        userId: req.user.userId,
        title: req.body.title,
        description: req.body.description,
        thumbnailId: uploadedThumbnail.public_id,
        thumbnailUrl: uploadedThumbnail.secure_url,
        videoId: uploadedVideo.public_id,
        videoUrl: uploadedVideo.secure_url,
        category: req.body.category,
        tags: req.body.tags,
      });
      const video = await newVideo.save();
      res.status(200).json({ message: "Video added!", video });
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(400, "Upload video and thumbnail!"));
  }
};

// UPDATE A VIDEO
export const updateVideo = async (req, res, next) => {
  try {
    const existingVideo = await Video.findById(req.params.id);
    if (!existingVideo) return next(createError(404, "Video not found!"));

    if (existingVideo.userId === req.user.userId) {
      if (req.files && req.files.thumbnail) {
        await cloudinary.uploader.destroy(existingVideo.thumbnailId);
        const uploadedThumbnail = await cloudinary.uploader.upload(
          req.files.thumbnail.tempFilePath
        );

        const updatedVideo = {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          thumbnailId: uploadedThumbnail.public_id,
          thumbnailUrl: uploadedThumbnail.secure_url,
        };

        const video = await Video.findByIdAndUpdate(
          req.params.id,
          { $set: updatedVideo },
          { new: true }
        );

        res.status(200).json({ message: "Video updated successfully!", video });
      } else {
        const updatedVideo = {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
        };
        const video = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: updatedVideo,
          },
          { new: true }
        );

        res.status(200).json({
          message: "Video updated successfully!",
          video,
        });
      }
    } else {
      next(createError(403, "User can update his video only!"));
    }
  } catch (error) {
    next(error);
  }
};

// DELETE A VIDEO
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (video.userId === req.user.userId) {
      await cloudinary.uploader.destroy(video.videoId, {
        resource_type: "video",
      });
      await cloudinary.uploader.destroy(video.thumbnailId);
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Video deleted successfully!" });
    } else {
      next(createError(403, "User can delete his video only!"));
    }
  } catch (error) {
    next(error);
  }
};

// ADD VIEWS TO A VIDEO
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json({ message: "The view has been increased!" });
  } catch (error) {
    next(error);
  }
};

// GET TRENDING VIDEOS
export const trendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res
      .status(200)
      .json({ message: "Trending videos fetched successfully!", videos });
  } catch (error) {
    next(error);
  }
};

// GET RANDOM VIDEOS
export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    res
      .status(200)
      .json({ message: "Random videos fetched successfully!", videos });
  } catch (error) {
    next(error);
  }
};

// GET SUBSCRIBED CHANNEL VIDEOS
export const subVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const subscribedChannelIds = user.subscribedChannels;

    if (subscribedChannelIds.length === 0) {
      return res.status(200).json({
        message: "You have not subscribed to any channel!",
        videos: [],
      });
    }

    const videos = await Video.find({ userId: { $in: subscribedChannelIds } })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Subscribed channels videos fetched successfully!",
      videos,
    });
  } catch (error) {
    next(error);
  }
};

// GET VIDEOS BASED ON CATEGORY
export const getByCategory = async (req, res, next) => {
  const category = req.query.category;

  try {
    const videos = await Video.find({
      category,
    }).limit(20);

    res
      .status(200)
      .json({ message: "Videos fetched successfully based on category!", videos });
  } catch (error) {
    next(error);
  }
};

// GET VIDEO BASED ON SEARCH TERM
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);

    res.status(200).json({
      message: "Videos fetched successfully based on search term!",
      videos,
    });
  } catch (error) {
    next(error);
  }
};
