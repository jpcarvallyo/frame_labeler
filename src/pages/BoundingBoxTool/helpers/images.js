// Create a cache object to store fetched URLs
export const urlCache = {
  0: "http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/00000.jpg",
};

export const handleImageUrl = (
  direction,
  currentFrame,
  limit,
  setCurrentFrame
) => {
  let frame = currentFrame;
  if (direction === "prev") {
    // Decrement frame number for previous direction
    frame = frame === 0 ? limit - 1 : frame - 1;
  } else if (direction === "next") {
    frame = frame === limit - 1 ? 0 : frame + 1;
  }
  setCurrentFrame(frame);

  if (urlCache[frame]) {
    return urlCache[frame];
  }

  const paddedFrame = frame.toString().padStart(5, "0");
  const url = `http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/${paddedFrame}.jpg`;
  urlCache[paddedFrame] = url;
  console.log("urlCache: ", urlCache);
  return url;
};

export const preloadImages = (currentFrame = 0, limit, numFrames) => {
  for (let index = 1; index <= numFrames; index++) {
    const frameNumber = (currentFrame + index) % limit;
    const paddedFrame = frameNumber.toString().padStart(5, "0");
    const url = `http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/frames/${paddedFrame}.jpg`;
    if (!urlCache[index]) {
      urlCache[index] = url;
    }
  }
};
