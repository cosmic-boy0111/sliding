import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [droppedImages, setDroppedImages] = useState([]);

  const images = [
    "https://via.placeholder.com/100x100?text=Image+1",
    "https://via.placeholder.com/100x100?text=Image+2",
    "https://via.placeholder.com/100x100?text=Image+3",
    "https://via.placeholder.com/100x100?text=Image+4",
    "https://via.placeholder.com/100x100?text=Image+5",
    "https://via.placeholder.com/100x100?text=Image+6",
  ];

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageSrc", image);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageSrc = e.dataTransfer.getData("imageSrc");
    setDroppedImages((prevImages) => [...prevImages, imageSrc]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      
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
      <div className="imageList">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`img-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            className="draggableImage"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
