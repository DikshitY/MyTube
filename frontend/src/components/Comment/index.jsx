import React, { useEffect, useState } from "react";

import "./style.scss";
import Axios from "../../utils/Axios";
import toast from "react-hot-toast";

const Comment = ({ comment, fetchComments }) => {
  const [channel, setChannel] = useState({});

  const handleCommentDelete = async () => {
    try {
      console.log(comment._id)
      const res = await Axios.delete(`/comment/${comment?._id}`)
      if(res) {
        fetchComments()
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    }
  }

  useEffect(() => {
    const fetchComment = async () => {
      const res = await Axios.get(`/user/find/${comment?.userId}`);
      setChannel(res?.data?.user);
    };
    fetchComment();
  }, [comment?.userId]);

  return (
    <div className="comment-container">
      <div className="comment-content">
        <img className="comment-avatar" src={channel?.imageUrl} />
        <div className="comment-details">
          <span className="comment-name">
            {channel.username} <span className="comment-date">1 day ago</span>
          </span>
          <span className="comment-text">{comment?.text}</span>
        </div>
      </div>
      <div className="comment-btn-container">
        {comment?.userId === channel?._id && (
          <button className="comment-btn delete" onClick={handleCommentDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
