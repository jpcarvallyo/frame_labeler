import React, { useState, useEffect, Suspense } from "react";
import Canvas from "../Canvas";
import { Button, Typography, Grid } from "@mui/material";
import { handleImageUrl } from "../../utils";
import Table from "../Table";

const Wrapper = () => {
  const [imageUrl, setImageUrl] = useState(
    "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg"
  );
  const [frameLimit, setFrameLimit] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(false);
  const [highlightedBoxIndex, setHighlightedBoxIndex] = useState(null);

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

  const handleBoxDelete = () => {
    const updatedDataArray = boundingBoxes[currentFrame].data.filter(
      (_, index) => index !== highlightedBoxIndex
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
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleImageUrlChange("prev")}
        >
          Previous
        </Button>
        <Typography variant="h4" style={{ color: "black" }}>{`Frame ${
          currentFrame + 1
        }`}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleImageUrlChange("next")}
        >
          Next
        </Button>
      </div>

      {loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        {!loading && imageUrl && (
          <>
            <Canvas
              imageUrl={imageUrl}
              boundingBoxes={boundingBoxes}
              setBoundingBoxes={handleBoundingBoxesChange}
              currentFrame={currentFrame}
              highlightedBoxIndex={highlightedBoxIndex}
            />
            <Typography variant="h4" style={{ color: "black", margin: "20px" }}>
              Bounding Boxes
            </Typography>
            {boundingBoxes[currentFrame]?.data ? (
              <Table
                handleBoxDelete={handleBoxDelete}
                tableData={boundingBoxes[currentFrame]?.data}
                setHighlightedBoxIndex={setHighlightedBoxIndex}
              />
            ) : null}
          </>
        )}
      </Suspense>
    </section>
  );
};

export default Wrapper;
