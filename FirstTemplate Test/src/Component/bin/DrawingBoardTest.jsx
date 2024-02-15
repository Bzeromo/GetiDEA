import React, { useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

const DrawingBoardTest = () => {
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing); // 그리기 모드 토글
  };

  const handleStageMouseDown = (e) => {
    if (isDrawing) {
      // 선 그리기 시작
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
    } else {
      // 그리기 모드가 아닐 때만 도형 추가
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        const { x, y } = e.target.getPointerPosition();
        addShape(x, y);
      }
    }
  };

  const addShape = (x, y) => {
    const newShape = {
      type: 'Rect',
      x,
      y,
      width: 100,
      height: 100,
      fill: 'green',
      draggable: true
    };
    setShapes([...shapes, newShape]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const onDragEnd = (e, index) => {
    const updatedShapes = shapes.slice();
    updatedShapes[index] = {
      ...shapes[index],
      x: e.target.x(),
      y: e.target.y()
    };
    setShapes(updatedShapes);
  };

  return (
    <div>
      <button onClick={toggleDrawing}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, i) => (
            <Rect
              key={i}
              {...shape}
              onDragEnd={(e) => onDragEnd(e, i)}
            />
          ))}
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="black" strokeWidth={5} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingBoardTest;
