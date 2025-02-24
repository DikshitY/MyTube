import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import Axios from "../../utils/Axios";
import { loginFailure, loginStart, loginSuccess } from "../../store/userSlice";
import toast from "react-hot-toast";

const Channel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);
  const [channelName, setChannelName] = useState(currentUser?.channelName);
  const [image, setImage] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const updateChannel = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("channelName", channelName);
      if (image) {
        formData.append("image", image);
      }
      const res = await Axios.put(`/user/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(loginSuccess(res?.data?.user));
      if (res) {
        navigate(`/channel/${res?.data?.user?._id}`);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
      dispatch(loginFailure());
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!username) {
      isValid = false;
      toast.error("Please enter user name");
    }
    if (!channelName) {
      isValid = false;
      toast.error("Please enter channel name");
    }

    return isValid;
  };

  return (
    <div className="channel-container">
      <div className="channel-wrapper">
        <h1 className="channel-title">
          {currentUser?.channel ? "Update Channel Details" : "Create Channel"}
        </h1>
        <label>
          User Name*
          <input
            required
            className="channel-text-field"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            value={username}
          />
        </label>
        <label>
          Channel Name*
          <input
            required
            className="channel-text-field"
            type="text"
            placeholder="Channel Name"
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
          />
        </label>
        <label>
          Profile Image
          <input
            className="channel-text-field"
            type="file"
            accept="image/*"
            placeholder="Profile Image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          className="channel-btn"
          onClick={updateChannel}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : currentUser?.channel
            ? "Update"
            : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Channel;
