import React, { useEffect, useState } from "react";

import "./style.scss";
import Comment from "../Comment";
import { useSelector } from "react-redux";
import Axios from "../../utils/Axios";
import toast from "react-hot-toast";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = async () => {
    if (!currentUser) return toast.error("Please login or signup");
    try {
      if (newComment.trim()) {
        const res = await Axios.post(`/comment/${videoId}`, {
          text: newComment,
        });
        if (res) {
          fetchComments();
          setNewComment("");
        }
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    }
  };

  const fetchComments = async () => {
    try {
      const res = await Axios.get(`/comment/${videoId}`);
      setComments(res?.data?.comments);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="comments-container">
      <div className="comments-new">
        <img className="comments-avatar" src={currentUser?.imageUrl} />
        <input
          className="comments-text-field"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          placeholder="Add a comment..."
        />
        <button className="comment-btn" onClick={addComment}>
          Comment
        </button>
      </div>
      {comments?.map((comment) => (
        <Comment
          key={comment?._id}
          comment={comment}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default Comments;
