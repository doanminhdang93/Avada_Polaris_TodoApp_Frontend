import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
