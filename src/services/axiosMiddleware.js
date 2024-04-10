import axiosInstance from "./axiosInstance";

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config, add headers, etc.
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data, handle success, etc.
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);
