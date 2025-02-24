import React, { useEffect, useState } from "react";

import "./style.scss";
import Card from "../../components/Card";
import Axios from "../../utils/Axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const path = useLocation().pathname.split("/")[1];
  const categories = [
    "All",
    "Music",
    "Education",
    "Gaming",
    "Science",
    "Technology",
    "Others",
  ];

  const getVideosCategory = async (cat) => {
    setIsLoading(true);
    try {
      const response = await Axios.get(`/video/category?category=${cat}`);
      setVideos(response?.data?.videos);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getVideos = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(`video/${type}`);
      setVideos(response?.data?.videos);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchVideos = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      getVideos();
    } else {
      getVideosCategory(cat);
    }
  };

  useEffect(() => {
    getVideos();
  }, [type]);

  return (
    <div className="home-container">
      {path !== "subscriptions" && (
        <div className="categories-wrapper">
          {categories.map((cat) => {
            return (
              <div
                className={`category ${category === cat ? "active" : ""}`}
                id={cat}
                onClick={() => handleFetchVideos(cat)}
              >
                {cat}
              </div>
            );
          })}
        </div>
      )}
      <div className="videos-wrapper">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : videos.length === 0 ? (
          <div className="no-videos">
            No videos available. Please subscribe to a channel.
          </div>
        ) : (
          videos.map((video) => (
            <Card key={video._id} video={video} showEdit={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
