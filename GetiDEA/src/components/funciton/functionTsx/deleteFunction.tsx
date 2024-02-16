import React from "react";

const deleteFunction = (
  shapes: any[],
  selectedId: string | null,
  setShapes: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
  lines: any[],
  setLines: React.Dispatch<React.SetStateAction<any[]>>,
  drawingList: any[], // 이 위치가 맞아야 합니다.
  setDrawingList: React.Dispatch<React.SetStateAction<any[]>>, // 이 위치가 맞아야 합니다.
  texts: any[],
  setTexts: React.Dispatch<React.SetStateAction<any[]>>,
  images: any[],
  setImages: React.Dispatch<React.SetStateAction<any[]>>
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
      case "RegularPolygon ":
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
