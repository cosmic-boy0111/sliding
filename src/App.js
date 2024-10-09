import React, { useEffect } from 'react';
import { DndProvider, DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'; // Import TouchBackend
import image1 from './assets/pexels-jovana-nesic-188639-593655.jpg';
import image2 from './assets/pexels-minan1398-906150.jpg';
import image3 from './assets/pexels-pixabay-53184.jpg';
import image4 from './assets/pexels-souvenirpixels-414612.jpg';

// Define Item Type
const ItemType = {
    ITEM: 'item',
};

// Draggable Item Component
const DraggableItem = ({ item }) => {
    const [{ isDragging, currentOffset }, drag, preview] = useDrag(() => ({
        type: ItemType.ITEM,
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            currentOffset: monitor.getClientOffset(), // Get current mouse/touch position
        }),
    }));

    return (
        <>
            <DragPreviewImage connect={preview} src={item.image} />
            <div ref={drag} style={{
                opacity: isDragging ? 0.5 : 1,
                marginRight: '1rem',
                width: '100px',
                height: '100px', // Change to absolute for dragging
                left: currentOffset ? currentOffset.x - 50 : 0, // Center the image
                top: currentOffset ? currentOffset.y - 50 : 0,
                touchAction: 'none', // Prevent default touch actions
            }}>
                <img src={item.image} alt={item.id} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    boxSizing: 'border-box',
                    backgroundColor: 'lightgray'
                }} />
            </div>
        </>
    );
};

// Drop Target Component
const DropTarget = ({ onDrop, droppedItems }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.ITEM,
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(monitor.getInitialClientOffset().x + delta.x);
            const top = Math.round(monitor.getInitialClientOffset().y + delta.y);
            onDrop(item, { left, top }); // Pass coordinates to onDrop
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={{
          position: 'relative', // Set position to relative
          height: '70vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow : 'hidden',
        }}>
            {droppedItems.length > 0 ? (
                droppedItems.map((droppedItem, index) => (
                    <img key={index} src={droppedItem.image} alt={droppedItem.text} style={{
                        position: 'absolute', // Set position to absolute for overlapping
                        left: droppedItem.left - 50,
                        top: droppedItem.top - 50,
                        width: '100px', // Set a fixed size or adjust as needed
                        height: '100px',
                        objectFit: 'cover'
                    }} />
                ))
            ) : (
                'Drop here'
            )}
        </div>
    );
};

// Main App Component
const App = () => {
    
    const [droppedItems, setDroppedItems] = React.useState([]); // Change to an array

    const handleDrop = (item, position) => {
        console.log(item);
        console.log(`Dropped item: ${item.id}`);
        // Update state to include the new dropped item with position
        setDroppedItems((prevItems) => [...prevItems, { image: item.image, text: item.text, ...position }]);
    };

    const items = [
      { id: 1, text: 'Item 1', image : image1 }, 
      { id: 2, text: 'Item 2', image : image2 },
      { id: 3, text: 'Item 3', image : image3 },
      { id: 4, text: 'Item 4', image : image4 },
    ];

    // Check if the device is mobile or desktop
    const isMobile = window.innerWidth <= 768; // You can adjust the width as needed
    const backend = isMobile ? TouchBackend : HTML5Backend; // Choose backend based on device

    return (
        <DndProvider backend={backend} options={{ enableMouseEvents: isMobile }}> {/* Use appropriate backend */}
            <div style={{
              display: 'flex',
              flexDirection : 'column',
              justifyContent : 'space-between',
              // border : '1px solid red',
              height : '100vh',
            }}>
              <DropTarget onDrop={handleDrop} droppedItems={droppedItems} />
              <div style={{
                height : '20vh',
                display : 'flex',
                width : '100%',
                overflow : 'auto',
                WebkitOverflowScrolling : 'touch'
                // border : '1px solid blue'
              }}>

                {items.map((item) => (
                  <DraggableItem key={item.id} item={item} />
                ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
