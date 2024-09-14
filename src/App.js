import React, { useState, useRef } from 'react';
import './App.css';

// Import images from assets folder
import image1 from './assets/mask2.jpg';
import image2 from './assets/profile.jpg';

function App() {
  const [droppedImage, setDroppedImage] = useState(null);
  const [images] = useState([
    { src: image1, alt: 'Image 1' },
    { src: image2, alt: 'Image 2' },
    { src: image1, alt: 'Image 3' },
    { src: image2, alt: 'Image 4' },
    { src: image1, alt: 'Image 5' },
  ]);
  const dropZoneRef = useRef(null);
  const [draggingImage, setDraggingImage] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  const handleTouchStart = (e, imageSrc) => {
    setTouchStartY(e.touches[0].clientY);
    setDraggingImage(imageSrc);
  };

  const handleTouchMove = (e) => {
    if (draggingImage && touchStartY && e.touches[0].clientY < touchStartY - 20) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!draggingImage) return;

    const touch = e.changedTouches[0];
    const dropZone = dropZoneRef.current;
    const dropZoneRect = dropZone.getBoundingClientRect();

    if (
      touch.clientX >= dropZoneRect.left &&
      touch.clientX <= dropZoneRect.right &&
      touch.clientY >= dropZoneRect.top &&
      touch.clientY <= dropZoneRect.bottom
    ) {
      setDroppedImage(draggingImage);
    }

    setDraggingImage(null);
    setTouchStartY(null);
  };

  return (
    <div className="App">
      <div 
        className="drop-zone" 
        ref={dropZoneRef}
      >
        {droppedImage ? (
          <img src={droppedImage} alt="Dropped" className="dropped-image" />
        ) : (
          <p>Drag and drop an image here</p>
        )}
      </div>
      <div className="image-list">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.src} 
            alt={image.alt} 
            onTouchStart={(e) => handleTouchStart(e, image.src)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
