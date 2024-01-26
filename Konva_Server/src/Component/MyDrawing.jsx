import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";
// import WebSocket from "ws";

import ImgComponent from "./Add/ImgComponent";
import ShapeComponent from "./Add/ShapeComponent";
import LineComponent from "./Add/LineComponent";
import ArrowComponent from "./Add/ArrowComponent";
import TextComponent from "./Add/TextComponent";
import addFunction from "./funciton/addFunction";
import useEventHandlers from "./funciton/useEventHandlers";
import redoUndoFunction from "./funciton/redoUndoFunciton";
import deleteFunction from "./funciton/deleteFunction";
import changeFunction from "./funciton/changeFunction";

const MyDrawing = () => {
  const [imageIdCounter, setImageIdCounter] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      console.log("서버로부터 메시지를 받았습니다:", event.data);
      const receivedData = JSON.parse(event.data);

      // setShapes(receivedData.shapes);
      // setDrawingList(receivedData.drawingList);
      // setLines(receivedData.lines);
      // setTexts(receivedData.texts);

      console.log(receivedData)
      applyDataToStage(receivedData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket 오류 발생:", error);
    };


    socket.onclose = () => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendInfoToServer = () => {

    // console.log("shapes:", shapes);
    // console.log("drawingList:", drawingList);
    // console.log("lines:", lines);
    // console.log("test send")
    // console.log("texts:", texts);
    // console.log("socket:", socket);

    // if (socket) {
    //   const infoToSend = {
    //     shapes: shapes, // shapes 배열
    //     drawingList: drawingList, // drawings 배열
    //     lines: lines, // lines 배열
    //     // texts: texts, // texts 배열
    //   };

    //   const jsonInfo = JSON.stringify(infoToSend);


    //   socket.send(jsonInfo);

    // }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const dataToSend = {
        shapes: shapes, // shapes 배열
        drawingList: drawingList, // drawings 배열
        lines: lines, // lines 배열
        // texts: texts, // texts 배열
        nickname: nickname,
        chattings: chattings,
      };
      socket.send(JSON.stringify(dataToSend));
    }
  };

  const applyDataToStage = (receivedData) => {
    const { shapes, drawingList, lines, nickname, chattings } = receivedData;

    // setShapes(prevShapes => {
    //   const newShapes = shapes.filter(shape => !prevShapes.some(prev => prev.id === shape.id));
    //   return [...prevShapes, ...newShapes];
    // });

    // setDrawingList(setDrawingList => {
    //   const newDrawingList = drawingList.filter(drawingList => !setDrawingList.some(prev => prev.id === drawingList.id));
    //   return [...setDrawingList, ...newDrawingList];
    // });

    // setLines(prevLines => {
    //   const newLines = lines.filter(lines => !prevLines.some(prev => prev.id === lines.id));
    //   return [...prevLines, ...newLines];
    // });

    // setTexts((prevTexts) => [...prevTexts, ...texts]);

    // 징 추가
    // setNickname(prevNickname => {
    //   const newNickname = nickname.filter(nickname => !prevNickname.some(prev => prev.id === nickname.id));
    //   return [...prevNickname, ...newNickname];
    // });

    // setChattings(prevChattings => {
    //   const newChattings = chattings.filter(chattings => !prevChattings.some(prev => prev.id === chattings.id));
    //   return [...prevChattings, ...newChattings];
    // });

    setNickname(prevNickname => {
      // const newNickName = receivedData.nickname;

      return [...prevNickname, ...nickname];
    });

    setChattings(prevChattings => {
      // const newPrevChattings = receivedData.chattings;
      return [...prevChattings, ...chattings];
    });


    console.log("TEST" + JSON.stringify(shapes));
    console.log("TEST" + JSON.stringify(drawingList));
    console.log("TEST" + JSON.stringify(lines));
    console.log(JSON.stringify(nickname));
    console.log(JSON.stringify(chattings));

    // console.log("TEST"+texts);
    console.log("TEST" + socket);
  };


  //스테이지 초기화
  const initialScaleValue = { x: 1, y: 1 };
  const initialPositionValue = { x: 0, y: 0 };
  const stageRef = useRef(null);

  //위치 조정
  const [stageScale, setStageScale] = useState(initialScaleValue);
  const [stagePosition, setStagePosition] = useState(initialPositionValue);

  //인자값 변경
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [lines, setLines] = useState([]);
  const [drawingList, setDrawingList] = useState([]);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);

  //초기값
  const [fillColor, setFillColor] = useState("black");
  const [selectedId, setSelectedId] = useState(null);
  const [currentColor, setCurrentColor] = useState(fillColor);
  const [selectStroke, setSelectStroke] = useState("");
  const [newTextValue, setNewTextValue] = useState("");

  //설정 변경
  const [startWrite, setStartWrite] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [drawing, setDrawing] = useState(false);

  // const [startEraser, setStartEraser] = useState(false);
  // const [text, setText] = useState(""); // 텍스트 입력 상태 추가

  // 채팅 메시지
  const [nickname, setNickname] = useState('');
  const [chattings, setChattings] = useState('');
  // const [fullMessage, setFullMessage] = useState([]);

  const [chatLog, setChatLog] = useState([]);

  const sendMessage = () => {
    const fullMessage = `${nickname}: ${chattings}`;
    // socket.emit('message', fullMessage); // 메시지 전송
    setChatLog([fullMessage.nickname, fullMessage.chattings])
    setChattings(''); // 입력 필드 초기화
    // console.log(fullMessage);
  };

  //토글 목록
  const [eraserToggle, setEraserToggle] = useState(false);
  const [shapeMenuToggle, setShapeMenuToggle] = useState(false);
  const [lineMenuToggle, setLineMenuToggle] = useState(false);
  const [colorMenuToggle, setColorMenuToggle] = useState(false);
  const [currentColorMenuToggle, setCurrentColorMenuToggle] = useState(false);
  const [strokeColorMenuToggle, setStrokeColorMenuToggle] = useState(false);
  const [CurrentStrokeColorMenuToggle, setCurrentStrokeColorMenuToggle] =
    useState(false);
  const [imgMenuToggle, setImgMenuToggle] = useState(false);

  const {
    changeSelectedShapeColor,
    changeSelectedStrokeColor,
    changedraggable,
    changeWrite,
    changeStrokeColor,
    renderColor,
    handleImageClick,
  } = changeFunction(
    selectedId,
    shapes,
    setShapes,
    setDraggable,
    draggable,
    setStartWrite,
    startWrite,
    setSelectStroke,
    setCurrentColor,
    setSelectedId
  );

  const {
    addText,
    addRectangle,
    addCircle,
    addTriangle,
    addLine,
    addDashedLine,
    addDottedLine,
    addArrowLine,
    addImage,
  } = addFunction(
    shapes,
    setShapes,
    lines,
    setLines,
    texts,
    setTexts,
    currentColor,
    selectStroke,
    newTextValue,
    setNewTextValue,
    images,
    setImages,
    setImageIdCounter,
    imageIdCounter
  );

  const {
    deleteSelectedShape,
    deleteSelectedLine,
    deleteSelectedDrawing,
    deleteSelectedText,
    deleteSelectedImage,
  } = deleteFunction(
    shapes,
    selectedId,
    setShapes,
    setSelectedId,
    lines,
    setLines,
    setDrawingList,
    texts,
    setTexts,
    images,
    setImages
  );

  const { zoomOnWheel, handleMouseDown, handleMouseMove, handleMouseUp } =
    useEventHandlers(
      startWrite,
      setDrawing,
      setCurrentLine,
      drawing,
      currentLine,
      setDrawingList,
      drawingList,
      fillColor,

      useCallback,
      stageRef,
      setStageScale,
      setStagePosition,
      applyDataToStage
    );

  const { redo, undo } = redoUndoFunction(
    setRedoHistory,
    setHistory,
    setShapes,
    redoHistory,
    history
  );

  useEffect(() => {
    setHistory([...history, shapes]);
  }, [shapes]);

  //토글 온오프 기능
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
  const changeEraserMenuToggle = () => {
    setEraserToggle(!eraserToggle);
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-[#EFEFEF] bg-opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* 윗 블록 */}
      <div className="absolute top-6 left-6 pl-5 bg-white rounded-md w-96 h-[50px] flex items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        {/* 뒤로가기 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        <div className="ml-6 border-l-2 border-line_gray">&ensp;</div>

        {/* 서비스 로고 */}
        <img src="/logo.svg" alt="" className="ml-4 w-8 h-8 " />
        <div className=" ml-3 font-Inter font-bold text-xl rotate-[-0.03deg]">
          Get iDEA
        </div>

        <div className="ml-8 border-l-2 border-line_gray">&ensp;</div>

        {/* 프로젝트 이름 */}
        <div className=" ml-3 font-Nanum font-medium text-base rotate-[-0.03deg]">
          새 프로젝트
        </div>
      </div>

      {/* 그리기 툴 */}
      <div className="absolute top-48 left-6  bg-white rounded-md w-[50px] h-[325px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <img
          src="/cursor.svg"
          alt=""
          className="w-6 h-6 mt-6 cursor-pointer "
          onClick={() => changedraggable()}
        />
        <img
          src="/pen.svg"
          alt=""
          className="w-6 h-6 mt-7 cursor-pointer"
          onClick={() => changeWrite()}
        />
        <img
          src="/shape.svg"
          alt=""
          className="w-7 h-7 mt-7 cursor-pointer"
          onClick={() => addRectangle("Rect")}
        />
        <div className="absolute top-[120px] left-[55px]  bg-white rounded-md w-[50px] h-[140px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
          <img src="/square.svg" alt="" className="w-6 h-6 mt-3" />
          <img src="/circle.svg" alt="" className="w-6 h-6 mt-5" />
          <img src="/triangle.svg" alt="" className="w-6 h-6 mt-5" />
        </div>
        <img
          src="/line.svg"
          alt=""
          className="w-7 h-7 mt-7 cursor-pointer"
          onClick={() => addLine("Line")}
        />
        <img src="/text.svg" alt="" className="w-6 h-6 mt-7" />
        <img src="/dots.svg" alt="" className="w-4 h-4 mt-7" />
      </div>

      {/* 삭제 버튼 */}
      <div
        className="cursor-pointer absolute top-[540px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={() => deleteSelectedShape()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      {/* 실행취소 버튼 */}
      <div
        className="cursor-pointer absolute top-[610px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={() => undo()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </div>

      {/* 복구 버튼 */}
      <div
        className="cursor-pointer absolute top-[670px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={() => undo()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </div>
      <br />
      <button
        className="absolute top-[720px] left-6 bg-blue-500 rounded-md px-4 py-2 text-white"
        onClick={sendInfoToServer.bind(this)}
      >
        정보 보내기
      </button>

      {/* 채팅창 */}
      <div className="container w-1/2 ml-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              value={chattings}
              onChange={(e) => setChattings(e.target.value)}
              placeholder="메세지"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={applyDataToStage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              전송
            </button>
          </div>
          <div id="chat-log" className="h-64 overflow-auto p-4 bg-gray-200 rounded">
            
            {/* chatLog 배열을 사용하여 메시지를 표시합니다. */}
            {chatLog.map((fullMessage, index) => (
              <div key={index}>{fullMessage.nickname}: {fullMessage.chattings}</div>
            ))}

          </div>
        </div>
      </div>


      {/* 그리는 구역 */}
      <div className="ml-24 mt-24 h-full w-full">
        <Stage
          ref={stageRef}
          width={window.innerWidth * 1}
          height={window.innerHeight * 1}
          draggable={!draggable}
          onWheel={zoomOnWheel}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
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
              <ShapeComponent
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
              // onClick={() => handleImageClick}
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
    </div>
  );
};

export default MyDrawing;
