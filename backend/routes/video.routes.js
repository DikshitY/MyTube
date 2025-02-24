import express from "express";
import { verifyUser } from "../middlewares/authMiddleware.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getByCategory,
  getOwnVideo,
  getVideo,
  randomVideos,
  search,
  subVideos,
  trendingVideos,
  updateVideo,
} from "../controllers/video.controller.js";

const videoRouter = express.Router();

// GET A VIDEO
videoRouter.get("/find/:id", getVideo);
// GET OWN VIDEOS
videoRouter.get("/find", verifyUser, getOwnVideo)
// ADD A VIDEO
videoRouter.post("/", verifyUser, addVideo);
// UPDATE A VIDEO
videoRouter.put("/:id", verifyUser, updateVideo);
// DELETE A VIDEO
videoRouter.delete("/:id", verifyUser, deleteVideo);
// ADD VIEWS TO A VIDEO
videoRouter.put("/view/:id", addView);
// GET TRENDING VIDEOS
videoRouter.get("/trend", trendingVideos);
// GET RANDOM VIDEOS
videoRouter.get("/random", randomVideos);
// GET SUBSCRIBED CHANNEL VIDEOS
videoRouter.get("/sub", verifyUser, subVideos);
// GET VIDEOs BASED ON TAG
videoRouter.get("/category", getByCategory);
// GET VIDEO BY SEARCH TERM
videoRouter.get("/search", search);

export default videoRouter;
