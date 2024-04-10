import React, { useRef, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const Canvas = ({
  imageUrl,
  boundingBoxes,
  setBoundingBoxes,
  currentFrame,
  highlightedBoxIndex,
}) => {
  const canvasRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageElement, setImageElement] = useState(null);

  // Load the image
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageElement(image);
      setImageLoaded(true);
    };
    image.src = imageUrl;
  }, [imageUrl]);

  // Draw on the canvas
  useEffect(() => {
    if (!imageLoaded || !imageElement) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawImageOnCanvas = () => {
      if (imageLoaded && imageElement) {
        // Set canvas size equal to image size
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;

        // Draw the image on the canvas
        ctx.drawImage(
          imageElement,
          0,
          0,
          imageElement.width,
          imageElement.height
        );
      }
    };

    drawImageOnCanvas();

    if (boundingBoxes[currentFrame]?.data) {
      boundingBoxes[currentFrame].data.forEach((box, index) =>
        drawBoundingBox(ctx, box, index === highlightedBoxIndex)
      );
    }

    if (isDrawing) {
      const width = endX - startX;
      const height = endY - startY;
      drawBoundingBox(ctx, { x: startX, y: startY, width, height }, false);
    }
  }, [
    imageLoaded,
    imageElement,
    boundingBoxes,
    startX,
    startY,
    endX,
    endY,
    isDrawing,
    currentFrame,
    highlightedBoxIndex,
  ]);

  const drawBoundingBox = (ctx, box, highlight) => {
    ctx.strokeStyle = highlight ? "rgb(66, 245, 93)" : "white";
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.fillStyle = highlight
      ? "rgba(66, 245, 93, 0.3)"
      : "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(box.x, box.y, box.width, box.height);
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Record starting coordinates
    setStartX(x);
    setStartY(y);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndX(x);
    setEndY(y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    // Save bounding box coordinates and size
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);
    const newBoundingBox = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width,
      height,
    };
    boundingBoxes[currentFrame].data.push(newBoundingBox);
    const newCoords = boundingBoxes[currentFrame].data;
    setBoundingBoxes(newCoords);
  };

  return !imageLoaded ? (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={854}
      height={480}
      style={{ marginBottom: "10px" }}
    />
  ) : (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ marginBottom: "10px" }}
    />
  );
};

export default Canvas;
