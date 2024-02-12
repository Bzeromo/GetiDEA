import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";
import axios from "axios";
import useImage from "use-image";
import URLImage from "./Add/URLImage";
import { debounce } from "lodash";
import { nanoid } from "nanoid";

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
import getData from "./axios/getData";

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

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedImageSrc, setSelectedImageSrc] = useState(""); // 선택된 이미지 경로 상태
  // const [selectedImageUrl, setSelectedImageUrl] = useState(null); // 선택된 이미지 URL을 저장하는 상태
  // const [selectedImageUrls, setSelectedImageUrls] = useState([]);

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
  const [wholeData, setWholeData] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false);

  // ID same issue 용
  const [shapeCounter, setShapeCounter] = useState(0);
  const [lineCounter, setLineCounter] = useState(0);
  const [textCounter, setTextCounter] = useState(0);
  const [imageCounter, setImageCounter] = useState(0);
  const [idCounter, setIdCounter] = useState(0);

  //복사 붙여넣기용
  const [clipboard, setClipboard] = useState(null);

  // function checkPost() {
  //   setCheckDelete(!checkDelete);
  // }
  const checkPost = () => {
    setCheckDelete(!checkDelete);
  };

  const PostDelete2 = () => {
    const filteredPreData = preData.find((item) => item.id === selectedId);

    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: selectedId,
      preData: filteredPreData,
      newData: {},
    };

    axios
      .post("http://localhost:8080/api/project/change", postData)
      .then((response) => {
        // 삭제가 성공적으로 반영되었을 때 상태 업데이트
        console.log(response);
        setPreData((prevData) => {
          const newData = prevData.filter((item) => item.id !== selectedId);
          console.log("Updated data:", newData);
          return newData; // 필터링된 새 데이터로 상태를 업데이트
        });
      })
      .catch((error) => {
        console.log(error);
        // 오류 발생 시 실행할 코드
      });
  };

  const deleteAll = () => {
    deleteSelected();
    PostDelete2();
    setCount((prevCount) => prevCount + 1); // 이 부분을 수정
    // window.location.reload();
    console.log(count); // 이 로그는 상태 업데이트가 비동기적으로 이루어지기 때문에 업데이트 이전의 값을 출력할 수 있음
    layerRef.current.batchDraw();
    // shapeRef.current.batchDraw();
    checkPost();
    console.log(checkDelete);
  };

  // const undoEvent2 = () => {
  //   axios
  //     .get(
  //       `http://localhost:8080/api/project/rollback?projectId=${projectId}&userEmail=${userEmail}`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //       if (response.data) {
  //         const dataItems = response.data;

  //         console.log(response.data);

  //         Object.keys(dataItems).forEach((key) => {
  //           const item = dataItems[key];

  //           switch (item.ty) {
  //             case "Text":
  //               setTexts((prevTexts) => updateArray(prevTexts, item));
  //               console.log(`text item: `, JSON.stringify2(item, key));

  //               break;
  //             case "Rect":
  //               setShapes((prevShapes) => updateArray2(prevShapes, item));
  //               console.log(JSON.stringify(item, key) + "Rect?");
  //               break;
  //             case "Circle":
  //               setShapes((prevShapes) => updateArray2(prevShapes, item));
  //               console.log(JSON.stringify(item, key) + "Circle?");
  //               break;
  //             case "RegularPolygon":
  //               setShapes((prevShapes) => updateArray2(prevShapes, item));
  //               console.log(
  //                 `RegularPolygon item with defaults: `,
  //                 JSON.stringify(item)
  //               );
  //               break;
  //             case "Line":
  //               setLines((prevLines) => updateArray2(prevLines, item));
  //               console.log(`Line item: `, JSON.stringify(item, key));
  //               break;
  //             case "Dot":
  //               setLines((prevLines) => updateArray2(prevLines, item));
  //               console.log(`dot item: `, JSON.stringify(item, key));
  //               break;
  //             case "Arrow":
  //               setLines((prevLines) => updateArray2(prevLines, item));
  //               console.log(`arrow item: `, JSON.stringify(item, key));
  //               break;
  //             case "Image":
  //               setImages((prevImage) => updateArray2(prevImage, item));
  //               console.log(`img item: `, JSON.stringify(item, key));
  //               break;
  //             default:
  //               // 기타 타입 처리
  //               break;
  //           }
  //         });
  //         console.log(dragEnded)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     }, []);
  // };

  // function updateArray2(array, item) {
  //   const index = array.findIndex((element) => element.id === item.id);

  //   if (index >= 0) {
  //     // 기존 항목 업데이트
  //     return array.map((element, i) =>
  //       i === index ? { ...element, ...item } : element
  //     );
  //   } else {
  //     // 새 항목 추가
  //     return [...array, ...item];
  //   }
  // }

  const undoAll = () => {
    undo();
    undoEvent();
    setCount((prevCount) => prevCount + 1); // 이 부분을 수정
    // window.location.reload();
    console.log(count); // 이 로그는 상태 업데이트가 비동기적으로 이루어지기 때문에 업데이트 이전의 값을 출력할 수 있음
    layerRef.current.batchDraw();
    // shapeRef.current.batchDraw();
    checkPost();
    console.log(checkDelete);
  }
  
  

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
  const [count, setCount] = useState(0);

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

  const projectId = 1;
  const userEmail = "wnsrb933@naver.com";

  const [preData, setPreData] = useState([]);
  useEffect(() => {
    getProjectData();
    console.log(`|\\_/|
|q p|   /}
( 0 )"""\\
|"^"\`    |
||_/=\\\\__|
`);
  }, []);

  useEffect(() => {
    console.log("탐지 완료");
  }, [count]);

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

  useEffect(() => {
    if (textRef.current) {
      textRef.current.getLayer().batchDraw();
    }
  }, [texts]); // texts 상태가 변경될 때마다 실행

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.batchDraw();
    }
  }, [texts]);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.batchDraw();
    }
  }, []);

  useEffect(() => {
    setHistory([...history, shapes]);
  }, [shapes]);

  useEffect(() => {
    console.log("업데이트됨" + selectedId);
    sendInfoToServer();
    // if(layerRef.current){
    //   layerRef.current.batchDraw();
    //   console.log(":teststsetst")
    // }
  }, [selectedId]);

  useEffect(() => {
    // console.log(JSON.stringify(preData) + "preData 확인용");
    console.log("checkdata");
  }, [preData]);

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
    images,
    setImages,
    rectPosition,
    linePosition,
    shapeCounter,
    setShapeCounter,
    lineCounter,
    setLineCounter,
    textCounter,
    setTextCounter,
    imageCounter,
    setImageCounter,
    idCounter,
    setIdCounter
  );

  const {
    deleteSelectedShape,
    deleteSelectedLine,
    deleteSelectedText,
    deleteSelectedImage,
    deleteSelectedDrawing,
    deleteSelected,
  } = deleteFunction(
    shapes,
    selectedId,
    setShapes,
    setSelectedId,
    lines,
    setLines,
    drawingList,
    setDrawingList,
    texts,
    setTexts,
    images,
    setImages
  );

  const { getProjectData } = getData(
    projectId,
    setTexts,
    setShapes,
    setLines,
    setImages,
    setWholeData
  );

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
        drawingList: drawingList,
        newChat:
          chatInput.nickname.trim() !== "" && chatInput.message.trim() !== ""
            ? { ...chatInput, id: new Date().getTime() }
            : null, // 채팅 메시지가 있을 때만 전송
      };
      socket.send(JSON.stringify(dataToSend));
    }
  };

  const applyDataToStage = (receivedData) => {
    const { shapes, lines, texts, images, drawingList, newChat } = receivedData;

    // 상태 업데이트를 위한 범용 함수
    const updateState = (prevState, newData, key = "id") => {
      return newData.map((item) => {
        const existingItem = prevState.find(
          (prevItem) => prevItem[key] === item[key]
        );
        return existingItem ? { ...existingItem, ...item } : item;
      });
    };

    // 각 상태에 대한 업데이트
    setShapes((prevShapes) => updateState(prevShapes, shapes));
    setLines((prevLines) => updateState(prevLines, lines));
    setTexts((prevTexts) => updateState(prevTexts, texts));
    setImages((prevImages) => updateState(prevImages, images));

    // drawingList에 대한 특별한 처리 (중복 방지)
    setDrawingList((prevDrawingList) => {
      const updatedDrawingList = [...prevDrawingList];
      drawingList.forEach((newItem) => {
        if (!updatedDrawingList.some((item) => item.id === newItem.id)) {
          updatedDrawingList.push(newItem);
        }
      });
      return updatedDrawingList;
    });

    // 새로운 채팅 처리
    if (newChat && newChat.nickname.trim() && newChat.message.trim()) {
      const newChatsArray = Array.isArray(newChat) ? newChat : [newChat];
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        ...newChatsArray.filter(
          (newChatItem) =>
            !prevChatLog.some(
              (prevChatItem) => prevChatItem.id === newChatItem.id
            )
        ),
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChatInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleMouseDown = (e) => {
    if (e) {
      const newData = e.target.attrs;
      // console.log(JSON.stringify(newData), "확인해볼래용");

      setPreData((prevData) => {
        const index = prevData.findIndex((data) => data.id === newData.id);

        if (index !== -1) {
          return prevData.map((data, idx) =>
            idx === index ? { ...data, ...newData } : data
          );
        } else {
          return [...prevData, newData];
        }
      });
    }

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
  };

  const handleMouseUp = () => {
    // if (!startWrite) return; // startWrite가 false이면 기능 비활성화
    if (!startWrite) {
      setSelectionRect({});
      return;
    } // startWrite가 false이면 기능 비활성화
    setDrawing(false);
    setDrawingList([
      ...drawingList,
      {
        id: `drawingList-${drawingList.length}`,
        points: currentLine,
        stroke: currentColor,
        strokeWidth: 5,
      },
    ]);

    sendInfoToServer();
  };

  const { PostData, PostSave, PostDelete, PostDrawing } = postData(
    projectId,
    userEmail,
    preData,
    selectedId,
    sendInfoToServer,
    wholeData,
    setWholeData,
    checkDelete,
    setCheckDelete,
    checkPost,
    drawingList,
    deleteSelected,
    count,
    setCount,
    layerRef
  );

  const { undoEvent, updateArray } = undoData(
    projectId,
    userEmail,
    setTexts,
    setShapes,
    setLines,
    setImages,
    dragEnded,
    sendInfoToServer
  );

  const handleDragEnd = async (e) => {
    if (!e || !e.target) {
      // e 또는 e.target이 undefined인 경우
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const id = e.target.attrs.id;
    const ty = e.target.attrs.ty;

    const type = e.target.attrs.type;
    console.log(type);

    const newData = e.target.attrs;

    // console.log(JSON.stringify(newData))

    if (!id) {
      console.log("id 확인 " + "혹시 null인가?");
    } else {
      console.log("오예 성공! " + id);
    }

    if (type === "Dot" || type === "Arrow" || type === "Line") {
      setLines((prevLines) =>
        prevLines.map((lines) => {
          if (lines.id === id) {
            const updatedLine = { ...lines, ...newData };
            PostData({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
            setDragEnded(true);
            return updatedLine;
          }
          return lines;
        })
      );
    } else if (
      type === "Rect" ||
      type === "RegularPolygon" ||
      type === "Circle"
    ) {
      setShapes((prevShapes) =>
        prevShapes.map((shapes) => {
          if (shapes.id === id) {
            // 드래그된 도형의 위치를 업데이트합니다.
            const updatedShape = { ...shapes, ...newData };
            PostData({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
            setDragEnded(true);
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
            PostData({ target: { attrs: updatedText } }); // 필요한 데이터만 전송
            setDragEnded(true);
            return updatedText;
          }
          return texts;
        })
      );
    } else if (ty === "Image") {
      setImages((prevImage) =>
        prevImage.map((images) => {
          if (images.id === id) {
            const updatedImage = { ...images, ...newData };
            PostData({ target: { attrs: updatedImage } }); // 필요한 데이터만 전송
            setDragEnded(true);
            return updatedImage;
          }
          return images;
        })
      );
    }
    // setDragEnded(true);
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

  useEffect(() => {
    // 드래그 작업이 완료되었고, 상태가 변경되었다면 서버에 전송
    if (dragEnded) {
      sendInfoToServer();
      // 다음 상태 변경을 위해 dragEnded를 다시 false로 설정
      setDragEnded(false);
    }
  }, [dragEnded]);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.batchDraw();
    }
    console.log("이것도 탐지해봐라");
  }, [checkDelete]);

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

  const handleTextChange = (id, newText) => {
    const updatedTexts = texts.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    );
    setTexts(updatedTexts);
  };

  const { redo, undo } = redoUndoFunction(
    setRedoHistory,
    setHistory,
    setShapes,
    redoHistory,
    history
  );

  const { moveDown, moveUp, moveToBottom, moveToTop } = LayerFunction(
    selectedId,
    layerRef
  );

  // 단축키 이벤트 리스너 설정
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl+C: 복사
      if (event.ctrlKey && event.key === "c") {
        // 현재 선택된 요소의 타입에 따라 다른 상태에서 검색
        // const selectedShape = shapes.find((shape) => shape.id === selectedId);
        // const selectedLine = lines.find((line) => line.id === selectedId);
        // const selectedText = texts.find((text) => text.id === selectedId);
        // const selectedImage = images.find((image) => image.id === selectedId);

        // const selectedItem =
        //   selectedShape || selectedLine || selectedText || selectedImage;
        const selectedItem = [shapes, lines, texts, images]
        .flatMap(items => items)
        .find(item => item.id === selectedId);
    
        if (selectedItem) {
          setClipboard({ ...selectedItem, id: nanoid(), x: selectedItem.x-20, y : selectedItem.y-20 });
        }
        console.log("복사");
      }
      // Ctrl+V: 붙여넣기
      else if (event.ctrlKey && event.key === "v") {
        if (clipboard) {
          // 클립보드의 타입에 따라 적절한 상태를 업데이트
          switch (clipboard.type) {
            case "Rect":
              setShapes((shapes) => [...shapes, clipboard]);
              break;
            case "Circle":
              setShapes((shapes) => [...shapes, clipboard]);
              break;
            case "RegularPolygon":
              setShapes((shapes) => [...shapes, clipboard]);
              break;
            case "Line":
              setLines((lines) => [...lines, clipboard]);
              break;
            case "Dot":
              setLines((lines) => [...lines, clipboard]);
              break;
            case "Arrow":
              setLines((lines) => [...lines, clipboard]);
              break;
            case "Text":
              setTexts((texts) => [...texts, clipboard]);
              break;
            case "Image":
              setImages((images) => [...images, clipboard]);
              break;
            default:
              break;
          }
          setClipboard(null);
        }
        console.log("붙여넣기");
      }
      // Delete: 삭제
      else if (event.key === "Delete" || (event.ctrlKey && event.key === "d")) {
        deleteAll();
      }
      else if(event.ctrlKey && event.key === "z"){
        undoAll();
      } 
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, clipboard, shapes, lines, texts, images]); // 의존성 배열 업데이트

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
        onClick={() => deleteAll()}
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
        onClick={() => undoAll()}
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
        <button onClick={() => getProjectData()}>Get</button>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-94 justify-center bg-white rounded-md w-16 h-[50px] z-50 flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => PostSave()}>Save</button>
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
        <button onClick={moveToBottom}>한칸 아래</button>
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

      {/* 그리는 구역 */}
      <div className="ml-36 mt-24 h-full w-full">
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
                x={shape.x}
                y={shape.y}
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
