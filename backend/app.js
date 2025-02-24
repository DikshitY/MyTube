import express from "express";
import cors from "cors";
import "dotenv/config";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import authRouter from "./routes/auth.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = new express();

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({ success: false, status, message });
});

// DB Connection
connectDB();

export default app;
