import React, { useEffect, useState } from "react";

import "./style.scss"
import Axios from "../../utils/Axios";
import Card from "../Card";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await Axios.get(`/video/random`);
      setVideos(res?.data?.videos);
    };
    fetchVideos();
  }, [tags]);

  return (
    <div className="recommendation-container">
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} showEdit={false} />
      ))}
    </div>
  );
};

export default Recommendation;