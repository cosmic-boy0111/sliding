import React, { useState, useRef } from "react";
import './App.css';

const ImageDragDrop = () => {
    const images = [
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image1",
        "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Image2",
        "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image3",
        "https://via.placeholder.com/150/FFFF00/FFFFFF?Text=Image4",
        "https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Image5",
        "https://via.placeholder.com/150/00FFFF/FFFFFF?Text=Image6",
        "https://via.placeholder.com/150/000000/FFFFFF?Text=Image7",
        "https://via.placeholder.com/150/FFA500/FFFFFF?Text=Image8"
      ];

  const [droppedImage, setDroppedImage] = useState(null);
  const [touchPreview, setTouchPreview] = useState({ src: null, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const dropAreaRef = useRef(null);

  // Touch events for mobile
  const handleTouchStart = (event, imageSrc) => {
    const touch = event.targetTouches[0];
    touchStartY.current = touch.clientY;
    setTouchPreview({ src: imageSrc, x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    const touch = event.targetTouches[0];
    const dragDistanceY = touch.clientY - touchStartY.current;

    // Only start drag if moving upwards
    if (dragDistanceY < -10) {
      setIsDragging(true);
      setTouchPreview(prev => ({ ...prev, x: touch.clientX, y: touch.clientY }));
    }
    event.preventDefault();
  };

  const handleTouchEnd = (event) => {
    if (isDragging && isInDropArea(touchPreview.x, touchPreview.y)) {
      setDroppedImage(touchPreview.src);
    }

    // Reset drag state
    setTouchPreview({ src: null, x: 0, y: 0 });
    setIsDragging(false);
  };

  const isInDropArea = (x, y) => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return false;

    const rect = dropArea.getBoundingClientRect();
    return (
      x >= rect.left && 
      x <= rect.right && 
      y >= rect.top && 
      y <= rect.bottom
    );
  };

  return (
    <div className="container">
      <div
        ref={dropAreaRef}
        className="drop-area"
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
            onTouchStart={(event) => handleTouchStart(event, src)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="draggable-image"
          />
        ))}
      </div>

      {/* Custom drag preview for touch devices */}
      {isDragging && touchPreview.src && (
        <img
          src={touchPreview.src}
          alt="Touch preview"
          className="touch-preview"
          style={{ top: touchPreview.y - 75, left: touchPreview.x - 75 }}
        />
      )}
    </div>
  );
};

export default ImageDragDrop;
