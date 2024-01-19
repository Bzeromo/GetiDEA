import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
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
      case "Rect":
        return <Rect {...commonProps} />;
      case "Circle":
        return <Circle {...commonProps} />;
      case "RegularPolygon":
        return <RegularPolygon {...commonProps} />;
      case "Line":
        return <Line {...commonProps} />;

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

const LineComponent = ({ lineProps, isSelected, onSelect, onChange }) => {
  const lineRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([lineRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={lineRef}
        {...lineProps}
        draggable
        onClick={onSelect}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

const MyDrawing = () => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);

  const [lines, setLines] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [fillColor, setFillColor] = useState("black");

  const [selectStroke, setSelectStroke] = useState("");

  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);

  const [startWrite, setStartWrite] = useState(false);

  const [startEraser, setStartEraser] = useState(false)

  useEffect(() => {
    setHistory([...history, shapes]);
    // setHistory([...history, lines]);
    // setHistory([...history, drawing]);
  }, [shapes]);


  const handleMouseDown = (e) => {
    if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    setDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine([pos.x, pos.y]);
    console.log(pos.x + "    " + pos.y);
  };

  const handleMouseMove = (e) => {
    if (!drawing || !startWrite) return; // startWrite가 false이면 기능 비활성화
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setCurrentLine(currentLine.concat([point.x, point.y]));
    console.log(point.x + "    " + point.y);
  };

  const handleMouseUp = () => {
    if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    setDrawing(false);
    setLines([
      ...lines,
      { points: currentLine, stroke: fillColor, strokeWidth: 5 },
    ]);
  };

  const renderColor = (color) => {
    setFillColor(color);
  };

  const changeWrite = () => {
    setStartWrite(!startWrite);
  };

  const changeStrokeColor = (color) => {
    setSelectStroke(color);
  }

  const changeEraser = () => {
    setStartEraser(!startEraser);
  }

  const undo = () => {
    if (history.length === 0) return; // 되돌릴 내용이 없는 경우

    const previous = history[history.length - 2]; // 마지막 변경 사항 전의 상태
    setShapes(previous); // 이전 상태로 도형 설정
    setHistory(history.slice(0, -1)); // 마지막 변경 사항 제거
  };

  const addRectangle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "Rect",
      stroke : selectStroke,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: fillColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "Circle",
      stroke : selectStroke,
      x: 150,
      y: 150,
      radius: 50,
      fill: fillColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addTriangle = (type) => {
    const newShape = {
      id: `${type}-${shapes.length + 1}`,
      type: "RegularPolygon",
      stroke : selectStroke,
      x: 250,
      y: 150,
      sides: 3,
      radius: 50,
      fill: fillColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addLine = (type) => {
    const newLine = {
      id: `${type}-${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: fillColor,
      strokeWidth: 10,
      lineCap: "round",
      lineJoin: "round",
    };
    setLines([...lines, newLine]);
  };

  const addDashedLine = (type) => {
    const newLine = {
      id: `${type}-${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: fillColor,
      strokeWidth: 5,
      lineJoin: "round",
      dash: [33, 10],
    };
    setLines([...lines, newLine]);
  };

  const addDottedLine = (type) => {
    const newLine = {
      id: `${type}-${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: fillColor,
      strokeWidth: 10,
      lineCap: "round",
      lineJoin: "round",
      dash: [29, 20, 0.001, 20],
    };
    setLines([...lines, newLine]);
  };

  return (
    <div>
      <div>그리기</div>
      <button onClick={() => changeWrite()}>write</button>
      <br />
      <div>지우개</div>
      <button onClick={() => changeEraser()}>Erager</button>
      <br />
      <div>되돌리기</div>
      <button onClick={() => undo()}>undo</button>
      <br />
      <div>도형 만들기</div>
      <button onClick={() => addRectangle("Rect")}>Add Rectangle</button>
      <button onClick={() => addCircle("Circle")}>Add Rectangle</button>
      <button onClick={() => addTriangle("RegularPolygon")}>
        Add Rectangle
      </button>
      <br />
      <div>컬러 바꾸기</div>
      <button onClick={() => renderColor("blue")}>blue</button>
      <button onClick={() => renderColor("red")}>red</button>
      <button onClick={() => renderColor("green")}>green</button>
      <button onClick={() => renderColor("violet")}>violet</button>
      <button onClick={() => renderColor("")}>clear</button>
      <br />
      <div>테두리 색 변경</div>
      <button onClick={() => changeStrokeColor("black")}>black</button>
      <button onClick={() => changeStrokeColor("blue")}>blue</button>
      <button onClick={() => changeStrokeColor("red")}>red</button>
      <button onClick={() => changeStrokeColor("green")}>green</button>
      <button onClick={() => changeStrokeColor("")}>clean</button>
      <br />
      <div>선 변경</div>
      <button onClick={() => addLine("Line")}>Line</button>
      <button onClick={() => addDashedLine("Dashed")}>DashedLine</button>
      <button onClick={() => addDottedLine("Dotted")}>DottedLine</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {drawing && (
            <Line points={currentLine} stroke={fillColor} strokeWidth={5} />
          )}
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
                setShapes(newShapes); // 상태 업데이트
              }}
            />
          ))}
          {lines.map((line, i) => (
            <LineComponent
              key={i}
              lineProps={line}
              isSelected={line.id === selectedId}
              onSelect={() => {
                setSelectedId(line.id);
              }}
              
              onChange={(newAttrs) => {
                const newLines = lines.map((l) =>
                  l.id === line.id ? newAttrs : l
                );
                setLines(newLines);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default MyDrawing;
