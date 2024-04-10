import React, { useState } from "react";
import Canvas from "../Canvas";

const Wrapper = () => {
  const [imageUrl, setImageUrl] = useState(
    "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg"
  );
  const [boundingBoxes, setBoundingBoxes] = useState([]); // Initialize bounding boxes state

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleBoundingBoxesChange = (newBoundingBoxes) => {
    setBoundingBoxes(newBoundingBoxes);
  };

  return (
    <div>
      <Canvas
        imageUrl={imageUrl}
        boundingBoxes={boundingBoxes}
        setBoundingBoxes={handleBoundingBoxesChange}
      />
      <div>
        {/* Render bounding box list or other UI elements */}
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
