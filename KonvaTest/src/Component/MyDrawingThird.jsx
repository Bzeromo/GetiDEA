import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";
import axios from "axios";
import useImage from "use-image";
import URLImage from "./Add/URLImage";

import ImgComponent from "./Add/ImgComponent";
import ShapeComponent from "./Add/ShapeComponent";
import LineComponent from "./Add/LineComponent";
import ArrowComponent from "./Add/ArrowComponent";
import addFunction from "./funciton/addFunction";
import redoUndoFunction from "./funciton/redoUndoFunciton";
import deleteFunction from "./funciton/deleteFunction";
import changeFunction from "./funciton/changeFunction";
import LayerFunction from "./funciton/LayerFunction";
import postData from "./axios/postData";
import TextComponent from "./Add/TextComponent";
import useEventHandler from "./funciton/useEventHandler";
import ImageSelector from "./funciton/ImageSelector";
import undoData from "./axios/undoData";

const MyDrawing = () => {
  const [imageIdCounter, setImageIdCounter] = useState(0);

  const [rectPosition, setRectPosition] = useState({ x: 50, y: 50 });
  const [linePosition, setLinePosition] = useState({
    startX: 50,
    startY: 50,
    endX: 250,
    endY: 50,
  });

  const textRef = useRef();
  const lineRef = useRef();
  const shapeRef = useRef();
  const ImageRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImageSrc, setSelectedImageSrc] = useState(""); // 선택된 이미지 경로 상태

  //프로젝트 이름
  const [projectName, setProjectName] = useState("초기 프로젝트");

  //스테이지 초기화
  const initialScaleValue = { x: 1, y: 1 };
  const initialPositionValue = { x: 0, y: 0 };
  const stageRef = useRef(null);

  //위치 조정
  const [stageScale, setStageScale] = useState(initialScaleValue);
  const [stagePosition, setStagePosition] = useState(initialPositionValue);

  //레이어 변경
  const layerRef = useRef(null);

  //채팅방
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState({ nickname: "", message: "" });

  //드래그 끝남 여부 확인(비동기 처리 필요)
  const [dragEnded, setDragEnded] = useState(false);

  //인자값 변경
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [lines, setLines] = useState([]);
  const [drawingList, setDrawingList] = useState([]);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);

  //전체 드래그 기능 구현
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionRect, setSelectionRect] = useState({});
  const selectionRectRef = useRef();
  const transformerRef = useRef();

  //초기값
  const [fillColor, setFillColor] = useState("#000000");
  const [selectedId, setSelectedId] = useState(null);
  const [currentColor, setCurrentColor] = useState(fillColor);
  const [selectStroke, setSelectStroke] = useState("");
  const [newTextValue, setNewTextValue] = useState("");
  const [fontSize, setFontSize] = useState(10);

  //설정 변경
  const [startWrite, setStartWrite] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [drawing, setDrawing] = useState(false);

  // const [startEraser, setStartEraser] = useState(false);
  // const [text, setText] = useState(""); // 텍스트 입력 상태 추가

  //토글 목록
  const [eraserToggle, setEraserToggle] = useState(false);
  const [writeToggle, setWriteToggle] = useState(false);
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
    PostRect,
    PostCircle,
    PostTriangle,
    PostText,
    PostLine,
    PostDot,
    PostArrow,
    PostSave,
  } = postData(axios);

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
    addTextBox,
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
    imageIdCounter,
    rectPosition,
    linePosition,
    selectedId,
    setTexts,
    fontSize,
    setFontSize,
    setSelectedId
  );

  const {
    deleteSelectedShape,
    deleteSelectedLine,
    deleteSelectedDrawing,
    deleteSelectedText,
    deleteSelectedImage,
    deleteSelected,
  } = deleteFunction(
    shapes,
    selectedId,
    setShapes,
    setSelectedId,
    lines,
    setLines,
    setDrawingList,
    drawingList,
    texts,
    setTexts,
    images,
    setImages
  );

  // const [selectedImageUrl, setSelectedImageUrl] = useState(null); // 선택된 이미지 URL을 저장하는 상태
  // const [selectedImageUrls, setSelectedImageUrls] = useState([]);

  const handleImageSelect = (src) => {
    setSelectedImage(src);
  };

  useEffect(() => {
    console.log("업데이트됨" + selectedId);
  }, [selectedId]);

  // 템플릿3 이미지 불러오기
  useEffect(() => {
    const templateImage = {
      id: "template3",
      src: '/img/template3_check7/template3.png',
      x: 31, // 이미지의 x 좌표
      y: 10, // 이미지의 y 좌표

      // draggable: false,
      // scaleX: 5.86,
      // scaleY: 5,
      // height: 96,
      // width: 200,

      // type: "Image",
      // ty: "Image", // 이미지 경로
    }

    setImages([templateImage])

  }, [])

  // useEffect(() =>{
  // }, [images])

  function updateArray(array, item, key) {
    const index = array.findIndex((element) => element.id === key);

    if (index >= 0) {
      // 기존 항목 업데이트
      return array.map((element, i) =>
        i === index ? { ...element, ...item } : element
      );
    } else {
      // 새 항목 추가
      return [...array, { id: key, ...item }];
    }
  }

  const GetData = () => {
    axios
      .get("http://192.168.31.172:8080/api/project/data/1/1")
      .then((response) => {
        if (response.data && response.data.data) {
          const dataItems = response.data.data;

          console.log(response);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];
            const itemWithDefaults = {
              ...item,
              x: item.x ?? 0, // 기본값 0으로 설정
              y: item.y ?? 0, // 기본값 0으로 설정
              // 필요한 다른 속성에 대해서도 기본값을 설정할 수 있습니다.
            };
            switch (item.ty) {
              case "Text":
                setTexts((prevTexts) => updateArray(prevTexts, key));
                break;
              case "Shape":
                console.log(JSON.stringify(item) + "짜잔?");
                setShapes((prevShapes) => updateArray(prevShapes, itemWithDefaults, key));
                break;
              case "Line":
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "img":
                setImages((prevImage) => updateArray(prevImage, item, key));
                break;
              default:
                // 기타 타입 처리
                break;
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/");

    socket.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      // console.log("서버로부터 메시지를 받았습니다:", event.data);

      if (event.data instanceof Blob) {
        const textDataPromise = new Response(event.data).text();
        textDataPromise
          .then((jsonData) => {
            const receivedData = JSON.parse(jsonData);
            // updateShapes(receivedData);
            applyDataToStage(receivedData);
          })
          .catch((error) => {
            console.error("JSON 파싱 중 오류:", error);
          });
      } else {
        // 이미 문자열인 경우 바로 JSON 파싱
        const receivedData = JSON.parse(event.data);
        applyDataToStage(receivedData);
      }
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
    if (chatInput.nickname.trim() !== "" && chatInput.message.trim() !== "") {
      const newChat = { ...chatInput, id: new Date().getTime() };
      setChatLog((prevChatLog) => [...prevChatLog, newChat]);
      setChatInput({ nickname: "", message: "" }); // 입력 필드 초기화
    }

    // 서버에 데이터 전송
    if (socket && socket.readyState === WebSocket.OPEN) {
      const dataToSend = {
        shapes: shapes, // 항상 도형 데이터를 포함합니다.
        lines: lines,
        texts: texts,
        images: images,
        newChat:
          chatInput.nickname.trim() !== "" && chatInput.message.trim() !== ""
            ? { ...chatInput, id: new Date().getTime() }
            : null, // 채팅 메시지가 있을 때만 전송
      };
      socket.send(JSON.stringify(dataToSend));
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.getLayer().batchDraw();
    }
  }, [texts]); // texts 상태가 변경될 때마다 실행

  useEffect(() => {
    if (shapeRef.current) {
      shapeRef.current.getLayer().batchDraw();
    }
  }, [shapes]); // texts 상태가 변경될 때마다 실행

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.getLayer().batchDraw();
    }
  }, [lines]); // texts 상태가 변경될 때마다 실행

  useEffect(() => {
    if (ImageRef.current) {
      ImageRef.current.getLayer().batchDraw();
    }
  }, [images]);

  const applyDataToStage = (receivedData) => {
    // const newReceivedData = JSON.stringify(receivedData);
    console.log("receiveData" + receivedData);
    const { shapes, lines, texts, images, newChat } = receivedData;

    console.log(JSON.stringify(receivedData) + "fdsfds");

    setShapes((prevShapes) => {
      return shapes.map((newShape) => {
        // 기존의 도형 찾기
        const existingShape = prevShapes.find(
          (shape) => shape.id === newShape.id
        );

        if (existingShape) {
          // 기존 도형이 있으면 새로운 속성으로 업데이트
          return { ...existingShape, ...newShape };
        } else {
          // 기존 도형이 없으면 새로운 도형 추가
          return newShape;
        }
      });
    });

    setLines((prevLines) => {
      return lines.map((newLines) => {
        // 기존의 도형 찾기
        const existingLine = prevLines.find((line) => line.id === newLines.id);

        if (existingLine) {
          // 기존 도형이 있으면 새로운 속성으로 업데이트
          return { ...existingLine, ...newLines };
        } else {
          // 기존 도형이 없으면 새로운 도형 추가
          return newLines;
        }
      });
    });

    setTexts((prevTexts) => {
      return texts.map((newTexts) => {
        const existingText = prevTexts.find((text) => text.id === newTexts.id);
        if (existingText) {
          return { ...existingText, ...newTexts };
        } else {
          return newTexts;
        }
      });
    });

    setImages((prevImage) => {
      return images.map((newImage) => {
        const existingImage = prevImage.find(
          (image) => image.id === newImage.id
        );
        if (existingImage) {
          return { ...existingImage, ...newImage };
        } else {
          return newImage;
        }
      });
    });

    if (
      newChat &&
      newChat.nickname.trim() !== "" &&
      newChat.message.trim() !== ""
    ) {
      setChatLog((prevChatLog) => {
        const newChatsArray = Array.isArray(newChat) ? newChat : [newChat];

        const newChatLog = newChatsArray.filter(
          (chat) =>
            chat.nickname.trim() !== "" &&
            chat.message.trim() !== "" &&
            !prevChatLog.some((prev) => prev.id === chat.id)
        );
        return [...prevChatLog, ...newChatLog];
      });
    }

    // console.log("shape" + JSON.stringify(shapes));
    // console.log("line" + JSON.stringify(lines));
    // console.log("text" + JSON.stringify(texts));
    console.log("text" + JSON.stringify(images));

    // console.log(JSON.stringify("TE#" + newChat));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChatInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextSelect = (e) => {
    console.log(e.target);
    console.log(e);
    const selectedTextId = e;
    setSelectedId(selectedTextId);
    console.log(selectedId);
    console.log(selectedTextId);
    // console.log(selectedId)
  };

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.batchDraw();
    }
  }, [texts]);

  const handleMouseDown = (e) => {
    // if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    if (!startWrite || selectedId) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setSelectionRect({ x, y, width: 0, height: 0 });
      setSelectedIds([]);
      return;
    } // startWrite가 false이면 기능 비활성화
    setDrawing(true);
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    // 스테이지의 스케일과 위치를 고려하여 마우스 포인터의 위치를 조정
    const x = (pointer.x - stage.x()) / stage.scaleX();
    const y = (pointer.y - stage.y()) / stage.scaleY();

    setCurrentLine([x, y]);
    // sendInfoToServer();
  };

  const handleMouseMove = (e) => {
    // if (!drawing || !startWrite) return; // startWrite가 false이면 기능 비활성화
    if (!drawing || !startWrite || selectedId) {
      if (!selectionRect.x) return; // 선택 영역이 없으면 종료

      const { x, y } = e.target.getStage().getPointerPosition();
      const newSelectionRect = {
        ...selectionRect,
        width: x - selectionRect.x,
        height: y - selectionRect.y,
      };
      setSelectionRect(newSelectionRect);
      const selected = shapes.filter((rect) => {
        return (
          rect.x > selectionRect.x &&
          rect.y > selectionRect.y &&
          rect.x + rect.width < x &&
          rect.y + rect.height < y
        );
      });
      setSelectedIds(selected.map((s) => s.id));
      return;
    } // startWrite가 false이면 기능 비활성화
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    const x = (pointer.x - stage.x()) / stage.scaleX();
    const y = (pointer.y - stage.y()) / stage.scaleY();

    setCurrentLine(currentLine.concat([x, y]));

    // if (selectedId) {
    //   // 객체가 드래그되고 있을 때
    //   const newPos = { x: e.target.x(), y: e.target.y() };
    // }
  };

  const handleMouseUp = (shapes) => {
    // if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    if (!startWrite) {
      setSelectionRect({});
      return;
    } // startWrite가 false이면 기능 비활성화
    setDrawing(false);
    setDrawingList([
      ...drawingList,
      { points: currentLine, stroke: currentColor, strokeWidth: 5 },
    ]);

    // console.log(shapes);
    sendInfoToServer();
  };

  const handleDragEnd = async (e) => {
    if (!e || !e.target) {
      // e 또는 e.target이 undefined인 경우
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }

    // console.log(e.target); // e.target 객체 확인
    // console.log(typeof e.target); // e.target의 타입 확인
    // console.log(e.target.id); // e.target의 id 속성 값 확인
    // console.log(e.target.constructor.name);

    // const id = e.target.id();
    const id = e.target.attrs.id;
    const ty = e.target.attrs.ty;

    console.log(id + "id를 확인해보자");
    console.log(ty + " tetstsetawetfdgdfffsdfsdfsdfsdds");
    const type = e.target.attrs.type;

    // 새로운 위치 정보를 가져옵니다.
    const newPos = { x: e.target.x(), y: e.target.y() };
    const newData = e.target.attrs;
    const newRotate = e.target.rotation();

    // console.log(JSON.stringify(e.target.attrs) + "확인돼라 제발!!");

    if (!id) {
      console.log("id 확인 " + "혹시 null인가?");
    } else {
      console.log("오예 성공! " + id);
    }
    // console.log(id + "  id");
    // console.log(id2 + "  id2");
    // console.log(JSON.stringify(newData));
    // console.log(ty + "  ty확인용");
    // console.log(id2 + "체크해보자");
    // console.log(newRotate);
    // console.log("newpos 확인 용" + newPos.x + "  " + newPos.y);

    if (ty === "Line" && type === "Dot") {
      setLines((prevLines) =>
        prevLines.map((lines) => {
          if (lines.id === id) {
            const updatedLine = { ...lines, ...newData };
            PostDot({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
            return updatedLine;
          }
          return lines;
        })
      );
    } else if (ty === "Line" && type === "Arrow") {
      setLines((prevLines) =>
        prevLines.map((lines) => {
          if (lines.id === id) {
            const updatedLine = { ...lines, ...newData };
            PostArrow({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
            return updatedLine;
          }
          return lines;
        })
      );
    } else if (ty === "Line" && type === "Line") {
      setLines((prevLines) =>
        prevLines.map((lines) => {
          if (lines.id === id) {
            const updatedLine = { ...lines, ...newData };
            PostLine({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
            return updatedLine;
          }
          return lines;
        })
      );
    } else if (ty === "Shape" && type === "Rect") {
      setShapes((prevShapes) =>
        prevShapes.map((shapes) => {
          if (shapes.id === id) {
            // 드래그된 도형의 위치를 업데이트합니다.
            const updatedShape = { ...shapes, ...newData };
            PostRect({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
            return updatedShape;
          }
          return shapes;
        })
      );
    } else if (ty === "Shape" && type === "RegularPolygon") {
      setShapes((prevShapes) =>
        prevShapes.map((shapes) => {
          if (shapes.id === id) {
            // 드래그된 도형의 위치를 업데이트합니다.
            const updatedShape = { ...shapes, ...newData };
            PostTriangle({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
            return updatedShape;
          }
          return shapes;
        })
      );
    } else if (ty === "Shape" && type === "Circle") {
      setShapes((prevShapes) =>
        prevShapes.map((shapes) => {
          if (shapes.id === id) {
            // 드래그된 도형의 위치를 업데이트합니다.
            const updatedShape = { ...shapes, ...newData };
            PostCircle({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
            return updatedShape;
          }
          return shapes;
        })
      );
    } else if (ty === "Text") {
      setTexts((prevTexts) =>
        prevTexts.map((texts) => {
          if (texts.id === id) {
            const updatedText = { ...texts, ...newData };
            PostText({ target: { attrs: updatedText } }); // 필요한 데이터만 전송
            return updatedText;
          }
          return texts;
        })
      );
    } else if (ty === "img") {
      setImages((prevImage) =>
        prevImage.map((images) => {
          if (images.id === id) {
            const updatedImage = { ...images, ...newData };
            return updatedImage;
          }
          return images;
        })
      );
    }

    setDragEnded(true);
  };

  const handleTransformEnd = (e) => {
    const node = e.target;

    const rotationAngle = node.rotation();

    console.log(`Rotation angle: ${rotationAngle}`);
  };

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

  // const {
  //   handleMouseDown,
  //   handleMouseMove,
  //   handleMouseUp,
  //   handleDragEnd,
  //   handleTransformEnd,
  //   zoomOnWheel,
  //   resetZoom,
  // } = useEventHandler({
  //   // 필요한 모든 props와 상태를 여기에 전달합니다.
  //   startWrite,
  //   selectedId,
  //   setSelectionRect,
  //   setSelectedIds,
  //   setDrawing,
  //   setCurrentLine,
  //   drawingList,
  //   setDrawingList,
  //   currentColor,
  //   shapes,
  //   setLines,
  //   setShapes,
  //   setTexts,
  //   setDragEnded,
  //   stageRef,
  //   setStageScale,
  //   setStagePosition,
  //   drawing,
  //   selectionRect,
  //   currentLine,
  //   sendInfoToServer,
  //   stagePosition,
  // });

  useEffect(() => {
    // 드래그 작업이 완료되었고, 상태가 변경되었다면 서버에 전송
    if (dragEnded) {
      sendInfoToServer();
      // 다음 상태 변경을 위해 dragEnded를 다시 false로 설정
      setDragEnded(false);
    }
  }, [dragEnded]);

  const checkObject = (shapeId, newX, newY) => {
    console.log(shapes);
    console.log(lines);
    console.log(texts);
    console.log(images);
    console.log(drawingList);
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
    setShapes(
      shapes.map((shape) =>
        shape.id === selectedId ? { ...shape, fill: e.target.value } : shape
      )
    );
    setLines(
      lines.map((line) =>
        line.id === selectedId ? { ...line, stroke: e.target.value } : line
      )
    );
  };

  const handleFontSize = (e) => {
    const newFontSize = parseInt(e.target.value, 10);
    if (!isNaN(newFontSize)) {
      setFontSize(newFontSize);
      if (selectedId) {
        setTexts(
          texts.map((text) =>
            text.id === selectedId ? { ...text, fontSize: newFontSize } : text
          )
        );
      }
    }
    console.log(selectedId);
  };

  const handleShapeClick = (id, e) => {
    e.cancelBubble = true;
    setSelectedId(id);
    console.log(id);
  };

  const handleLayerClick = () => {
    setSelectedId(null);
  };

  const { redo, undo } = redoUndoFunction(
    setRedoHistory,
    setHistory,
    setShapes,
    redoHistory,
    history
  );

  //Layer 변경 건(이건 색 변경 확인 후에 다시 가는 걸로)
  const { moveDown, moveUp, moveToBottom, moveToTop } = LayerFunction(
    selectedId,
    layerRef
  );

  useEffect(() => {
    setHistory([...history, shapes]);
  }, [shapes]);

  //토글 온오프 기능
  const writeSetToggle = () => {
    setWriteToggle(!writeToggle);
    setLineMenuToggle(false);
    setShapeMenuToggle(false);

    changeWrite();
  };
  const shapeToggle = () => {
    setShapeMenuToggle(!shapeMenuToggle);
    setLineMenuToggle(false);
    setWriteToggle(false);
  };
  const lineToggle = () => {
    setLineMenuToggle(!lineMenuToggle);
    setShapeMenuToggle(false);
    setWriteToggle(false);
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

  const handleTextChange = (id, newText) => {
    const updatedTexts = texts.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    );
    setTexts(updatedTexts);
  };


  return (
    <div className="absolute  inset-0 h-full w-full bg-[#EFEFEF] bg-opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* 왼쪽 윗 블록 */}
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
          {projectName}
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

        {/* 펜 툴 */}
        <svg
          className="w-6 h-6 mt-7 cursor-pointer"
          fill={!writeToggle ? "#000000" : "#0064FF"}
          onClick={() => writeSetToggle()}
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 128 128"
        >
          <path d="m36.108 110.473 70.436-70.436-18.581-18.58-70.437 70.436a2.305 2.305 0 0 0-.803 1.22l-5.476 20.803c-.01.04-.01.082-.019.121a2.492 2.492 0 0 0-.039.247 2.354 2.354 0 0 0-.009.222 1.89 1.89 0 0 0 .048.471c.008.04.008.082.019.121.007.029.021.055.031.083.023.078.053.154.086.23.029.067.057.134.09.196.037.066.077.127.121.189.041.063.083.126.13.184.047.059.1.109.152.162a1.717 1.717 0 0 0 .345.283c.063.043.124.084.192.12.062.033.128.062.195.09.076.033.151.063.23.087.028.009.054.023.083.031.04.01.081.01.121.02a2.47 2.47 0 0 0 .693.039 3.26 3.26 0 0 0 .247-.039c.04-.01.082-.01.121-.02l20.804-5.475c.505-.132.92-.425 1.22-.805zm-16.457-2.124a2.313 2.313 0 0 0-1.964-.649l3.183-12.094 11.526 11.525-12.096 3.182a2.304 2.304 0 0 0-.649-1.964zM109.702 36.879l-18.58-18.581 7.117-7.117s12.656 4.514 18.58 18.582l-7.117 7.116z"></path>
        </svg>
        {/* <img src="/pen.svg" alt="" className='w-6 h-6 mt-7 cursor-pointer' onClick={() => changeWrite()}/> */}

        {/* 도형 툴 */}
        <div>
          <svg
            className="w-7 h-7 mt-7 cursor-pointer "
            fill="none"
            height="24"
            onClick={shapeToggle}
            stroke={!shapeMenuToggle ? "#000000" : "#0064FF"}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M12 3l-4 7h8z" />
            <circle cx="17" cy="17" r="3" />
            <rect height="6" rx="1" width="6" x="4" y="14" />
          </svg>
          {/* <img src="/shape.svg" alt="" className={`'w-7 h-7 mt-7 cursor-pointer ' stroke-current ${shapeMenuToggle ? 'text-black0' : 'text-blue'}`}  onClick={shapeToggle}/> */}
          {shapeMenuToggle && (
            <div className="absolute top-[120px] left-[55px]  bg-white rounded-md w-[50px] h-[140px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
              <svg
                className="hover:stroke-blue w-6 h-6 mt-3 cursor-pointer"
                onClick={() => addRectangle("Rect")}
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
              </svg>
              <svg
                className="hover:stroke-blue w-6 h-6 mt-5 cursor-pointer"
                fill="none"
                onClick={() => addCircle("Circle")}
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              <svg
                fill="none"
                className="hover:stroke-blue w-6 h-6 mt-4 cursor-pointer stroke-black"
                onClick={() => addTriangle("RegularPolygon")}
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 1.5L0.5 13.5H14.5L7.5 1.5Z"
                  stroke-width="1.3"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* 선 그리기 툴 */}
        <div>
          <svg
            className="w-7 h-7 mt-7 cursor-pointer"
            stroke={!lineMenuToggle ? "#000000" : "#0064FF"}
            fill={!lineMenuToggle ? "#000000" : "#0064FF"}
            viewBox="0 0 32 32"
            onClick={lineToggle}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <g data-name="Layer 2" id="Layer_2">
              <path d="M15.31,6.85a1,1,0,0,0,1,1h6.51L6.17,24.5a1,1,0,0,0,1.41,1.41L24.21,9.28v6.46a1,1,0,1,0,2,0v-9a.9.9,0,0,0-.9-.9h-9A1,1,0,0,0,15.31,6.85Z" />
            </g>
          </svg>
          {/* <img src="/line.svg" alt="" className='w-7 h-7 mt-7 cursor-pointer'  onClick={lineToggle}/> */}
          {lineMenuToggle && (
            <div className="absolute top-[180px] left-[55px]  bg-white rounded-md w-[50px] h-[120px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                onClick={() => addLine("Line")}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="hover:stroke-blue w-[50px] h-[80px] mt-2  cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
              <svg
                className="hover:stroke-blue  cursor-pointer"
                onClick={() => addDottedLine("Dotted")}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 7.5C0 7.22386 0.223858 7 0.5 7H3C3.27614 7 3.5 7.22386 3.5 7.5C3.5 7.77614 3.27614 8 3 8H0.5C0.223858 8 0 7.77614 0 7.5ZM5.75 7.5C5.75 7.22386 5.97386 7 6.25 7H8.75C9.02614 7 9.25 7.22386 9.25 7.5C9.25 7.77614 9.02614 8 8.75 8H6.25C5.97386 8 5.75 7.77614 5.75 7.5ZM12 7C11.7239 7 11.5 7.22386 11.5 7.5C11.5 7.77614 11.7239 8 12 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12Z"
                  fill="#000000"
                />
              </svg>
              <svg
                onClick={() => addArrowLine("Arrow")}
                viewBox="0 0 24 24"
                id="right-arrow"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:stroke-blue mt-1 mb-2 w-15  hover:fill-blue stroke-black0 cursor-pointer"
              >
                <path
                  id="primary"
                  d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {/* 텍스트 상자 툴 */}
        <img
          src="/text.svg"
          alt=""
          className="w-6 h-6 mt-7"
          onClick={() => addTextBox()}
        />

        {/* 기타 툴 */}
        <img src="/dots.svg" alt="" className="w-4 h-4 mt-7" />
      </div>

      {/* 삭제 버튼 */}
      <div
        className="cursor-pointer absolute top-[540px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={() => deleteSelected()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:stroke-blue"
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
        className="cursor-pointer absolute top-[610px]  hover:stroke-blue left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
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
        className="cursor-pointer absolute top-[670px] left-6  hover:stroke-blue bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={() => redo()}
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

      {/* 채팅방 영역 */}
      <div className="absolute top-20 right-10 w-80 p-7 z-20 justify-center container w-1/4 ml-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              name="nickname"
              value={chatInput.nickname}
              onChange={handleInputChange}
              placeholder="닉네임"
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              name="message"
              value={chatInput.message}
              onChange={handleInputChange}
              placeholder="메세지"
              className="border p-2 rounded flex-1"
            />
          </div>
          <button
            onClick={sendInfoToServer}
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ml-2"
          >
            전송
          </button>
          <div
            id="chat-log"
            className="h-64 overflow-auto p-4 bg-gray-200 rounded"
          >
            {chatLog.map((chat) => (
              <div key={chat.id}>
                {chat.nickname}: {chat.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-32 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => checkObject()}>Check</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-12 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <input type="color" value={currentColor} onChange={handleColorChange} />
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-52 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => GetData()}>Get</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-94 justify-center bg-white rounded-md w-16 h-[50px] z-50 flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => GetData()}>Get</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-72 justify-center bg-white rounded-md w-12 h-10 flex items-center shadow">
        <input
          type="text"
          value={fontSize}
          onChange={handleFontSize}
          className="w-full h-full text-center text-sm border-none rounded-md"
        />
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute bottom-6 right-32 z-50 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveUp}>한칸 위</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute bottom-6 right-12 z-50 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveDown}>한칸 아래</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute bottom-6 right-52 z-50  justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveToTop}>제일 위</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <button
        onClick={imgToggle}
        className="absolute bottom-6 right-72 z-50 justify-center bg-white rounded-md w-16 h-[50px] flex items-center flex-row shadow-[rgba(0,0,0,0.25)]"
      >
        img
      </button>
      {imgMenuToggle && (
        <div className="absolute bottom-[56px] right-72">
          {" "}
          {/* 위치 조정 필요에 따라 조절 */}
          <ImageSelector onImageSelect={addImage} />
        </div>
      )}

      {/*여기에 이미지 넣으면 되겠네!*/}
      {/* /////////////////////////////////////////////그리는 구역///////////////////////////////////////////// */}
      <div className="ml-36 mt-24 h-full w-full" >
        {/* <img src={process.env.PUBLIC_URL + '/img/template3_check7/template3.png'} alt= "Template3_Check" /> */}
      
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable={!draggable}
          onWheel={zoomOnWheel}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onDragEnd={handleDragEnd}
          onClick={handleLayerClick}
        >
          <Layer ref={layerRef}>
            {drawing && (
              <Line
                points={currentLine}
                stroke={currentColor}
                strokeWidth={5}
              />
            )}
            {drawingList.map((drawing, id) => (
              <Line key={id} {...drawing} />
            ))}
            {shapes.map((shape) => (
              <ShapeComponent
                key={shape.id}
                shapeProps={shape}
                isSelected={shape.id === selectedId}
                onTransformEnd={handleTransformEnd}
                onSelect={(e) => {
                  handleShapeClick(shape.id, e);
                }}
                onChange={(newAttrs) => {
                  const newShapes = shapes.map((s) =>
                    s.id === shape.id ? newAttrs : s
                  );
                  setShapes(newShapes); // 상태 업데이트
                }}
              />
            ))}
            {lines.map((line) => {
              if (line.type === "Arrow") {
                return (
                  <ArrowComponent
                    key={line.id}
                    ref={lineRef}
                    lineProps={line}
                    isSelected={line.id === selectedId}
                    onSelect={(e) => {
                      handleShapeClick(line.id, e);
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
                    key={line.id}
                    lineProps={line}
                    ref={lineRef}
                    isSelected={line.id === selectedId}
                    onSelect={(e) => {
                      handleShapeClick(line.id, e);
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
            {texts.map((text, id) => (
              <TextComponent
                key={text.id}
                textProps={text}
                fontSize={fontSize}
                isSelected={text.id === selectedId}
                onSelect={(e) => {
                  handleShapeClick(text.id, e);
                }}
                onChange={(newAttrs) => {
                  const newTexts = texts.map((t) =>
                    t.id === text.id ? { ...t, ...newAttrs } : t
                  );
                  setTexts(newTexts);
                }}
                setSelectedId={setSelectedId}
                onTextChange={(newText) => handleTextChange(text.id, newText)}
              />
            ))}

            {images.map((img) => (
              <ImgComponent
                key={img.id}
                id={img.id}
                ty={img.ty}
                ref={ImageRef}
                imageSrc={img.src}
                x={img.x}
                y={img.y}
                isSelected={img.id === selectedId}
                onSelect={(e) => {
                  handleShapeClick(img.id, e);
                }}
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
