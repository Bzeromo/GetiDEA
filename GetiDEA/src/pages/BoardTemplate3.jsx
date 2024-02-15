import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";
import useImage from "use-image";
import URLImage from "../components/Add/URLImage";
import { debounce } from "lodash";
import { nanoid } from "nanoid";
import api from "../api";
import ImgComponent from "../components/Add/ImgComponent";
import ShapeComponent from "../components/Add/ShapeComponent";
import LineComponent from "../components/Add/LineComponent";
import ArrowComponent from "../components/Add/ArrowComponent";
import addFunction from "../components/funciton/addFunction";
import redoUndoFunction from "../components/funciton/redoUndoFunciton";
import deleteFunction from "../components/funciton/deleteFunction";
import changeFunction from "../components/funciton/changeFunction";
import LayerFunction from "../components/funciton/LayerFunction";
import postData from "../components/axios/postData";
import TextComponent from "../components/Add/TextComponent";
import useEventHandler from "../components/funciton/useEventHandler";
import ImageSelector from "../components/funciton/ImageSelector";
import undoData from "../components/axios/undoData";
import getData from "../components/axios/getData";

import Peer from "peerjs";

//템플릿을 위한 import
import bubbleChatProperties from "../components/templateData/template1-position.json";
import randomWords from "../components/templateData/randomWords.json";
import TemplateImageComponent from "../components/Add/TemplateImageComponent";
import TemplateTextComponent from "../components/Add/TemplateTextComponent";

//튜토리얼을 위한 import
import { CoachMark, ICoachProps } from "react-coach-mark";

