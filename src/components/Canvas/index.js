import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ imageUrl, boundingBoxes, setBoundingBoxes }) => {
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

    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    boundingBoxes.forEach((box) => drawBoundingBox(ctx, box));
    if (isDrawing) {
      const width = endX - startX;
      const height = endY - startY;
      drawBoundingBox(ctx, { x: startX, y: startY, width, height });
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
  ]);

  const drawBoundingBox = (ctx, box) => {
    ctx.strokeStyle = "red";
    ctx.strokeRect(box.x, box.y, box.width, box.height);
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
    setBoundingBoxes((prevBoundingBoxes) => [
      ...prevBoundingBoxes,
      newBoundingBox,
    ]);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
