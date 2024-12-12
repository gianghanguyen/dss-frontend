import axios from "axios";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response) return error.response;
    return error;
  }
);

export default api;
