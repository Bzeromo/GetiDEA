import React, { useState, useRef, useEffect, useCallback } from "react";

const deleteFunction = (
  shapes,
  selectedId,
  setShapes,
  setSelectedId,
  lines,
  setLines,
  drawingList, // 이 위치가 맞아야 합니다.
  setDrawingList, // 이 위치가 맞아야 합니다.
  texts,
  setTexts,
  images,
  setImages
) => {
  const deleteSelected = () => {
    if (!selectedId) return; // 선택된 항목이 없으면 함수 종료

    if (Array.isArray(images)) {
      // deleteFunction 호출
    } else {
      console.error("images is not an array" + images);
    }

    if (Array.isArray(texts)) {
      // deleteFunction 호출
    } else {
      console.error("texts is not an array" + texts);
    }

    // 선택된 항목의 type을 찾습니다.
    const selectedType =
      shapes.find((shape) => shape.id === selectedId)?.ty ||
      lines.find((line) => line.id === selectedId)?.ty ||
      texts.find((text) => text.id === selectedId)?.ty ||
      images.find((img) => img.id === selectedId)?.ty;
    // drawingList.find((drawing) => drawing.id === selectedId)?.ty ||

    // type에 따라 적절한 삭제 함수 호출
    switch (selectedType) {
      case "Rect":
        deleteSelectedShape();
        break;
      case "Circle":
        deleteSelectedShape();
        break;
      case "RegularPolygon":
        deleteSelectedShape();
        break;
      case "Line":
        deleteSelectedLine();
        break;
      case "Arrow":
        deleteSelectedLine();
        break;
      case "Dot":
        deleteSelectedLine();
        break;
      case "Text":
        deleteSelectedText();
        break;
      case "Image":
        deleteSelectedImage();
        break;
      case null:
        deleteSelectedDrawing();
        break;
      default:
        deleteSelectedDrawing();
        break;
    }

    // 선택 해제
    setSelectedId(null);
  };

  const deleteSelectedShape = () => {
    const newShapes = shapes.filter((shape) => shape.id !== selectedId);
    setShapes(newShapes);
    setSelectedId(null); // 선택 해제
  };

  const deleteSelectedLine = () => {
    const newLines = lines.filter((line) => line.id !== selectedId);
    setLines(newLines);
    setSelectedId(null); // 선택 해제
  };
  const deleteSelectedText = () => {
    const newTexts = texts.filter((text) => text.id !== selectedId);
    setTexts(newTexts);
    setSelectedId(null);
  };

  const deleteSelectedImage = () => {
    const newImages = images.filter((image) => image.id !== selectedId);
    setImages(newImages);
    setSelectedId(null); // 이미지 삭제 후 선택된 이미지 ID 초기화
  };

  const deleteSelectedDrawing = () => {
    setDrawingList([]);
  };

  // const deleteSelectedImage = () => {
  //   if (selectedId) {
  //     // 이미지 ID 파싱 부분은 생략하고, selectedId를 직접 사용합니다.
  //     // 필요에 따라 여기서 ID 파싱 로직을 추가할 수 있습니다.

  //     // 해당 ID를 가진 이미지를 제외하고 새로운 이미지 배열을 생성합니다.
  //     const newImages = images.filter(
  //       (image) => `image-${image.id}` !== selectedId
  //     );

  //     setImages(newImages); // 새로운 이미지 배열로 상태를 업데이트합니다.
  //     setSelectedId(null); // 선택된 이미지 ID를 초기화합니다.
  //   }
  // };

  // const deleteSelectedImg = () => {
  //   const newImages = images.filter((image) => image.id !== selectedId);
  //   setImages(newImages);
  //   setSelectedId(null);
  // };

  return {
    deleteSelectedShape,
    deleteSelectedLine,
    deleteSelectedText,
    deleteSelectedImage,
    deleteSelectedDrawing,
    deleteSelected,
  };
};

export default deleteFunction;
