import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas";
import { Button, Typography, Box, Skeleton } from "@mui/material";
import { handleImageUrl, preloadImages, urlCache } from "./helpers";
import fetchVideoData from "../../api/Frames/fetchFrameData";
import CanvasDataTable from "../../components/CanvasDataTable";

const BoundingBoxTool = () => {
  const [imageUrl, setImageUrl] = useState(urlCache["0"]);
  const [frameLimit, setFrameLimit] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetchVideoData();
          setFrameLimit(response.frame_count);
          setLoading(false);
          preloadImages(0, response.frame_count, 20);
        } catch (error) {
          throw error;
        }
      };
      fetchData();
    }
  }, [frameLimit]);

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
    <Box>
      <Box
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
      </Box>

      {!loading && imageUrl && boundingBoxes[currentFrame]?.data ? (
        <>
          <Canvas
            imageUrl={imageUrl}
            boundingBoxes={boundingBoxes}
            setBoundingBoxes={handleBoundingBoxesChange}
            currentFrame={currentFrame}
            highlightedBoxIndex={highlightedBoxIndex}
          />
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Typography
              variant="h6"
              style={{ color: "black", margin: "20px 0" }}
            >
              Bounding Boxes
            </Typography>
          </Box>
          <CanvasDataTable
            handleBoxDelete={handleBoxDelete}
            tableData={boundingBoxes[currentFrame]?.data}
            setHighlightedBoxIndex={setHighlightedBoxIndex}
          />
        </>
      ) : (
        <>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={854}
            height={480}
            sx={{ marginBottom: "20px" }}
          />
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Typography
              variant="h6"
              style={{ color: "black", margin: "20px 0" }}
            >
              Bounding Boxes
            </Typography>
          </Box>

          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={400}
          />
        </>
      )}
    </Box>
  );
};

export default BoundingBoxTool;
