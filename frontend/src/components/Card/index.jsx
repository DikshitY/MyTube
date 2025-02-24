import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import Axios from "../../utils/Axios";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const Card = ({ type, video, showEdit }) => {
  const [channel, setChannel] = useState({});

  const addVideoView = async () => {
    try {
      const res = await Axios.put(`/video/view/${video._id}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    }
  };

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await Axios.get(`/user/find/${video?.userId}`);
      setChannel(res?.data?.user);
    };
    fetchChannel();
  }, [video?.userId]);

  return (
    <div className="card-main">
      <Link
        to={`/video/${video._id}`}
        onClick={addVideoView}
        style={{ textDecoration: "none" }}
      >
        <div className={`card-container ${type === "sm" ? "sm" : ""}`}>
          <img
            className={`card-img ${type === "sm" ? "sm" : ""}`}
            src={video?.thumbnailUrl}
          />
          <div className={`card-details ${type === "sm" ? "sm" : ""}`}>
            <img
              className={`card-channel-img ${type === "sm" ? "sm" : ""}`}
              src={channel?.imageUrl}
            />
            <div>
              <h1 className="card-title">{video?.title}</h1>
              <h2 className="card-channel-name">{channel?.channelName}</h2>
              <div className="card-info">
                {video?.views} views • {format(video?.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {showEdit && (
        <Link className="card-edit" to={`/upload/${video._id}`}>
          Edit Video
        </Link>
      )}
    </div>
  );
};

export default Card;
