import React, { useRef, useEffect } from 'react';

function App() {
    const innerDivRef = useRef(null);
    const innerDiv1Ref = useRef(null);
    const mouseStartRef = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        innerDivRef.current.isDown = true;
        mouseStartRef.current.x = e.pageX;
        mouseStartRef.current.y = e.pageY;
        innerDivRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        innerDivRef.current.isDown = false;
        innerDivRef.current.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
        innerDivRef.current.isDown = false;
        innerDivRef.current.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
        if (!innerDivRef.current.isDown) return;
        const dx = e.pageX - mouseStartRef.current.x;
        const dy = e.pageY - mouseStartRef.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Move horizontally to scroll
            innerDivRef.current.scrollLeft -= dx;
        } else {
            // Move vertically to drag
            // Logic to handle dragging of images if needed
            // This could involve additional state management
        }

        // Update the starting position
        mouseStartRef.current.x = e.pageX;
        mouseStartRef.current.y = e.pageY;
    };

    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.src);
        // e.target.style.display = 'none'; // Hide the image during drag
    };

    const handleDragEnd = (e) => {
        e.target.style.display = 'block'; // Show the image again after drag
    };

    const handleDrop = (e) => {
        // e.preventDefault();
        const index = e.dataTransfer.getData('text/plain');
        const img = innerDivRef.current.children[index].cloneNode(true);
        img.draggable = false;
        innerDiv1Ref.current.appendChild(img);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow drop
    };

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (innerDivRef.current) {
                console.log('Scroll position:', innerDivRef.current.scrollLeft);
            }
        };

        const innerDiv = innerDivRef.current;
        innerDiv.addEventListener('scroll', handleScroll);
        return () => {
            innerDiv.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            id="container"
            style={{
                height: '90vh',
                width: '90vw',
                border: '2px solid red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                id="inner-div-1"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    height: '60%',
                    width: '80%',
                    backgroundColor: 'lightblue',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
            <div
                id="inner-div-2"
                ref={innerDivRef}
                style={{
                    height: '20%',
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    cursor: 'grab',
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {Array.from({ length: 5 }).map((_, index) => (
                    <img
                        key={index}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGLtZgjllhdhJUi8EjTdnq-0cOgB_7htCcg&s"
                        alt={`Image ${index + 1}`}
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        style={{
                            width: '160px',
                            height: '110px',
                            margin: '10px',
                            userSelect: 'none',
                            pointerEvents: 'auto',
                            display: 'block',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;