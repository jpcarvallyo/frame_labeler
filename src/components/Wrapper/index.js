import React, { useState, useEffect } from "react";
import Canvas from "../Canvas";
import { handleImageUrl } from "../../utils";

// const obj = {
//   '0': {
//     data: [{x: 125.5,
//     y: 30.75,
//     width: 73,
//     height: 49}, {x: 105.5,
//       y: 20.75,
//       width: 20,
//       height: 40}]
//   },
//   '19': {
//     data: [{x: 125.5,
//     y: 30.75,
//     width: 73,
//     height: 49}, {x: 105.5,
//       y: 20.75,
//       width: 20,
//       height: 40}]
//   },
// }

const Wrapper = () => {
  const [imageUrl, setImageUrl] = useState(
    "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg"
  );
  const [frameLimit, setFrameLimit] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const [boundingBoxes, setBoundingBoxes] = useState({
    0: {
      data: [],
    },
  });

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
    setBoundingBoxes((prev) => {
      return { ...prev, [currentFrame]: { data: newBoundingBoxes } };
    });
    console.log(boundingBoxes);
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

  useEffect(() => {
    setBoundingBoxes((prev) => {
      return {
        ...prev,
        [currentFrame]: {
          data: prev[currentFrame]?.data.length
            ? [...prev[currentFrame].data]
            : [],
        },
      };
    });
  }, [currentFrame]);

  return (
    <div>
      <div>
        <button onClick={() => handleImageUrlChange("prev")}>Previous</button>
        <button onClick={() => handleImageUrlChange("next")}>Next</button>
      </div>
      {boundingBoxes[currentFrame]?.data && (
        <Canvas
          imageUrl={imageUrl}
          boundingBoxes={boundingBoxes}
          setBoundingBoxes={handleBoundingBoxesChange}
          currentFrame={currentFrame}
        />
      )}

      <div>
        {/* Render bounding box list or other UI elements */}
        {/* {boundingBoxes[currentFrame].data.map((box, index) => (
          <div key={index}>
            Bounding Box {index + 1}: X: {box.x}, Y: {box.y}, Width: {box.width}
            , Height: {box.height}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Wrapper;
