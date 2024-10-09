import React, { useState } from "react";
import './App.css';

const ImageDragDrop = () => {
  const images = [
    "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image1",
    "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Image2",
    "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image3",
    "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image4",
    "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image5",
    "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image6",
  ];

  const [droppedImage, setDroppedImage] = useState(null);
  const [touchPreview, setTouchPreview] = useState({ src: null, x: 0, y: 0 });

  // Drag events for desktop
  const handleDragStart = (event, imageSrc) => {
    event.dataTransfer.setData("imageSrc", imageSrc);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageSrc = event.dataTransfer.getData("imageSrc");
    setDroppedImage(imageSrc);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Touch events for mobile
  const handleTouchStart = (event, imageSrc) => {
    const touch = event.targetTouches[0];
    setTouchPreview({ src: imageSrc, x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    const touch = event.targetTouches[0];
    setTouchPreview(prev => ({ ...prev, x: touch.clientX, y: touch.clientY }));
    event.preventDefault();
  };

  const handleTouchEnd = (event) => {
    const imageSrc = touchPreview.src;
    setDroppedImage(imageSrc);
    setTouchPreview({ src: null, x: 0, y: 0 });
  };

  return (
    <div className="container">
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {droppedImage ? (
          <img src={droppedImage} alt="Dropped" className="dropped-image" />
        ) : (
          <p>Drop Here</p>
        )}
      </div>
      <div className="image-list">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`img-${index}`}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, src)}
            onTouchStart={(event) => handleTouchStart(event, src)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="draggable-image"
          />
        ))}
      </div>
      {/* Custom drag preview for touch devices */}
      {touchPreview.src && (
        <img
          src={touchPreview.src}
          alt="Touch preview"
          className="touch-preview"
          style={{ top: touchPreview.y - 50, left: touchPreview.x - 50 }}
        />
      )}
    </div>
  );
};

export default ImageDragDrop;
