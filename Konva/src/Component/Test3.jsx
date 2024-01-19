import React, { useState } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';



  const Test3 = () => {
    const [shapes, setShapes] = React.useState([
      { x: 50, y: 50, width: 50, height: 50, fill: 'blue' },
      { x: 100, y: 100, width: 50, height: 50, fill: 'red' },
      { x: 150, y: 150, width: 50, height: 50, fill: 'green' },
    ]);

    const bringToFront = (index) => {
      const updatedShapes = [...shapes];
      const shape = updatedShapes.splice(index, 1)[0];
      updatedShapes.push(shape);
      setShapes(updatedShapes);
    };

    const handleMouseDown = (e, index) => {
      bringToFront(index);
    };

    return (
      <Stage width={500} height={300}>
        <Layer>
          {shapes.map((shape, index) => (
            <Rect
              key={index}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              onClick={(e) => handleMouseDown(e, index)}
              draggable
            />
          ))}
        </Layer>
      </Stage>
    );
  };

export default Test3;
