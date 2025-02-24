import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
