import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";

const useEventHandler = (
  startWrite,
  selectedId,
  setSelectionRect,
  setSelectedIds,
  setDrawing,
  setCurrentLine,
  drawingList,
  setDrawingList,
  currentColor,
  shapes,
  setLines,
  setShapes,
  setTexts,
  setDragEnded,
  stageRef,
  setStageScale,
  setStagePosition,
  drawing,
  selectionRect,
  currentLine,
  sendInfoToServer,
  stagePosition,
  stageScale,

) => {
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
    const stage = e.target.getStage();
    if (!stage) {
      console.error("Stage not found");
      return;
    }
  
    const pointer = stage.getPointerPosition();
    if (!pointer) {
      console.error("Pointer position is undefined");
      return;
    }
  
    // 스테이지의 스케일과 위치를 고려하여 마우스 포인터의 위치를 조정하고,
    // 이를 조건문 밖에서 먼저 계산합니다.
    const x = (pointer.x - stage.x()) / stage.scaleX();
    const y = (pointer.y - stage.y()) / stage.scaleY();
  
    // if (!drawing || !startWrite || selectedId) {
    //   // if (!selectionRect.x) return; // 선택 영역이 없으면 종료
  
    //   // const newSelectionRect = {
    //   //   ...selectionRect,
    //   //   width: x - selectionRect.x,
    //   //   height: y - selectionRect.y,
    //   // };
    //   // setSelectionRect(newSelectionRect);
    //   // const selected = shapes.filter((rect) => {
    //   //   return (
    //   //     rect.x > selectionRect.x &&
    //   //     rect.y > selectionRect.y &&
    //   //     rect.x + rect.width < x &&
    //   //     rect.y + rect.height < y
    //   //   );
    //   // });
    //   // setSelectedIds(selected.map((s) => s.id));
    //   // return;
    // }
  
    // 이 부분은 그대로 유지됩니다.
    setCurrentLine(currentLine.concat([x, y]));
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

    sendInfoToServer();
  };

  const handleDragEnd = async (e) => {
    if (!e || !e.target) {
      // e 또는 e.target이 undefined인 경우
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }

    const id = e.target.id();
    const id2 = e.target.attrs.id;
    const ty = e.target.attrs.ty;
    const type = e.target.attrs.type;

    // 새로운 위치 정보를 가져옵니다.
    const newPos = { x: e.target.x(), y: e.target.y() };
    const newData = e.target.attrs;
    const newRotate = e.target.rotation();

    if (!id) {
    } else {
    }
    if (ty === "Line" && type === "Dot") {
      setLines((prevLines) =>
        prevLines.map((lines) => {
          if (lines.id === id) {
            const updatedLine = { ...lines, ...newData };
            // PostDot({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
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
            // PostArrow({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
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
            // PostLine({ target: { attrs: updatedLine } }); // 필요한 데이터만 전송
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
            // PostRect({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
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
            // PostTriangle({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
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
            // PostCircle({ target: { attrs: updatedShape } }); // 필요한 데이터만 전송
            return updatedShape;
          }
          return shapes;
        })
      );
    } else if (ty === "Text" && ty === "Text") {
      setTexts((prevTexts) =>
        prevTexts.map((texts) => {
          if (texts.id === id) {
            const updatedText = { ...texts, ...newData };
            // PostText({ target: { attrs: updatedText } }); // 필요한 데이터만 전송
            return updatedText;
          }
          return texts;
        })
      );
    }

    setDragEnded(true);
  };

  const handleTransformEnd = (e) => {
    const node = e.target;

    const rotationAngle = node.rotation();

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
  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDragEnd,
    handleTransformEnd,
    zoomOnWheel,
    resetZoom,
  };
};

export default useEventHandler;
