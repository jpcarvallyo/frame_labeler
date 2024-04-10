import { useState } from "react";
import { handleImageUrl } from "../utils";

const useFetchImageUrl = (type, currentFrame, frameLimit, setCurrentFrame) => {
  const [imageUrl, setImageUrl] = useState(
    handleImageUrl(type, currentFrame, frameLimit, setCurrentFrame)
  );

  return { imageUrl, setImageUrl };
};

export default useFetchImageUrl;
