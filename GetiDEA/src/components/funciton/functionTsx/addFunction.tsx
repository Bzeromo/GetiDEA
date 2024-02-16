const addFunction = (
    shapes: any[],
    setShapes: React.Dispatch<React.SetStateAction<any[]>>,
    lines: any[],
    setLines: React.Dispatch<React.SetStateAction<any[]>>,
    texts: any[],
    setTexts: React.Dispatch<React.SetStateAction<any[]>>,
    currentColor: string,
    selectStroke: string,
    newTextValue: string,
    setNewTextValue: React.Dispatch<React.SetStateAction<string>>,
    images: any[],
    setImages: React.Dispatch<React.SetStateAction<any[]>>,
    setImageIdCounter: React.Dispatch<React.SetStateAction<number>>,
    imageIdCounter: number,
    rectPosition: { x: number; y: number },
    linePosition: {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    },
    fontSize: number,
    setFontSize: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const addRectangle = (type: string) => {
      const newShape = {
        id: `${type}${shapes.length + 1}`,
        type: "Rect",
        stroke: selectStroke,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: currentColor,
        ty: "Rect",
      };
      setShapes([...shapes, newShape]);
    };
  
    const addCircle = (type: string) => {
      const newShape = {
        id: `${type}${shapes.length + 1}`,
        type: "Circle",
        stroke: selectStroke,
        x: 50,
        y: 50,
        radius: 50,
        fill: currentColor,
        ty: "Circle",
      };
      setShapes([...shapes, newShape]);
    };
  
    const addTriangle = (type: string) => {
      const newShape = {
        id: `${type}${shapes.length + 1}`,
        type: "RegularPolygon",
        stroke: selectStroke,
        x: 50,
        y: 50,
        sides: 3,
        radius: 50,
        fill: currentColor,
        ty: "RegularPolygon",
      };
      setShapes([...shapes, newShape]);
    };
  
    const addLine = (type: string) => {
      const newLine = {
        id: `${type}${lines.length + 1}`,
        points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
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
  
    const addDashedLine = (type: string) => {
      const newLine = {
        id: `${type}${lines.length + 1}`,
        points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
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
  
    const addDottedLine = (type: string) => {
      const newLine = {
        id: `${type}${lines.length + 1}`,
        points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
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
  
    const addArrowLine = (type: string) => {
      const newLine = {
        id: `${type}${lines.length + 1}`,
        type: "Arrow",
        points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
        pointerLength: 20,
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
        id: `Text-${texts.length + 1}`,
        text: "텍스트입니다",
        x: 100,
        y: 100,
        z: 200,
        ty: "Text",
        fontSize: 10,
      };
      setTexts([...texts, newText]);
    };
  
    const addImage = (src: string) => {
      const newImage = {
        id: `image_${images.length}`,
        src,
        x: 50,
        y: 50,
        ty: "image",
        type: "Image",
      };
      setImages([...images, newImage]);
      setImageIdCounter(imageIdCounter + 1);
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
  