# Frame Labeler

## Introduction

Hello, my name is James Carvallyo. This is my submission for the technical take home exercise.

[Recorded Demo ](https://www.loom.com/share/207d07f8f0fb478487d42d6d0e827949?sid=2a6b9f66-c9ee-4d90-a240-e3c15be0acaf)

## Ways to get started

Run the `yarn add` command to install the node_modules

## Requirements

At a high level, users can do the following:

1. Use the previous frame/next frame buttons to flip through video frames.
2. Draw one or more bounding boxes on each image. Bounding boxes will appear in a list below the image.
3. Delete bounding boxes using the list of bounding boxes below the image.

The specific requirements are:

1. The first frame of the video should appear when the page first loads.
2. Clicking the next/previous frame buttons should load the next/previous frame.
3. Clicking and dragging on the image should start drawing a new bounding box. The drawing experience is identical to how you select multiple icons on your computer's desktop.
4. Releasing the mouse should stop drawing and save the bounding box's coordinates in memory.
5. The app should remember each frame's bounding boxes. For example, if I draw boxes on frame 0, go to frame 1, then go back to frame 0, I should see all the bounding boxes I drew on frame 0.
6. The bounding box list table should only display the bounding boxes associated with the current frame.
7. Clicking the trash icon in the bounding box list table should delete the bounding box referenced by that row.

## Additional Features added:

1.  Auth layer set in place (can be hooked up in future). This is done with Axios.
2.  Hovering over DataGrid (table) highlights the particular bounding box in the Canvas area

## Component hierarchy and how it manages its state

State is managed through React's useState methods. The BoundingBoxTool component is the higher order component that is managing the logic for the the Canvas and the CanvasDataTable. The Canvas has complex state for the drawing and that is located within the component itself.
