import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./style.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-wrapper">
        <h1 className="not-found-title">Oops! Page not found.</h1>
        <h3>The page you are looking is not available!</h3>
        <Link to="/" className="not-found-link">
          <KeyboardBackspaceIcon /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
