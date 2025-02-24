import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.scss";
import Card from "../../components/Card";
import Axios from "../../utils/Axios";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await Axios.get(`/video/search${query}`);
      setVideos(res?.data?.videos);
    };
    fetchVideos();
  }, [query]);

  return (
    <div className="search-container">
      {videos.map((video) => (
        <Card key={video._id} video={video} showEdit={false}/>
      ))}
    </div>
  );
};

export default Search;
