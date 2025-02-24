import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    imageId: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedChannels: { type: [String], default: [] },
    channel: { type: Boolean, default: false },
    channelName: { type: String },
    videos: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
