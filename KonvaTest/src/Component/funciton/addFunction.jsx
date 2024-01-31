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
      lineCap: "round",
      lineJoin: "round",
      fill: currentColor,
      ty: "Line",
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
      lineJoin: "round",
      dash: [33, 10],
      fill: currentColor,
      ty: "Line",
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
      lineCap: "round",
      lineJoin: "round",
      dash: [29, 20, 0.001, 20],
      fill: currentColor,
      ty: "Line",
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
      strokeWidth: 10,
      fill: currentColor,
      ty: "Line",
      x: rectPosition.x,
      y: rectPosition.y,
    };
    setLines([...lines, newLine]);
  };

  // const addText = () => {
  //   if (newTextValue) {
  //     const newText = {
  //       id: `Text-${texts.length + 1}`,
  //       type: "Text",
  //       text: "ㅇㄴㅁㅇㄴㅁㅇㄴㅁ",
  //       x: 100, // 텍스트 위치 조절
  //       y: 100, // 텍스트 위치 조절
  //       fontSize: 18, // 텍스트 폰트 크기 조절
  //       fill: selectStroke, // 텍스트 색상 설정
  //     };
  //     setTexts([...texts, newText]);
  //     setNewTextValue(""); // 텍스트 입력 초기화
  //     console.log("TExt 생성")
  //   }
  // };

  const addImage = (src) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // 이미지 객체에 ID 추가

      const newImage = {
        id: `img${images.length + 1}`,
        img,
        x: 20,
        y: 20,
      };
      setImages([...images, newImage]);
      // ID 카운터 증가
      setImageIdCounter(imageIdCounter + 1);
    };
  };

  const addTextBox = () => {
    const newText = {
      id: `Text-${texts.length+1}`,
      text: "텍스트입니다",
      x: rectPosition.x,
      y: rectPosition.y,
      ty: "Text"
    };
    setTexts([...texts, newText]);
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
