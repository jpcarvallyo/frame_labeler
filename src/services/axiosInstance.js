import axiosInstance from "./axiosInstance";

// Login related logic to get things like Bearer token
const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    const { token } = response.data;
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    throw error;
  }
};
