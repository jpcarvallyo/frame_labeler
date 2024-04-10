import axiosInstance from "../../services/axiosConfig";

const fetchVideoData = async () => {
  try {
    const response = await axiosInstance.get(
      "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/video.json"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchVideoData;
