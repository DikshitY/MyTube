import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./style.scss";
import { loginFailure, loginStart, loginSuccess } from "../../store/userSlice";
import Axios from "../../utils/Axios";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    dispatch(loginStart());
    setIsLogin(true);
    try {
      const res = await Axios.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem("token", res?.data?.token);
      dispatch(loginSuccess(res.data.user));
      setLoginData({ email: "", password: "" });
      toast.success("User logged in");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
      dispatch(loginFailure());
    } finally {
      setIsLogin(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignupForm()) return;

    setIsSignup(true);
    try {
      const res = await Axios.post("/auth/signup", {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      });
      if (res) {
        setSignupData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("User created successfully");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, Please try again!"
      );
    } finally {
      setIsSignup(false);
    }
  };

  const validateLoginForm = () => {
    let isValid = true;
    console.log("here");
    if (!loginData.email) {
      toast.error("Please enter email address");
      isValid = false;
    }
    if (!loginData.password) {
      toast.error("Please enter password");
      console.log("ere");
      isValid = false;
    }
    return isValid;
  };

  const validateSignupForm = () => {
    let isValid = true;
    if (!signupData.email) {
      toast.error("Please enter email address");
      isValid = false;
    }
    if (!signupData.password) {
      toast.error("Please enter password");
      isValid = false;
    }
    if (!signupData.username) {
      toast.error("Please enter username");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="signIn-container">
      <div className="signIn-wrapper">
        <h1 className="signIn-title">Sign in</h1>
        <h2 className="signIn-sub-title">to continue to MyTube</h2>
        <input
          required
          className="signIn-text-field"
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, email: e.target.value }))
          }
          value={loginData.email}
          placeholder="Email"
        />
        <input
          required
          className="signIn-text-field"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button
          className="signIn-btn"
          onClick={handleLogin}
          disabled={isLogin}
        >
          {isLogin ? "Logging In..." : "Log in"}
        </button>
        <h1 className="signIn-title">or</h1>
        <input
          className="signIn-text-field"
          onChange={(e) =>
            setSignupData((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Username"
          value={signupData.username}
        />
        <input
          className="signIn-text-field"
          placeholder="Email"
          onChange={(e) =>
            setSignupData((prev) => ({ ...prev, email: e.target.value }))
          }
          value={signupData.email}
        />
        <input
          className="signIn-text-field"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setSignupData((prev) => ({ ...prev, password: e.target.value }))
          }
          value={signupData.password}
        />
        <button
          className="signIn-btn"
          onClick={handleSignUp}
          disabled={isSignup}
        >
          {isSignup ? "Creating account..." : "Sign up"}
        </button>
      </div>
      <div className="signIn-more">
        English(USA)
        <div className="signIn-link-container">
          <span className="signIn-link">Help</span>
          <span className="signIn-link">Privacy</span>
          <span className="signIn-link">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
