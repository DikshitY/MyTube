import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    thumbnailId: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoId: { type: String, required: true },
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    // viewedBy: [
    //   { userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    // ],
    // comments: [
    //   { commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } },
    // ],
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
