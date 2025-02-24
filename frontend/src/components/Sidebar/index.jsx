import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Link } from "react-router-dom";

import "./style.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.common);

  return (
    <div className={`sidebar-container ${!sidebarOpen && "close"}`}>
      <div className="sidebar-wrapper">
        {sidebarOpen ? (
          <>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="sidebar-item">
                <HomeIcon />
                Home
              </div>
            </Link>
            <Link
              to="trends"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="sidebar-item">
                <ExploreOutlinedIcon />
                Explore
              </div>
            </Link>
            <Link
              to="subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="sidebar-item">
                <SubscriptionsOutlinedIcon />
                Subscriptions
              </div>
            </Link>
            <hr className="sidebar-hr" />
            <div className="sidebar-item">
              <VideoLibraryOutlinedIcon />
              Library
            </div>
            <div className="sidebar-item">
              <HistoryOutlinedIcon />
              History
            </div>
            <hr className="sidebar-hr" />
            {/* <h2 className="sidebar-title">Best Of MyTube</h2> */}
            <div className="sidebar-item">
              <LibraryMusicOutlinedIcon />
              Music
            </div>
            <div className="sidebar-item">
              <SportsBasketballOutlinedIcon />
              Sports
            </div>
            <div className="sidebar-item">
              <SportsEsportsOutlinedIcon />
              Gaming
            </div>
            <div className="sidebar-item">
              <MovieOutlinedIcon />
              Movies
            </div>
            <hr className="sidebar-hr" />
            <div className="sidebar-item">
              <SettingsOutlinedIcon />
              Settings
            </div>
            <div className="sidebar-item">
              <FlagOutlinedIcon />
              Report
            </div>
            <div className="sidebar-item">
              <HelpOutlineOutlinedIcon />
              Help
            </div>
          </>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="sidebar-item">
                <HomeIcon />
              </div>
            </Link>
            <Link
              to="trends"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="sidebar-item">
                <ExploreOutlinedIcon />
              </div>
            </Link>
            <Link
              to="subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="sidebar-item">
                <SubscriptionsOutlinedIcon />
              </div>
            </Link>
            <hr className="sidebar-hr" />
            <div className="sidebar-item">
              <VideoLibraryOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <HistoryOutlinedIcon />
            </div>
            <hr className="sidebar-hr" />
            <div className="sidebar-item">
              <LibraryMusicOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <SportsBasketballOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <SportsEsportsOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <MovieOutlinedIcon />
            </div>
            <hr className="sidebar-hr" />
            <div className="sidebar-item">
              <SettingsOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <FlagOutlinedIcon />
            </div>
            <div className="sidebar-item">
              <HelpOutlineOutlinedIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
