import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";


const DrawingBoard = () => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;

    const handleMouseDown = (e) => {
      const pos = stage.getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
      setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;

      const pos = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);

      setLines([...lines.slice(0, -1), lastLine]);
      layer.batchDraw();
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    window.addEventListener("resize", handleResize);

    stage.on("mousedown touchstart", handleMouseDown);
    stage.on("mousemove touchmove", handleMouseMove);
    stage.on("mouseup touchend", handleMouseUp);

    handleResize(); // 초기 화면 크기 설정

    return () => {
      window.removeEventListener("resize", handleResize);
      stage.off("mousedown touchstart", handleMouseDown);
      stage.off("mousemove touchmove", handleMouseMove);
      stage.off("mouseup touchend", handleMouseUp);
    };
  }, [isDrawing, lines]);

  const handleResize = () => {
    const stage = stageRef.current;
    if (stage) {
      stage.width(window.innerWidth);
      stage.height(window.innerHeight - 50);
      stage.batchDraw();
    }
  };

  return (
    <div>
      <Stage
        ref={stageRef}
      >
        <Layer ref={layerRef}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="BLACK"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingBoard;
