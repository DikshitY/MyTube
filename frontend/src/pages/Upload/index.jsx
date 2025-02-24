import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../utils/Axios";
import { MenuItem, TextField } from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Upload = () => {
  const { currentUser } = useSelector((state) => state.user);
  const categories = [
    "Music",
    "Education",
    "Gaming",
    "Science",
    "Technology",
    "Others",
  ];
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setInputs((prev) => ({ ...prev, tags: e.target.value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("title", inputs.title);
      formdata.append("description", inputs.description);
      formdata.append("category", inputs.category);
      // setting tags as array of string
      formdata.append(
        "tags",
        inputs.tags
          .split(",")
          .map((tag) => tag.trim())
          .join(",")
      );

      if (video) {
        formdata.append("video", video);
      }
      if (img) {
        formdata.append("thumbnail", img);
      }

      // formdata.forEach((value, key) => {
      //   console.log(key, value, typeof value);
      // });

      const res = await Axios.post("/video", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res) {
        toast.success("Video uploaded successfully!");
        navigate(`/video/${res.data?.video?._id}`);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!inputs.title) {
      toast.error("Please enter title.");
      isValid = false;
    }
    if (!inputs.category) {
      toast.error("Please select category.");
      isValid = false;
    }
    if (!inputs.description) {
      toast.error("Please enter description.");
      isValid = false;
    }
    if (!inputs.tags) {
      toast.error("Please enter tags.");
      isValid = false;
    }

    if (!img) {
      toast.error("Please upload thumbnail.");
      isValid = false;
    }
    if (!video) {
      toast.error("Please upload video.");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="upload-container">
      {currentUser.channel ? (
        <div className="upload-wrapper">
          <h1 className="upload-title">Upload a New Video</h1>
          <label className="upload-label">Video:</label>
          <input
            className="upload-text-field"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          <input
            className="upload-text-field"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={inputs.title}
          />
          <textarea
            className="upload-desc"
            placeholder="Description"
            name="description"
            rows={8}
            onChange={handleChange}
            value={inputs.description}
          />
          <input
            className="upload-text-field"
            type="text"
            placeholder="Separate the tags with commas."
            onChange={handleTags}
            name="tags"
            value={inputs.tags}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            sx={{
              color: "white",
              backgroundColor: "transparent",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#373737" }, // Border color
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            }}
            required
            size="small"
          >
            {categories?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <label className="upload-label">Image:</label>
          <input
            className="upload-text-field"
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      ) : (
        <div className="warning-wrapper">
          <h1 className="warning-title">You do not have any channel!</h1>
          <p>Please create channel to upload videos.</p>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/channel"}
          >
            <button className="warning-btn">Create Channel</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Upload;
