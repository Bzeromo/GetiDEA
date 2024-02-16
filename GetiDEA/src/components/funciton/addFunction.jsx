import { v4 as uuidv4 } from 'uuid';

const addFunction = (
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
  setIdCounter,
  strokeCurrentColor,
) => {
  const addRectangle = (type) => {
    setIdCounter(idCounter+1);
    const newShape = {
      id: `${type}${uuidv4()}`,
      type: "Rect",
      stroke: strokeCurrentColor,
      strokeWidth : 3,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: currentColor,
      ty: "Rect",
      // draagable: true,
      // ondragend: {handleDragEnd},
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = (type) => {
    setIdCounter(idCounter+1);
    const newShape = {
      id: `${type}${uuidv4()}`,
      type: "Circle",
      stroke: strokeCurrentColor,
      strokeWidth : 3,
      x: 50,
      y: 50,
      radius: 50,
      fill: currentColor,
      ty: "Circle",
    };
    setShapes([...shapes, newShape]);
  };

  const addTriangle = (type) => {
    setIdCounter(idCounter+1);
    const newShape = {
      id: `${type}${uuidv4()}`,
      type: "RegularPolygon",
      stroke: strokeCurrentColor,
      strokeWidth : 3,
      x: 50,
      y: 50,
      sides: 3,
      radius: 50,
      fill: currentColor,
      ty: "RegularPolygon",
    };
    setShapes([...shapes, newShape]);
  };

  const addLine = (type) => {
    const newLine = {
      id: `${type}${uuidv4()}`,
      points: [
        linePosition.startX,
        linePosition.startY,
        linePosition.endX,
        linePosition.endY,
      ],
      stroke: currentColor,
      strokeWidth: 10,
      rotation: 0,
      lineCap: "round",
      lineJoin: "round",
      fill: currentColor,
      ty: "Line",
      type: "Line",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addDashedLine = (type) => {
    const newLine = {
      id: `${type}${uuidv4()}`,
      points: [
        linePosition.startX,
        linePosition.startY,
        linePosition.endX,
        linePosition.endY,
      ],
      stroke: currentColor,
      strokeWidth: 5,
      rotation: 0,
      lineJoin: "round",
      dash: [33, 10],
      fill: currentColor,
      ty: "Dot",
      type: "Dot",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addDottedLine = (type) => {
    const newLine = {
      id: `${type}${uuidv4()}`,
      points: [
        linePosition.startX,
        linePosition.startY,
        linePosition.endX,
        linePosition.endY,
      ],
      stroke: currentColor,
      strokeWidth: 10,
      rotation: 0,
      lineCap: "round",
      lineJoin: "round",
      dash: [29, 20, 0.001, 20],
      fill: currentColor,
      ty: "Dot",
      type: "Dot",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addArrowLine = (type) => {
    const newLine = {
      id: `${type}${uuidv4()}`,
      ty: "Arrow",
      type: "Arrow",
      points: [
        linePosition.startX,
        linePosition.startY,
        linePosition.endX,
        linePosition.endY,
      ],
      pointerLength: 20,
      // pointerLength: 20,
      stroke: currentColor,
      rotation: 0,
      strokeWidth: 10,
      fill: currentColor,
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addTextBox = () => {
    const newText = {
      id: `Text${uuidv4()}`,
      text: "텍스트입니다",
      x: 100,
      y: 100,
      z: 200,
      ty: "Text",
      type: "Text",
      fontSize: 10,
    };
    setTexts([...texts, newText]);
  };

  const addImage = (src) => {
    setIdCounter(idCounter+1);
    const newImage = {
      id: `image${uuidv4()}`,
      src,
      x: 50,
      y: 50,
      ty: "Image",
      type: "Image",
    };
    setImages([...images, newImage]);
  };

  return {
    addRectangle,
    addCircle,
    addTriangle,
    addLine,
    addDashedLine,
    addDottedLine,
    addArrowLine,
    addImage,
    addTextBox,
  };
};

export default addFunction;
