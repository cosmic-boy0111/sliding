import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';

const ImageDragDrop = () => {
  const images = [
    { id: "1", url: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image1" },
    { id: "2", url: "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Image2" },
    { id: "3", url: "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Image3" },
  ];

  const [imageList, setImageList] = useState(images);
  const [droppedImage, setDroppedImage] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    // If dropped in the drop area
    if (destination.droppableId === "drop-area" && source.droppableId === "image-list") {
      const draggedImage = imageList.find(image => image.id === draggableId);
      setDroppedImage(draggedImage.url);
    }
  };

  return (
    <div className="container">
      <h2>Drag and Drop Images (Using react-beautiful-dnd)</h2>

      {/* DragDropContext handles all drag-and-drop events */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <div
              className="image-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageList.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <img
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      src={image.url}
                      alt={`img-${index}`}
                      className="draggable-image"
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="drop-area">
          {(provided) => (
            <div
              className="drop-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {droppedImage ? (
                <img src={droppedImage} alt="Dropped" className="dropped-image" />
              ) : (
                <p>Drop Here</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageDragDrop;
