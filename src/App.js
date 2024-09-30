import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [droppedImages, setDroppedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  const images = [
    "https://via.placeholder.com/100x100?text=Image+1",
    "https://via.placeholder.com/100x100?text=Image+2",
    "https://via.placeholder.com/100x100?text=Image+3",
    "https://via.placeholder.com/100x100?text=Image+4",
    "https://via.placeholder.com/100x100?text=Image+5",
  ];

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageSrc", image);
    setDraggedImage(image);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageSrc = e.dataTransfer.getData("imageSrc") || draggedImage;
    if (imageSrc) {
      setDroppedImages((prevImages) => [...prevImages, imageSrc]);
      setDraggedImage(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleTouchStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    const dropZone = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    if (dropZone && dropZone.classList.contains("dropArea")) {
      setDroppedImages((prevImages) => [...prevImages, draggedImage]);
    }
    setDraggedImage(null);
  };

  return (
    <div className="container">
      <div className="imageList">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`img-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            className="draggableImage"
            onTouchStart={(e) => handleTouchStart(e, image)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        ))}
      </div>
      <div
        className="dropArea"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {droppedImages.length === 0 ? (
          <p>Drag and drop images here</p>
        ) : (
          droppedImages.map((image, index) => (
            <img key={index} src={image} alt={`dropped-${index}`} className="droppedImage" />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
