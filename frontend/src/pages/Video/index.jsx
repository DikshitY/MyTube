import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import Comments from "../../components/Comments";
import Axios from "../../utils/Axios";
import Recommendation from "../../components/Recommendation";
import { dislike, fetchSuccess, like } from "../../store/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../../store/userSlice";
import toast from "react-hot-toast";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await Axios.get(`/video/find/${path}`);
        const channelRes = await Axios.get(
          `/user/find/${videoRes?.data?.video?.userId}`
        );
        setChannel(channelRes?.data?.user);
        dispatch(fetchSuccess(videoRes?.data?.video));
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            "Something went wrong, Please try again!"
        );
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (!currentUser) return toast.error("Please login or signup");
    await Axios.put(`/user/like/${currentVideo._id}`);
    console.log(currentUser._id, "cru");
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    if (!currentUser) return toast.error("Please login or signup");
    await Axios.put(`/user/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    if (!currentUser) return toast.error("Please login or signup");
    currentUser?.subscribedChannels?.includes(channel._id)
      ? await Axios.put(`/user/unsub/${channel._id}`)
      : await Axios.put(`/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <div className="video-container">
      <div className="video-content">
        <div className="video-wrapper">
          <video
            className="video-frame"
            src={currentVideo?.videoUrl}
            controls
          />
        </div>
        <h1 className="video-title">{currentVideo?.title}</h1>
        <div className="video-details">
          <span className="video-info">
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </span>
          <div className="video-btn-container">
            <div className="video-btn" onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpAltIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </div>
            <div className="video-btn" onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownAltIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </div>
            <div className="video-btn">
              <ReplyOutlinedIcon /> Share
            </div>
            <div className="video-btn">
              <AddTaskOutlinedIcon /> Save
            </div>
          </div>
        </div>
        <hr className="video-hr" />
        <div className="video-channel">
          <div className="video-channel-info">
            <img className="video-img" src={channel?.imageUrl} />
            <div className="video-channel-detail">
              <span className="video-channel-name">{channel?.username}</span>
              <span className="video-channel-counter">
                {channel?.subscribers} subscribers
              </span>
              <p className="video-description">{currentVideo?.description}</p>
            </div>
          </div>
          <button
            className={`video-subscribe ${
              currentUser?.subscribedChannels?.includes(channel?._id) &&
              "subscribed"
            }`}
            onClick={handleSub}
          >
            {currentUser?.subscribedChannels?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="video-hr" />
        <Comments videoId={currentVideo?._id} />
      </div>
      <Recommendation tags={currentVideo?.tags} />
    </div>
  );
};

export default Video;
