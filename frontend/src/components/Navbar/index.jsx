import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";

import MyTube from "../../assets/logo.png";
import "./style.scss";
import Axios from "../../utils/Axios";
import { logout } from "../../store/userSlice";
import { toggleSidebar } from "../../store/commonSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opneUserMenu, setOpenUserMenu] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout");
      localStorage.clear();
      dispatch(logout());
      setOpenUserMenu(false);
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    }
  };

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="menu">
          <MenuIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => dispatch(toggleSidebar())}
          />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="logo">
              <img className="image" src={MyTube} />
              <span className="navbar-brand-name">MyTube</span>
            </div>
          </Link>
        </div>
        <div className="search">
          <input
            className="input-field"
            placeholder="Search"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${q}`);
              }
            }}
          />
          <SearchOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/search?q=${q}`)}
          />
        </div>
        {currentUser ? (
          <div className="navbar-user">
            <VideoCallOutlinedIcon
              onClick={() => navigate("upload")}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
            <div
              onMouseEnter={() => setOpenUserMenu(true)}
              onMouseLeave={() => setOpenUserMenu(false)}
            >
              <img className="navbar-avatar" src={currentUser?.imageUrl} />
              {opneUserMenu && (
                <div className="user-menu">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="user-menu-link"
                    to={"channel"}
                    onClick={() => setOpenUserMenu(false)}
                  >
                    {currentUser.channel ? (
                      <>
                        <EditIcon fontSize="small" /> Edit your channel
                      </>
                    ) : (
                      <>
                        <AddIcon fontSize="small" /> Create your channel
                      </>
                    )}
                  </Link>
                  {currentUser.channel && (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="user-menu-link"
                      to={`/channel/${currentUser._id}`}
                    >
                      <VisibilityIcon fontSize="small" /> View your channel
                    </Link>
                  )}
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="user-menu-link"
                    onClick={handleLogout}
                    to={"/"}
                  >
                    <ExitToAppIcon fontSize="small" /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <button className="btn">
              <AccountCircleOutlinedIcon />
              SIGN IN
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
