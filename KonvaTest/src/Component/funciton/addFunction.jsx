const addFunction = (
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
  fontSize,
  setFontSize,

) => {
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
      ty: "Shape",
      // draagable: true,
      // ondragend: {handleDragEnd},
      
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = (type) => {
    const newShape = {
      id: `${type}${shapes.length + 1}`,
      type: "Circle",
      stroke: selectStroke,
      x: 50,
      y: 50,
      radius: 50,
      fill: currentColor,
      ty: "Shape",
    };
    setShapes([...shapes, newShape]);
  };

  const addTriangle = (type) => {
    const newShape = {
      id: `${type}${shapes.length + 1}`,
      type: "RegularPolygon",
      stroke: selectStroke,
      x: 50,
      y: 50,
      sides: 3,
      radius: 50,
      fill: currentColor,
      ty: "Shape",
    };
    setShapes([...shapes, newShape]);
  };

  const addLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
      stroke: currentColor,
      strokeWidth: 10,
      rotation : 0,
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
      id: `${type}${lines.length + 1}`,
      points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
      stroke: currentColor,
      strokeWidth: 5,
      rotation : 0,
      lineJoin: "round",
      dash: [33, 10],
      fill: currentColor,
      ty: "Line",
      type : "Dot",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addDottedLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
      stroke: currentColor,
      strokeWidth: 10,
      rotation : 0,
      lineCap: "round",
      lineJoin: "round",
      dash: [29, 20, 0.001, 20],
      fill: currentColor,
      ty: "Line",
      type : "Dot",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  const addArrowLine = (type) => {
    const newLine = {
      id: `${type}${lines.length + 1}`,
      type: "Arrow",
      points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
      pointerLength: 20,
      // pointerLength: 20,
      stroke: currentColor,
      rotation : 0,
      strokeWidth: 10,
      fill: currentColor,
      ty: "Line",
      type : "Arrow",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  }


  const addTextBox = () => {
    const newText = {
      id: `Text-${texts.length+1}`,
      text: "텍스트입니다",
      x: 100,
      y: 100,
      z: 200,
      ty: "Text",
      fontSize : 10,
    };
    console.log(newText)
    setTexts([...texts, newText]);
    console.log(texts)
  };

  
  const addImage = (src) => {
    console.log(`Adding image to layer: ${src}`); // 이미지 추가 로그
    const newImage = {
      id: `image_${images.length}`,
      src,
      x: 50,
      y: 50,
    };
    setImages([...images, newImage]);
    console.log(images); // 상태 업데이트 후 이미지 목록 로그
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
    addTextBox
  };
};

export default addFunction;
