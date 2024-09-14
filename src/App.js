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
    { src: image1, alt: 'Image 2' },
    { src: image2, alt: 'Image 2' },
    { src: image1, alt: 'Image 2' },
  ]);
  const dropZoneRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setDroppedImage(e.target.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  // const handleImageClick = (imageSrc) => {
  //   setDroppedImage(imageSrc);
  // };

  return (
    <div className="App">
      <div 
        className="drop-zone" 
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedImage && <img src={droppedImage} alt="Dropped" className="dropped-image" />}
      </div>
      <div className="image-list">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.src} 
            alt={image.alt} 
            // onClick={() => handleImageClick(image.src)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
