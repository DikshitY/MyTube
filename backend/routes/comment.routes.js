import express from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/comment.controller.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

// GET A COMMENTS
commentRouter.get("/:videoId", getComments);
// ADD A COMMENT
commentRouter.post("/:videoId", verifyUser, addComment);
// EDIT A COMMENT
commentRouter.put("/:id", verifyUser, editComment)
// DELETE A COMMENT
commentRouter.delete("/:id", verifyUser, deleteComment);

export default commentRouter;
