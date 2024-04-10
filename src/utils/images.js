export const handleImageUrl = (
  direction,
  currentFrame,
  limit,
  setCurrentFrame
) => {
  let frame = currentFrame;
  if (direction === "prev") {
    // Decrement frame number for previous direction
    if (frame === 0) {
      frame = limit - 1;
    } else {
      frame -= 1;
    }
  } else if (direction === "next") {
    if (frame === limit - 1) {
      frame = 0;
    } else {
      frame += 1;
    }
  }
  setCurrentFrame(frame);
  // Convert frame number back to padded string format '00001', '00002', etc.
  const paddedFrame = frame.toString().padStart(5, "0");

  // Construct the URL with the padded frame number
  const url = `http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/${paddedFrame}.jpg`;

  return url;
};
