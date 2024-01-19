import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
} from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // 현재 도형에 Transformer 연결
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const renderShape = () => {
    const commonProps = {
      ref: shapeRef,
      ...shapeProps,
      draggable: true,
      onClick: onSelect,
      onDragEnd: (e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      },
      onTransformEnd: () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY, 5),
        });
      },
    };

    switch (shapeProps.type) {
      case 'Rect':
        return <Rect {...commonProps} />;
      case 'Circle':
        return <Circle {...commonProps} />;
      case 'RegularPolygon':
        return <RegularPolygon {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Rect
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY, 5),
          });
        }}
      />
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // 여기서 도형의 최소 크기 제한을 설정할 수 있습니다.
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const MyDrawing = () => {
  const [shapes, setShapes] = useState([
    { id: "rect1", x: 50, y: 50, width: 50, height: 100, fill: "red" },
    { id: "rect2", x: 100, y: 50, width: 50, height: 100, fill: "green" },
    { id: "rect3", x: 150, y: 50, width: 50, height: 100, fill: "blue" },
    { id: "rect4", x: 200, y: 50, width: 50, height: 100, fill: "violet" },
  ]);

  const [selectedId, setSelectedId] = useState(null);

  // const addShape = (type) => {
  //   const newShape = {
  // id: `${type}-${shapes.length + 1}`,
  //     x: Math.random() * window.innerWidth * 0.5,
  //     y: Math.random() * window.innerHeight * 0.5,
  //     width: 100,
  //     height: 100,
  //     fill: type === 'rect' ? 'red' : 'blue', // 여기서 다른 도형과 색상을 설정할 수 있습니다.
  //   };
  //   setShapes([...shapes, newShape]);
  // };

  const addRectangle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "Rect",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: "green",
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "Circle",
      x: 150,
      y: 150,
      radius: 50,
      fill: "blue",
    };
    setShapes([...shapes, newShape]);
  };

  const addTriangle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "RegularPolygon",
      x: 250,
      y: 150,
      sides: 3,
      radius: 50,
      fill: "red",
    };
    setShapes([...shapes, newShape]);
  };

  return (
    <div>
      <button onClick={() => addRectangle("Rect")}>Add Rectangle</button>
      <button onClick={() => addCircle("Circle")}>Add Rectangle</button>
      <button onClick={() => addTriangle("RegularPolygon")}>Add Rectangle</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          // Stage를 클릭했을 때 도형이 선택되지 않도록 합니다.
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {shapes.map((shape) => (
            <Rectangle
              key={shape.id}
              shapeProps={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                setSelectedId(shape.id);
              }}
              onChange={(newAttrs) => {
                const newShapes = shapes.map((s) =>
                  s.id === shape.id ? newAttrs : s
                );
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default MyDrawing;
