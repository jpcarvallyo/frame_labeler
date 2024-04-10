import React, { useState, useEffect } from "react";
import Canvas from "../Canvas";
import { handleImageUrl } from "../../utils";

const Wrapper = () => {
  const [imageUrl, setImageUrl] = useState(
    "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg"
  );
  const [frameLimit, setFrameLimit] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const [boundingBoxes, setBoundingBoxes] = useState([
    { id: "00000", data: [] },
  ]); // Initialize bounding boxes state
  // const [boundingBoxes, setBoundingBoxes] = useState({
  //   id: currentFrame,
  //   data: [],
  // }); // Initialize bounding boxes state

  const handleImageUrlChange = (type) => {
    const newImageUrl = handleImageUrl(
      type,
      currentFrame,
      frameLimit,
      setCurrentFrame
    );
    setImageUrl(newImageUrl);
  };

  const handleBoundingBoxesChange = (newBoundingBoxes) => {
    setBoundingBoxes(newBoundingBoxes);
  };

  useEffect(() => {
    if (!frameLimit) {
      fetch(
        "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/video.json"
      )
        .then((response) => response.json())
        .then((data) => setFrameLimit(data.frame_count));
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => handleImageUrlChange("prev")}>Previous</button>
        <button onClick={() => handleImageUrlChange("next")}>Next</button>
      </div>
      <Canvas
        imageUrl={imageUrl}
        boundingBoxes={boundingBoxes}
        setBoundingBoxes={handleBoundingBoxesChange}
      />
      <div>
        {/* Render bounding box list or other UI elements */}
        {/* {boundingBoxes[currentFrame].data.map((box, index) => (
          <div key={index}>
            Bounding Box {index + 1}: X: {box.x}, Y: {box.y}, Width: {box.width}
            , Height: {box.height}
          </div>
        ))} */}
        {boundingBoxes.map((box, index) => (
          <div key={index}>
            Bounding Box {index + 1}: X: {box.x}, Y: {box.y}, Width: {box.width}
            , Height: {box.height}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wrapper;
