import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { createError } from "../utils/error.js";

// GET COMMENTS
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });

    res
      .status(200)
      .json({ message: "Comments fetched successfully!", comments });
  } catch (error) {
    next(error);
  }
};

// ADD A COMMENT
export const addComment = async (req, res, next) => {
  const newComment = new Comment({
    ...req.body,
    userId: req.user.userId,
    videoId: req.params.videoId,
  });
  try {
    const savedComment = await newComment.save();
    res
      .status(200)
      .send({ message: "Comment added successfully!", comment: savedComment });
  } catch (error) {
    next(error);
  }
};

// EDIT A COMMENT
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));

    if (comment.userId === req.user.userId) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Comment updated successfully!",
        comment: updatedComment,
      });
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (error) {
    next(error);
  }
};

// DELETE A COMMENT
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));

    const video = await Video.findById(comment?.videoId);

    if (
      req.user.userId === comment.userId ||
      req.user.userId === video.userId
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The comment has been deleted!" });
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (error) {
    next(error);
  }
};
