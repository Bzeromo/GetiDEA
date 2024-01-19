import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, RegularPolygon } from 'react-konva';

const DrawingBoard2 = () => {
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const addRectangle = () => {
    const rect = {
      type: 'Rect',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: 'green'
    };
    setShapes([...shapes, rect]);
  };

  const addCircle = () => {
    const circle = {
      type: 'Circle',
      x: 150,
      y: 150,
      radius: 50,
      fill: 'blue'
    };
    setShapes([...shapes, circle]);
  };

  const addTriangle = () => {
    const triangle = {
      type: 'RegularPolygon',
      x: 250,
      y: 150,
      sides: 3,
      radius: 50,
      fill: 'red'
    };
    setShapes([...shapes, triangle]);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || lines.length === 0) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    // 마지막 선의 points 배열에 새로운 포인트를 추가
    lastLine.points = lastLine.points.concat([point.x, point.y]);
  
    // lines 배열 업데이트
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };
  

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <button onClick={addRectangle}>Add Rectangle</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addTriangle}>Add Triangle</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, i) => {
            switch (shape.type) {
              case 'Rect':
                return <Rect key={i} {...shape} />;
              case 'Circle':
                return <Circle key={i} {...shape} />;
              case 'RegularPolygon':
                return <RegularPolygon key={i} {...shape} />;
              default:
                return null;
            }
          })}
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="black" strokeWidth={5} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingBoard2;
