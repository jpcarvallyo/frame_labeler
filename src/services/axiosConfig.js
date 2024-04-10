import axios from "axios";
const apiUrl = process.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // Timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