const BoardTemplate3 = () => {
  const navigate = useNavigate();

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
  const location = useLocation();
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
  const [chatClick, setChatClick] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState({
    nickname: localStorage.getItem("userName"),
    message: "",
  });

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

    api
      .post("/api/project/change", postData)
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
  };

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

  let projectId = parseInt(localStorage.getItem('projectId'));
  const userEmail = localStorage.getItem('userEmail');

  const [peer, setPeer] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [streams, setStreams] = useState([]);
  const [stream, setStream] = useState("");
  const myVideoRef = useRef();
  const [localStream, setLocalStream] = useState(null); // 스트림 상태 추가
  const [peerId, setPeerId] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    // Peer 객체 생성 및 이벤트 리스너 설정
    const myPeer = new Peer();
    setPeer(myPeer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        myPeer.on("open", (id) => {
          console.log("My peer ID is: ", id);
          setPeerId(id);
          setIsRegistered(true);

          // Peer 등록
          registerPeer(id, projectId)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log("Registration successful");
              } else {
                console.error("Registration failed", data.message);
              }
            })
            .catch((err) => console.error("Error registering peer", err));

          fetchUsersAndConnect(myPeer, projectId, stream);
        });

        myPeer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            addVideoStream(remoteStream, call.peer);
          });
        });
      })
      .catch((err) => console.error("Failed to get local stream", err));

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = () => {
      if (peerId) {
        const data = JSON.stringify({ peerId: peerId, projectId: projectId });
        const blob = new Blob([data], { type: "application/json" });
        const beaconSent = navigator.sendBeacon(`${process.env.REACT_APP_PEERJS_URL}/unregister`, blob);
        console.log("Beacon sent: ", beaconSent);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (myPeer) {
        myPeer.destroy();
      }
    };
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    // 페이지를 벗어날 때 서버에 사용자 등록 해제 요청을 보내는 로직
    const handleBeforeUnload = () => {
      const data = JSON.stringify({ peerId: peerId, projectId: projectId });
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon(`${process.env.REACT_APP_PEERJS_URL}/unregister`, blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    console.log("test");

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [peerId, projectId]); // useEffect 의존성에 peerId 추가

  const registerPeer = (peerId, projectId) => {
    return fetch(`${process.env.REACT_APP_PEERJS_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peerId, projectId }),
    });
  };

  const fetchUsersAndConnect = (myPeer, projectId, stream) => {
    fetch(`${process.env.REACT_APP_PEERJS_URL}/users/${projectId}`)
      .then((response) => response.json())
      .then((users) => {
        users.forEach(({ peerId: otherPeerId }) => {
          if (otherPeerId !== myPeer.id) {
            const call = myPeer.call(otherPeerId, stream);
            call.on("stream", (remoteStream) =>
              addVideoStream(remoteStream, otherPeerId)
            );
          }
        });
      });
  };

  const addVideoStream = (stream, peerId) => {
    setStreams((prevStreams) => {
      // 동일한 peerId를 가진 스트림이 이미 있는지 확인
      const alreadyExists = prevStreams.some(
        (stream) => stream.peerId === peerId
      );

      // 이미 존재하지 않는 경우에만 새 스트림 추가
      if (!alreadyExists) {
        console.log(`Adding video stream for peerId: ${peerId}`);
        return [...prevStreams, { stream, peerId }];
      } else {
        console.log(`Stream for peerId: ${peerId} already exists.`);
        return prevStreams;
      }
    });
  };


  const [preData, setPreData] = useState([]);
  useEffect(() => {
    // if(location.state.name){
    //   setProjectName(location.state.name);
    // }
    setProjectName(localStorage.getItem('projectName'));
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
    const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);

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
    // if (chatInput.nickname.trim() !== "" && chatInput.message.trim() !== "") {
    //   const newChat = { ...chatInput, id: new Date().getTime() };
    //   setChatLog((prevChatLog) => [...prevChatLog, newChat]);
    //   setChatInput({ nickname: localStorage.getItem('userName'), message: "" }); // 입력 필드 초기화
    // }

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

  const resetZoom = () => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    setStagePosition({ x: 0, y: 0 });
    setStageScale({ x: 1, y: 1 });
  };

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
        const selectedItem = [shapes, lines, texts, images]
          .flatMap((items) => items)
          .find((item) => item.id === selectedId);

        if (selectedItem) {
          setClipboard({
            ...selectedItem,
            id: nanoid(),
            x: selectedItem.x - 20,
            y: selectedItem.y - 20,
          });
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
      } else if (event.ctrlKey && event.key === "z") {
        undoAll();
      } else if (event.ctrlKey && event.key === "x") {
        const selectedItem = [shapes, lines, texts, images]
          .flatMap((items) => items)
          .find((item) => item.id === selectedId);

        if (selectedItem) {
          setClipboard({
            ...selectedItem,
            id: nanoid(),
            x: selectedItem.x - 20,
            y: selectedItem.y - 20,
          });
          // 선택된 항목 삭제
          deleteAll();
        }
        console.log("잘라내기");
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

  const chatToggle = () => {
    setChatClick(!chatClick);
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

  const chatLogEndRef = useRef(null);

  // 채팅 스크롤 관련
  useEffect(() => {
    // chatLogEndRef가 가리키는 요소로 스크롤 이동
    chatLogEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const goHome = () => {
    const loadProject = async () => {
      try {
        const response = await api.delete(
          `/api/project/close/${projectId}`
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    loadProject();
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectName');
    navigate("/home");
  };

  // 7check 사용자 아이디어 입력창 (Write Your iDEA)
  const [inputText, setInputText] = useState("");

  // 사용자 아이디어 입력창 변경 함수
  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  // 사용자 아이디어 입력창 최소 크기 설정: 1로 설정하여, 입력값이 없을 때도 input 보이게 함
  const inputTextLength = inputText.length > 0 ? inputText.length * 2 : 23;

  //템플릿3에 관한 요소 & 코드
  const templateImage3 = {
    src: "/img/template3_check7/template3Fix3.png",
    x: 110.31092625853671,
    y: 7.876662134569187,
    z: -100,
    ty: "img",
    type: "Image",
    width: 200,
    height: 112.6433526829959,
    draggable: false,
    rotation: 0,
    scaleX: 5.171183388521264,
    scaleY: 5.171183388521264,
  };

  const templateInfo = [];

  useEffect(() => {
    templateInfo.push(templateImage3);
    setImages(templateInfo);
  }, []);

  //튜토리얼을 위한 코드
  // 튜토리얼 refs
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);
  const ref12 = useRef(null);

  // 튜토리얼 Number & Button
  const [activatedNumber, setActivateNumber] = useState(0);
  

  // 튜토리얼 버튼 함수
  const startTutorial = () => {
    resetZoom();
    setActivateNumber(0);
  };

  const endTutorial = () => {
    setActivateNumber(11);
  };

  const coachList = [
    {
      // 튜토리얼 1. 템플릿 소개 (overview)
      activate: activatedNumber === 0,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-2xl">
            세븐쳌 (7 Check)
          </p>
          <p className="text-center font-Nanum text-l mt-4 px-28">
            아이디어 관련 7가지 체크포인트를
          </p>
          <p className="text-center font-Nanum text-l">
            한가지씩 점검해보는 기법입니다.
          </p>

          <div className="flex justify-between items-center mt-8">
               <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              닫기

            </button>
            <span className="text-blue-800 font-Nanum">1 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),
      reference: ref1,
      tooltip: { position: "left" },
    },
    {
      // 튜토리얼 2. Write Your iDEA!
      activate: activatedNumber === 1,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-2xl">
            Write Your iDEA!
          </p>
          <p className="text-center font-Nanum text-l mt-4 px-16">
            점검하고자 하는 아이디어를 입력하세요.
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">2 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),
      reference: ref2,
      tooltip: { position: "bottom" },
    },
    {
      // 튜토리얼 3. 전반적인 설명
      activate: activatedNumber === 2,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-l">
            각 카드의 예시를 참고하며
          </p>
          <p className="text-center font-Nanum font-bold text-2xl mt-2">
            총 7가지를 check 해보세요.
          </p>
          <p className="text-center font-Nanum text-l mt-6">
            카드 작성 순서는 자유입니다!
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">3 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),
      reference: ref3,
      tooltip: { position: "top" },
    },
    {
      // 튜토리얼 4-1. 상세 설명 (축소)
      activate: activatedNumber === 3,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
            onClick={() => endTutorial()}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>

          <p className="text-center font-Nanum font-bold text-3xl text-[#ffc71d]">
            '축소 - Reduction'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            아이디어를 작게, 낮게, 짧게,
          </p>
          <p className="text-center font-Nanum text-l">
            얇게, 가볍게, 생략, 분할,
          </p>
          <p className="text-center font-Nanum text-l">
            제거, 단축, 단순화 해볼까요?
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 전화기의 선과 안테나를 없애면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">4 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref4,
      tooltip: { position: "top" },
    },
    {
      // 튜토리얼 4-2. 상세 설명 (확대)
      activate: activatedNumber === 4,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-[#FF8C00]">
            '확대 - Enlargement'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            빈도, 강도, 크기, 가치, 재료 등을 확대하고 과장해볼까요?
          </p>
          <p className="text-center font-Nanum text-l">
            크게, 길게, 넓게, 두껍게, 무겁게 해볼까요?
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. PC방에서 음식 메뉴와 비중을 확대하면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">5 / 10</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref5,
      tooltip: { position: "right" },
    },
    {
      // 튜토리얼 4-3. 상세 설명 (수정)
      activate: activatedNumber === 5,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-yellow-600 text-[#32CD32]">
            '수정 - Modification'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            의미, 색, 소리, 움직임, 형태, 양식 등을
          </p>
          <p className="text-center font-Nanum text-l">변화시켜볼까요?</p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 시계의 종소리를 뻐꾸기 울음소리로 바꾸면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">6 / 10</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref6,
      tooltip: { position: "right" },
    },
    {
      // 튜토리얼 4-4. 상세 설명 (대체)
      activate: activatedNumber === 6,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-[#4682B4]">
            '대체 - Alternation'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            대체할 방법, 물품, 사람, 재료, 장소, 과정이 있나요?
          </p>
          <p className="text-center font-Nanum text-l">
            사람, 물건, 재료, 소재, 기법, 동력, 장소, 위치, 표기 방법 등을
            대체해볼까요?
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 젓가락의 재질을 나무로 바꿔보면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">7 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref7,
      tooltip: { position: "bottom" },
    },
    {
      // 튜토리얼 4-5. 상세 설명 (반전)
      activate: activatedNumber === 7,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-[#000080]">
            '반전 - Reversion'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            순서, 위치, 기능, 모양 등을 바꾸거나 재정렬 해봅시다!
          </p>
          <p className="text-center font-Nanum text-l">
            앞뒤, 위아래, 좌우, 겉과 안, 역할, 순서를 바꿔볼까요?
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 김밥의 김과 밥의 위치를 바꾸면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">8 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref8,
      tooltip: { position: "left" },
    },
    {
      // 튜토리얼 4-6. 상세 설명 (전용)
      activate: activatedNumber === 8,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-[#800080]">
            '전용 - Diversion'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            다른 용도를 사용하거나, 사용자를 바꿀 수 있나요?
          </p>
          <p className="text-center font-Nanum text-l">
            다른 아이디어를 빌리거나 흉내 내도 좋아요!
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 장갑을 실외 말고 부엌에서 사용하면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">9 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref9,
      tooltip: { position: "left" },
    },
    {
      // 튜토리얼 4-6. 상세 설명 (결합)
      activate: activatedNumber === 9,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-Nanum font-bold text-2xl"
              onClick={() => endTutorial()}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>
          <p className="text-center font-Nanum font-bold text-3xl text-[#9400D3]">
            '결합 - Combination'
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            다른 아이디어, 재료, 부품, 목적, 단위 등을 결합해볼까요?
          </p>
          <p className="text-center font-Nanum text-l">
            랜덤 단어로 시도하고 싶다면, '랜덤 버블'을 이용해보세요!
          </p>
          <p className="text-center font-Nanum text-sm mt-3">
            ex. 장갑과 모자를 합쳐서 새로운 것을 만들면 어떨까?
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">10 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref10,
      tooltip: { position: "top" },
    },
    {
      // 튜토리얼 5. 설명 마무리
      activate: activatedNumber === 10,
      component: (
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <p className="text-center font-Nanum font-bold text-l">
            작성 완료 후에는
          </p>
          <p className="text-center font-Nanum font-bold text-2xl mt-2">
            전체적으로 다시 확인해보세요!
          </p>
          <p className="text-center font-Nanum text-l mt-4">
            좋은 아이디어를 발견할 수 있을거에요 :D
          </p>

          <div className="flex justify-between items-center mt-8">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber - 1)}
            >
              이전

            </button>
            <span className="text-blue-800 font-Nanum">11 / 11</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
              onClick={() => setActivateNumber(activatedNumber + 1)}
            >
              다음

            </button>
          </div>
        </div>
      ),

      reference: ref11,
      tooltip: { position: "top" },
    },
    {
      // 튜토리얼 안내 : ? 클릭 시, 튜토리얼을 다시 볼 수 있음을 안내
      activate: activatedNumber === 11,
      component: (
        <div className="flex bg-white p-8 shadow-lg rounded-lg">
          <p className="text-center font-Nanum font-bold text-2xl">
            튜토리얼 다시보기는 여기를 클릭하세요!
          </p>
          <button
            className="ml-7 bg-blue-500 hover:bg-blue-700 text-blue font-Nanum font-bold py-2 px-4 rounded shadow"
            onClick={() => setActivateNumber(activatedNumber + 1)}
          >
            확인

          </button>
        </div>
      ),

      reference: ref12,
      tooltip: { position: "right" },
    },
  ];

  const coach = coachList[activatedNumber];

  return (
    <div className="absolute  inset-0 h-full w-full bg-[#EFEFEF] bg-opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* 왼쪽 윗 블록 */}
      <div className="absolute top-6 left-6 pl-5 bg-white rounded-md w-[410px] h-[50px] flex items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        {/* 뒤로가기 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => goHome()}
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
        <div className=" ml-3 font-Nanum font-medium text-center text-base rotate-[-0.03deg]">
          {projectName}
        </div>
      </div>

      {/* 그리기 툴 */}
      <div className="absolute top-48 left-6  bg-white rounded-md w-[50px] h-[240px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <img
          src="/cursor.svg"
          alt=""
          className="w-6 h-6 mt-6 cursor-pointer "
          onClick={() => changedraggable()}
        />

        {/* 도형 툴 */}
        <div>
          <svg
            className="w-7 h-7 mt-7 cursor-pointer "
            fill="none"
            height="24"
            onClick={shapeToggle}
            stroke={!shapeMenuToggle ? "black" : "#0064FF"}
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
            <div className="absolute top-[70px] left-[55px]  bg-white rounded-md w-[50px] h-[140px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
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
            stroke={!lineMenuToggle ? "black" : "#0064FF"}
            fill={!lineMenuToggle ? "black" : "#0064FF"}
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
            <div className="absolute top-[130px] left-[55px]  bg-white rounded-md w-[50px] h-[120px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
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
          className="w-6 h-6 mt-7 cursor-pointer"
          onClick={() => addTextBox()}
        />

        {/* 기타 툴 */}
        {/* <img src="/dots.svg" alt="" className="w-4 h-4 mt-7" /> */}
      </div>

      {/* 삭제 버튼 */}
      <div
        className="cursor-pointer absolute top-[460px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
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

      {/* 튜토리얼 - CoachMark 라이브러리 */}
      <CoachMark {...coach} />

      {/* 튜토리얼 버튼 */}
      <div
        ref={ref12}
        className="cursor-pointer absolute top-[530px]  hover:text-blue left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]"
        onClick={startTutorial}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      {/* 튜토리얼 관련 영역 지정 */}
      {/* <div ref={ref1} className="absolute ml-[600px] mt-[300px]" ></div> */}
      <div
        ref={ref1}
        className="absolute ml-[590px] mt-[300px] h-[350px] w-[370px]"
      ></div>
      <div
        ref={ref3}
        className="absolute ml-[590px] mt-[300px] h-[350px] w-[370px]"
      ></div>

      <div
        ref={ref4}
        className="absolute ml-[250px] mt-[495px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref5}
        className="absolute ml-[290px] mt-[320px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref6}
        className="absolute ml-[330px] mt-[147px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref7}
        className="absolute ml-[630px] mt-[98px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref8}
        className="absolute ml-[925px] mt-[147px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref9}
        className="absolute ml-[965px] mt-[320px] h-[165px] w-[280px]"
      ></div>
      <div
        ref={ref10}
        className="absolute ml-[1005px] mt-[495px] h-[165px] w-[280px]"
      ></div>

      <div
        ref={ref11}
        className="absolute ml-[590px] mt-[300px] h-[350px] w-[370px]"
      ></div>

      {/* 실행취소 버튼 */}
      {/* <div
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
      </div> */}

      {/* 복구 버튼 */}
      {/* <div
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
      </div> */}

      <div
        className={`${
          isVisible ? "block" : "hidden"
        } absolute right-6 top-20 p-2.5 max-w-[200px] flex flex-col space-y-2.5`}
      >
        <video ref={myVideoRef} autoPlay muted className="w-full z-50" />
        {/* 자신의 비디오 */}
        {streams.map(({ stream, peerId }) => (
          <Video key={peerId} stream={stream} />
        ))}
      </div>

      {/* 채팅창 */}
      <div
        className={
          chatClick
            ? "absolute top-20 right-10 w-[350px] p-3 z-20 justify-center container  ml-auto px-4"
            : "invisible absolute top-20 right-10 w-80 p-7 z-20 justify-center container w-1/4 ml-auto px-4 "
        }
      >
        <div className="bg-white  rounded-lg shadow-lg">
          <div className="mb-4">
            <div
              id="chat-log"
              className="h-80 overflow-auto p-4 bg-gray-200 rounded hide-scrollbar"
            >
              {chatLog.map((chat) =>
                chat.nickname === localStorage.getItem("userName") ? (
                  // admin인 경우의 스타일

                  <div
                    key={chat.id}
                    className="flex flex-row-reverse chat-message admin-message mr-2"
                    style={{
                      minWidth: "30px",

                      margin: "5px 0", // 상하 마진 추가로 이미지와 메시지 사이 간격 조정
                      wordWrap: "break-word",
                    }}
                  >
                    <img
                      className="rounded-full w-12 h-12 border-[1px] border-light_gray"
                      src={localStorage.getItem("profileImage")}
                      alt=""
                      style={{
                        marginRight: "10px", // 이미지와 텍스트 사이 간격
                      }}
                    />
                    <div className="bg-[#5aa5ff] break-all drop-shadow-md text-sm max-w-40 min-w-12 font-Nanum px-3 rounded-lg mr-3 text-center flex justify-center items-center text-white">
                      {chat.message}
                    </div>
                  </div>
                ) : (
                  // admin이 아닌 경우의 기본 스타일
                  <div
                    key={chat.id}
                    className="flex  flex-row chat-message admin-message mr-2"
                    style={{
                      minWidth: "30px",

                      margin: "5px 0", // 상하 마진 추가로 이미지와 메시지 사이 간격 조정
                      wordWrap: "break-word",
                    }}
                  >
                    <img
                      className="rounded-full w-12 h-12 border-[1px] border-light_gray"
                      src={localStorage.getItem("profileImage")}
                      alt=""
                      style={{
                        marginRight: "10px", // 이미지와 텍스트 사이 간격
                      }}
                    />
                    <div className="bg-white break-all drop-shadow-md font-Nanum text-sm px-3 max-w-40 rounded-lg mr-3 text-center flex justify-center items-center">
                      {chat.message}
                    </div>
                  </div>
                )
              )}
              <div ref={chatLogEndRef} />
            </div>
            <div>
              <hr className="bg-gray opacity-10 mt-1"></hr>
            </div>
            <div className="flex flex-row">
              <input
                type="text"
                name="message"
                value={chatInput.message}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요"
                className=" p-2 rounded flex w-64 h-12 text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 폼 제출을 방지
                    sendInfoToServer();
                  }
                }}
              />
              <svg
                className="w-6 h-6 mt-3 ml-3 cursor-pointer drop-shadow"
                onClick={sendInfoToServer}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m511.6 36.86-64 415.1a32.008 32.008 0 0 1-31.65 27.147c-4.188 0-8.319-.815-12.29-2.472l-122.6-51.1-50.86 76.29C226.3 508.5 219.8 512 212.8 512c-11.5 0-20.8-9.3-20.8-20.8v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96 122.3 360.3 19.69 317.5C8.438 312.8.812 302.2.062 289.1s5.47-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                  fill="#bdbdbd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 윗 블록 */}
      <div className="absolute top-6 right-32 justify-center bg-white rounded-md w-64 h-[50px] gap-8 flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:stroke-blue w-7 h-7 cursor-pointer"
          onClick={toggleVisibility}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>


        <svg
          className="hover:stroke-blue w-7 h-7 cursor-pointer"
          onClick={chatToggle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidtfh={1.5}
          stroke="currentColor"
          className="hover:stroke-blue w-7 h-7 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
      </div>

      {/* (테스트 버튼) 보드 내 요소들 체크 버튼 */}
      {/* <div className="absolute top-6 right-32 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => checkObject()}>Check</button>
      </div> */}

      {/* (테스트 버튼) 색상 변경 버튼 */}
      {/* <div className="absolute top-6 right-12 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <input type="color" value={currentColor} onChange={handleColorChange} />
      </div> */}

      {/* (테스트 버튼) Get 요청 버튼 */}
      {/* <div className="absolute top-6 right-52 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => getProjectData()}>Get</button>
      </div> */}

      {/* (테스트 버튼) Save 버튼 */}
      {/* <div className="absolute top-6 right-94 justify-center bg-white rounded-md w-16 h-[50px] z-50 flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={() => PostSave()}>Save</button>
      </div> */}

      {/* (테스트 버튼) fontSize 조절 버튼 */}
      {/* <div className="absolute top-6 right-72 justify-center bg-white rounded-md w-12 h-10 flex items-center shadow">
        <input
          type="text"
          value={fontSize}
          onChange={handleFontSize}
          className="w-full h-full text-center text-sm border-none rounded-md"
        />
      </div> */}

      {/* 한칸 위 버튼 */}
      <div className="absolute bottom-6 right-32 z-50 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveUp}>한칸 위</button>
      </div>

      {/* 한칸 아래 버튼 */}
      <div className="absolute bottom-6 right-12 z-50 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveToBottom}>한칸 아래</button>
      </div>

      {/* 제일 위 버튼 */}
      <div className="absolute bottom-6 right-52 z-50  justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <button onClick={moveToTop}>제일 위</button>
      </div>

      {/* 이미지 툴 */}

      {imgMenuToggle && (
        <div className="absolute left-[80px] bottom-5">
          {" "}
          {/* 위치 조정 필요에 따라 조절 */}
          <ImageSelector onImageSelect={addImage} />
        </div>
      )}

      {/* 사용자 아이디어 작성 영역 - 템플릿의 inputText 관련 */}
      <div className="top-5 ml-[500px] absolute flex  rounded-2xl items-center bg-transparent border-none shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
        <input
          ref={ref2}
          className="h-[70px] w-[500px] text-center text-5xl font-Nanum rounded-2xl bg-transparent border-none"
          type="text"
          placeholder="Write Your iDEA"
          value={inputText}
          onChange={handleInputTextChange}
          maxLength={9} // 최대 글자 수를 조정할 수 있습니다.
        />
      </div>

      {/* 그리는 구역 */}
      <div className="ml-36 mt-24 h-96 w-96">
        <Stage
          ref={stageRef}
          width={window.innerWidth * 0.85}
          height={window.innerHeight * 0.85}
          draggable={!draggable}
          onWheel={zoomOnWheel}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onDragEnd={handleDragEnd}
          onClick={handleLayerClick}
        >
          <Layer ref={layerRef}>
            {/* Template3 - 7Check에 대한 템플릿 정보 출력 */}
            <TemplateImageComponent
              src={templateImage3.src}
              x={templateImage3.x}
              y={templateImage3.y}
              z={templateImage3.z}
              width={templateImage3.width}
              height={templateImage3.height}
              rotation={templateImage3.rotation}
              scaleX={templateImage3.scaleX}
              scaleY={templateImage3.scaleY}
            />
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

            {/* 이미지 띄우고 저장하는 원본 코드 */}
            {/* {images.map((img) => (
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
            ))} */}

            {/* {images.map((img, index) => (
              img.id === undefined ? (
                <TemplateImageComponent
                  key={index}
                  image={img}
                  x={img.x}
                  y={img.y}
                  width={img.width}
                  height={img.height}
                  rotation={img.rotation}
                  scaleX={img.scaleX}
                  scaleY={img.scaleY}
                  color={img.color}
                />
              ) : (
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
              )
            ))} */}

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

function Video({ stream }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      className="w-[150px] m-2 p-2.5" // Tailwind CSS 클래스 적용
    />
  );
}

export default BoardTemplate3;
