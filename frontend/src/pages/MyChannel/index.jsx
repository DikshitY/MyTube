import React, { useEffect, useState } from "react";
import "./style.scss";
import Axios from "../../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { subscription } from "../../store/userSlice";

const MyChannel = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [isVideosFetching, setIsVideosFetching] = useState(false);

  const handleSub = async () => {
    currentUser?.subscribedChannels?.includes(currentUser._id)
      ? await Axios.put(`/user/unsub/${currentUser._id}`)
      : await Axios.put(`/user/sub/${currentUser._id}`);
    dispatch(subscription(currentUser._id));
  };

  const fetchUserVideos = async () => {
    setIsVideosFetching(true);
    try {
      const res = await Axios.get("/video/find");
      if (res?.data?.videos) {
        setVideos(res?.data?.videos);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    } finally {
      setIsVideosFetching(false);
    }
  };

  useEffect(() => {
    fetchUserVideos();
  }, [currentUser]);

  return (
    <div className="mychannel-container">
      <div className="profile-section">
        <img src={currentUser?.imageUrl} className="profile-img" />
        <div className="profile-details">
          <h1 className="profile-title">{currentUser.channelName}</h1>
          <p className="profile-sub">{currentUser.subscribers} Subscribers</p>
          <button
            className={`profile-subscribe ${
              currentUser?.subscribedChannels?.includes(currentUser?._id) &&
              "subscribed"
            }`}
            onClick={handleSub}
          >
            {currentUser?.subscribedChannels?.includes(currentUser?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
      </div>
      <hr className="mychannel-hr" />
      <div className="videos-section">
        {isVideosFetching ? (
          <div className="loader">Loading...</div>
        ) : (
          videos.map((video) => (
            <Card key={video._id} video={video} showEdit={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyChannel;
