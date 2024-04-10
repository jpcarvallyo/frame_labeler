import React, { useState, useEffect, Suspense } from "react";
import Canvas from "../Canvas";
import { handleImageUrl } from "../../utils";

const Wrapper = () => {
  const [imageUrl, setImageUrl] = useState(
    "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg"
  );
  const [frameLimit, setFrameLimit] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(false);

  const [boundingBoxes, setBoundingBoxes] = useState({
    0: {
      data: [],
    },
  });

  const handleImageUrlChange = (type) => {
    setLoading(true);
    const newImageUrl = handleImageUrl(
      type,
      currentFrame,
      frameLimit,
      setCurrentFrame
    );
    setImageUrl(newImageUrl);
    setLoading(false);
  };

  const handleBoundingBoxesChange = (newBoundingBoxes) => {
    setBoundingBoxes((prev) => ({
      ...prev,
      [currentFrame]: { data: newBoundingBoxes },
    }));
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

  const handleBoxDelete = (indexToDelete) => {
    const updatedDataArray = boundingBoxes[currentFrame].data.filter(
      (_, index) => index !== indexToDelete
    );
    setBoundingBoxes((prev) => {
      return {
        ...prev,
        [currentFrame]: {
          data: updatedDataArray,
        },
      };
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleImageUrlChange("prev")}>Previous</button>
        <button onClick={() => handleImageUrlChange("next")}>Next</button>
      </div>
      {loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        {!loading && imageUrl && (
          <Canvas
            imageUrl={imageUrl}
            boundingBoxes={boundingBoxes}
            setBoundingBoxes={handleBoundingBoxesChange}
            currentFrame={currentFrame}
          />
        )}
      </Suspense>

      <div>
        {/* Render bounding box list or other UI elements */}
        {boundingBoxes[currentFrame]?.data
          ? boundingBoxes[currentFrame].data.map((box, index) => (
              <div key={index}>
                Bounding Box {index + 1}{" "}
                <button onClick={() => handleBoxDelete(index)}>Delete</button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Wrapper;
