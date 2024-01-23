import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
  Text,
  Arrow,
  Image,
} from "react-konva";
// import Konva from "konva";

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
      case "Arrow":
        return <Arrow {...commonProps} />;
      case "Text":
        return <Text {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <>
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
      <Line ref={lineRef} {...lineProps} draggable onClick={onSelect} />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

const ArrowComponent = ({ lineProps, isSelected, onSelect, onChange }) => {
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
      <Arrow ref={lineRef} {...lineProps} draggable onClick={onSelect} />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

const ImageList = ({ onImageSelect, isSelected }) => {
  const images = [
    "/img/강아지.jpg",
    "/img/고양이.jpg",
    "/img/아기사슴.jpg",
    "/img/햄스터.jpg",
  ]; // 이미지 경로 목록
  const imageRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <div>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`image-${index}`}
          onClick={() => onImageSelect(src)}
          style={{ width: "100px", cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

const TextComponent = ({
  textProps,
  isSelected,
  onSelect,
  onChange,
  onTextEdit,
}) => {
  const textRef = useRef();
  const transformerRef = useRef();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(textProps.text);

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    console.log("더블 클릭됨"); // 로그 추가
    setEditing((prevEditing) => !prevEditing);
    console.log(editing);
    // console.log(editing);
  };

  const handleChange = (e) => {
    console.log("change1");
    setText(e.target.value);
  };

  const handleBlur = () => {
    console.log("change2");
    setEditing(false);
    if (onTextEdit) {
      onTextEdit({ ...textProps, text });
    }
    onChange({ ...textProps, text }); // 변경된 텍스트를 상위 컴포넌트에 전달
  };

  return (
    <>
      {editing && (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            position: "absolute",
            top: `${textProps.y}px`, // 확인: 정확한 위치 설정
            left: `${textProps.x}px`, // 확인: 정확한 위치 설정
            zIndex: "5",
            // 추가 스타일링이 필요한 경우 여기에 추가
            width: "100px",
            height: "50px",
          }}
          autoFocus
        />
      )}
      <Text
        ref={textRef}
        {...textProps}
        text={text}
        draggable
        onClick={onSelect}
        onDblClick={handleDoubleClick}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

const MyDrawing = () => {
  const [imageIdCounter, setImageIdCounter] = useState(0);

  const handleImageSelect = (src) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // 이미지 객체에 ID 추가
      setImages([...images, { id: imageIdCounter, img }]);
      // ID 카운터 증가
      setImageIdCounter(imageIdCounter + 1);
    };
  };

  const initialScaleValue = { x: 1, y: 1 };
  const initialPositionValue = { x: 0, y: 0 };

  const stageRef = useRef(null);

  const [stageScale, setStageScale] = useState(initialScaleValue);
  const [stagePosition, setStagePosition] = useState(initialPositionValue);

  const zoomOnWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const zoomDirection = e.evt.deltaY > 0 ? 1 : -1;
    const scaleBy = 1.1;
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale =
      zoomDirection > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    // 상태 업데이트 함수 사용
    setStageScale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);

    // 상태 업데이트 함수 사용
    setStagePosition(newPos);
  }, []);

  const resetZoom = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    stagePosition({ x: 0, y: 0 });
    setStageScale({ x: 1, y: 1 });
  }, []);

  const handleImageClick = (id) => {
    setSelectedId(id);
  };

  const deleteSelectedImage = () => {
    if (selectedId) {
      const newImages = images.filter(
        (image) => `image${image.id}` !== selectedId
      );
      setImages(newImages);
      setSelectedId(null); // 이미지 삭제 후 선택된 이미지 ID 초기화
    }
  };

  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [draggable, setDraggable] = useState(false);

  const [lines, setLines] = useState([]);

  const [drawingList, setDrawingList] = useState([]);

  const [texts, setTexts] = useState([]);

  const [images, setImages] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  const [fillColor, setFillColor] = useState("black");

  // const [strokeColor, setStrokeColor] = useState("black");

  const [currentColor, setCurrentColor] = useState(fillColor);

  // const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor);

  const [shapeMenuToggle, setShapeMenuToggle] = useState(false);

  const [lineMenuToggle, setLineMenuToggle] = useState(false);

  const [colorMenuToggle, setColorMenuToggle] = useState(false);

  const [currentColorMenuToggle, setCurrentColorMenuToggle] = useState(false);

  const [strokeColorMenuToggle, setStrokeColorMenuToggle] = useState(false);

  const [CurrentStrokeColorMenuToggle, setCurrentStrokeColorMenuToggle] =
    useState(false);

  const [imgMenuToggle, setImgMenuToggle] = useState(false);

  const [selectStroke, setSelectStroke] = useState("");

  const [drawing, setDrawing] = useState(false);

  const [currentLine, setCurrentLine] = useState([]);

  const [startWrite, setStartWrite] = useState(false);

  const [startEraser, setStartEraser] = useState(false);

  const [newTextValue, setNewTextValue] = useState("");

  // const [text, setText] = useState(""); // 텍스트 입력 상태 추가

  useEffect(() => {
    setHistory([...history, shapes]);
    // setHistory([...history, lines]);
    // setHistory([...history, drawing]);
  }, [shapes]);

  const handleMouseDown = (e) => {
    if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    setDrawing(true);
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    // 스테이지의 스케일과 위치를 고려하여 마우스 포인터의 위치를 조정
    const x = (pointer.x - stage.x()) / stage.scaleX();
    const y = (pointer.y - stage.y()) / stage.scaleY();

    setCurrentLine([x, y]);
  };

  const handleMouseMove = (e) => {
    if (!drawing || !startWrite) return; // startWrite가 false이면 기능 비활성화
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    const x = (pointer.x - stage.x()) / stage.scaleX();
    const y = (pointer.y - stage.y()) / stage.scaleY();

    setCurrentLine(currentLine.concat([x, y]));

    // setCurrentLine(currentLine.concat([point.x, point.y]));
    // console.log(point.x + "    " + point.y);
  };

  const handleMouseUp = () => {
    if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    setDrawing(false);
    setDrawingList([
      ...drawingList,
      { points: currentLine, stroke: fillColor, strokeWidth: 5 },
    ]);
  };

  const renderColor = (color) => {
    setCurrentColor(color);
  };

  // const renderLineColor = (color) => {
  //   setCurrentColor(color);
  // };

  const changeWrite = () => {
    setStartWrite(!startWrite);
  };

  const changeStrokeColor = (color) => {
    setSelectStroke(color);
  };

  const changeEraser = () => {
    setStartEraser(!startEraser);
  };

  const shapeToggle = () => {
    setShapeMenuToggle(!shapeMenuToggle);
  };

  const lineToggle = () => {
    setLineMenuToggle(!lineMenuToggle);
  };

  const colorToggle = () => {
    setColorMenuToggle(!colorMenuToggle);
  };

  const currentColorToggle = () => {
    setCurrentColorMenuToggle(!currentColorMenuToggle);
  };

  const strokeToggle = () => {
    setStrokeColorMenuToggle(!strokeColorMenuToggle);
  };

  const currentStrokeToggle = () => {
    setCurrentStrokeColorMenuToggle(!CurrentStrokeColorMenuToggle);
  };

  const imgToggle = () => {
    setImgMenuToggle(!imgMenuToggle);
  };

  const changedraggable= () => {
    setDraggable(!draggable)
  }

  const undo = () => {
    if (history.length === 0) return; // 되돌릴 내용이 없는 경우

    const previous = history[history.length - 2]; // 마지막 변경 사항 전의 상태
    setShapes(previous); // 이전 상태로 도형 설정
    setHistory(history.slice(0, -1)); // 마지막 변경 사항 제거
  };

  const deleteSelectedShape = () => {
    const newShapes = shapes.filter((shape) => shape.id !== selectedId);
    setShapes([newShapes]);
    setSelectedId(null); // 선택 해제
  };

  const deleteSelectedLine = () => {
    const newLines = lines.filter((line) => line.id !== selectedId);
    setLines(newLines);
    setSelectedId(null); // 선택 해제
  };

  const deleteSelectedDrawing = () => {
    setDrawingList([]);
    console.log("삭제 완료");
  };

  const deleteSelectedText = () => {
    const newTexts = texts.filter((text) => text.id !== selectedId);
    setTexts(newTexts);
    setSelectedId(null);
  };

  const deleteSelectedImg = () => {
    const newImages = images.filter((image) => image.id !== selectedId);
    setImages(newImages);
    setSelectedId(null);
  };

  const changeSelectedShapeColor = (color) => {
    if (!selectedId) return; // 선택된 도형이 없으면 함수 종료

    // 선택된 도형 찾기
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === selectedId) {
        return { ...shape, fill: color }; // 색상 변경
      }
      return shape;
    });

    setShapes(updatedShapes);
  };

  // const changeSelectedLineColor = (color) => {
  //   if (!selectedId) return; // 선택된 도형이 없으면 함수 종료

  //   // 선택된 도형 찾기
  //   const updatedLines = lines.map((line) => {
  //     if (line.id === selectedId) {
  //       return { ...line, fill: color }; // 색상 변경
  //     }
  //     return line;
  //   });

  //   setLines(updatedLines);
  // };

  const changeSelectedStrokeColor = (color) => {
    if (!selectedId) return; // 선택된 도형이 없으면 함수 종료

    // 선택된 도형 찾기
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === selectedId) {
        return { ...shape, stroke: color }; // 색상 변경
      }
      return shape;
    });

    setShapes(updatedShapes);
  };

  const addRectangle = (type) => {
    const newShape = {
      id: `${type}${shapes.length + 1}`,
      type: "Rect",
      stroke: selectStroke,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: currentColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = (type) => {
    const newShape = {
      id: `${type}${shapes.length + 1}`,
      type: "Circle",
      stroke: selectStroke,
      x: 150,
      y: 150,
      radius: 50,
      fill: currentColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addTriangle = (type) => {
    const newShape = {
      id: `${type}${shapes.length + 1}`,
      type: "RegularPolygon",
      stroke: selectStroke,
      x: 250,
      y: 150,
      sides: 3,
      radius: 50,
      fill: currentColor,
    };
    setShapes([...shapes, newShape]);
  };

  const addLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: currentColor,
      strokeWidth: 10,
      lineCap: "round",
      lineJoin: "round",
      fill: currentColor,
    };
    setLines([...lines, newLine]);
  };

  const addDashedLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: currentColor,
      strokeWidth: 5,
      lineJoin: "round",
      dash: [33, 10],
      fill: currentColor,
    };
    setLines([...lines, newLine]);
  };

  const addDottedLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      points: [50, 50, 250, 50],
      stroke: currentColor,
      strokeWidth: 10,
      lineCap: "round",
      lineJoin: "round",
      dash: [29, 20, 0.001, 20],
      fill: currentColor,
    };
    setLines([...lines, newLine]);
  };

  const addArrowLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      type: "Arrow",
      points: [50, 50, 250, 50],
      pointerLength: 20,
      // pointerLength: 20,
      stroke: currentColor,
      strokeWidth: 10,
      strokeWidth: 4,
      fill: currentColor,
    };
    setLines([...lines, newLine]);
  };

  const addText = () => {
    if (newTextValue) {
      const newText = {
        id: `Text-${texts.length + 1}`,
        type: "Text",
        text: newTextValue,
        x: 100, // 텍스트 위치 조절
        y: 100, // 텍스트 위치 조절
        fontSize: 18, // 텍스트 폰트 크기 조절
        fill: selectStroke, // 텍스트 색상 설정
      };
      setTexts([...texts, newText]);
      setNewTextValue(""); // 텍스트 입력 초기화
    }
  };

  return (
    <div>
      <div>그리기</div>
      <button onClick={() => changeWrite()}>write</button>
      <br />
      <button onClick={() => changedraggable()}>draggable</button>
      <br />
      <div>지우개</div>
      <button onClick={() => changeEraser()}>Erager</button>
      <button onClick={() => deleteSelectedShape()}>DeleteShape</button>
      <button onClick={() => deleteSelectedLine()}>DeleteLine</button>
      <button onClick={() => deleteSelectedDrawing()}>DeleteDrawing</button>
      <button onClick={() => deleteSelectedText()}>DeleteText</button>
      <button onClick={() => deleteSelectedImage()}>DeleteImg</button>
      <br />
      <div>되돌리기</div>
      <button onClick={() => undo()}>undo</button>
      <br />
      <div>텍스트 추가</div>
      <input
        type="text"
        placeholder="텍스트를 입력하세요"
        value={newTextValue}
        onChange={(e) => setNewTextValue(e.target.value)}
      />
      <button onClick={() => addText()}>추가</button>
      <br />
      <br />
      <div>
        <button onClick={shapeToggle}>shape</button>
        {shapeMenuToggle && (
          <>
            <button onClick={() => addRectangle("Rect")}>Add Rectangle</button>
            <button onClick={() => addCircle("Circle")}>Add Rectangle</button>
            <button onClick={() => addTriangle("RegularPolygon")}>
              Add Rectangle
            </button>
          </>
        )}
      </div>
      <br />
      <div>
        <button onClick={colorToggle}>color</button>
        {colorMenuToggle && (
          <>
            <button onClick={() => renderColor("blue")}>blue</button>
            <button onClick={() => renderColor("red")}>red</button>
            <button onClick={() => renderColor("green")}>green</button>
            <button onClick={() => renderColor("violet")}>violet</button>
            <button onClick={() => renderColor("")}>clear</button>
          </>
        )}
      </div>
      <br />
      <div>
        <button onClick={currentColorToggle}>currentColor</button>
        {currentColorMenuToggle && (
          <>
            <button onClick={() => changeSelectedShapeColor("blue")}>
              blue
            </button>
            <button onClick={() => changeSelectedShapeColor("red")}>red</button>
            <button onClick={() => changeSelectedShapeColor("green")}>
              green
            </button>
            <button onClick={() => changeSelectedShapeColor("violet")}>
              violet
            </button>
            <button onClick={() => changeSelectedShapeColor("")}>clear</button>
          </>
        )}
      </div>
      {/* <br />
      <div>
        <button onClick={currentColorToggle}>currentLineColor</button>
        {currentColorMenuToggle && (
          <>
            <button onClick={() => changeSelectedLineColor("blue")}>
              blue
            </button>
            <button onClick={() => changeSelectedLineColor("red")}>red</button>
            <button onClick={() => changeSelectedLineColor("green")}>
              green
            </button>
            <button onClick={() => changeSelectedLineColor("violet")}>
              violet
            </button>
            <button onClick={() => changeSelectedLineColor("")}>clear</button>
          </>
        )}
      </div> */}
      <br />
      <div>
        <button onClick={strokeToggle}>stroke</button>
        {strokeColorMenuToggle && (
          <>
            <button onClick={() => changeStrokeColor("black")}>black</button>
            <button onClick={() => changeStrokeColor("blue")}>blue</button>
            <button onClick={() => changeStrokeColor("red")}>red</button>
            <button onClick={() => changeStrokeColor("green")}>green</button>
            <button onClick={() => changeStrokeColor("")}>clean</button>
          </>
        )}
      </div>
      <br />
      <div>
        <button onClick={currentStrokeToggle}>CurrentStroke</button>
        {CurrentStrokeColorMenuToggle && (
          <>
            <button onClick={() => changeSelectedStrokeColor("black")}>
              black
            </button>
            <button onClick={() => changeSelectedStrokeColor("blue")}>
              blue
            </button>
            <button onClick={() => changeSelectedStrokeColor("red")}>
              red
            </button>
            <button onClick={() => changeSelectedStrokeColor("green")}>
              green
            </button>
            <button onClick={() => changeSelectedStrokeColor("")}>clean</button>
          </>
        )}
      </div>
      <br />
      <div>
        <button onClick={lineToggle}>line</button>
        {lineMenuToggle && (
          <>
            <button onClick={() => addLine("Line")}>Line</button>
            <button onClick={() => addDashedLine("Dashed")}>DashedLine</button>
            <button onClick={() => addDottedLine("Dotted")}>DottedLine</button>
            <button onClick={() => addArrowLine("Arrow")}>ArrowLine</button>
          </>
        )}
      </div>
      <br />
      <div>
        <button onClick={imgToggle}>img</button>
        {imgMenuToggle && (
          <>
            <ImageList onImageSelect={handleImageSelect} />
          </>
        )}
      </div>

      <Stage
        ref={stageRef}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
        draggable={!draggable}
        onWheel={zoomOnWheel}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: "1px solid grey" }}
        onDragEnd={(e) => {
          setStagePosition({ x: e.target.x(), y: e.target.y() });
        }}
      >
        <Layer>
          {drawing && (
            <Line points={currentLine} stroke={fillColor} strokeWidth={5} />
          )}
          {drawingList.map((drawing, i) => (
            <Line key={i} {...drawing} />
          ))}
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
          {lines.map((line, i) => {
            if (line.type === "Arrow") {
              return (
                <ArrowComponent
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
              );
            } else {
              return (
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
              );
            }
          })}
          {texts.map((text, i) => (
            <TextComponent
              key={i}
              textProps={text}
              isSelected={text.id === selectedId}
              onSelect={() => {
                setSelectedId(text.id);
              }}
              onChange={(newAttrs) => {
                const newTexts = texts.map((t) =>
                  t.id === text.id ? { ...t, ...newAttrs } : t
                );
                setTexts(newTexts);
              }}
            />
          ))}

          {images.map((imageObj, index) => (
            <Image
              key={index}
              id={`image-${imageObj.id}`} // 고유 ID 설정
              image={imageObj.img}
              x={20}
              y={20}
              width={100}
              height={100}
              draggable
              onClick={() => setSelectedId(`image-${imageObj.id}`)} // onClick에서 ID 설정
            />
          ))}

          {selectedId && (
            <Transformer
              ref={(node) => {
                if (node) {
                  const selectedNode = node
                    .getStage()
                    .findOne(`#${selectedId}`);
                  if (selectedNode) {
                    node.attachTo(selectedNode);
                  }
                }
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default MyDrawing;
