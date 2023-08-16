import axios from "axios";

const axiosClient = axios.create({
  //baseURL : "http://localhost:8081/",
  baseURL: process.env.REACT_APP_API_URL,
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
