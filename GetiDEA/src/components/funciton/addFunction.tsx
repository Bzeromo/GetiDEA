interface Shape {
  id: string;
  type: string;
  stroke: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill: string;
  ty: "Shape";
  radius?: number;
  sides?: number;
}

interface Line {
  id: string;
  points: number[];
  stroke: string;
  strokeWidth: number;
  rotation: number;
  lineCap?: "round";
  lineJoin: "round";
  dash?: number[];
  fill: string;
  ty: "Line";
  type: "Line" | "Dot" | "Arrow";
  x: number;
  y: number;
  pointerLength?: number;
}

interface Image {
  id: string;
  img: HTMLImageElement;
  x: number;
  y: number;
}

interface Text {
  id: string;
  text: string;
  x: number;
  y: number;
  ty: "Text";
}

interface Position {
  x: number;
  y: number;
}

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T[]>>;

const addFunction = (
  
  shapes: Shape[],
  setShapes: SetStateFunction<Shape>,
  lines: Line[],
  setLines: SetStateFunction<Line>,
  texts: Text[],
  setTexts: SetStateFunction<Text>,
  currentColor: string,
  selectStroke: string,
  newTextValue: string,
  setNewTextValue: React.Dispatch<React.SetStateAction<string>>,
  images: Image[],
  setImages: SetStateFunction<Image>,
  setImageIdCounter: React.Dispatch<React.SetStateAction<number>>,
  imageIdCounter: number,
  rectPosition: Position,
  linePosition: { startX: number; startY: number; endX: number; endY: number },
) => {

  const addRectangle = (type: string) => {
      const newShape: Shape = {
        id: `${type}${shapes.length + 1}`,
        type: "Rect",
        stroke: selectStroke,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: currentColor,
        ty: "Shape",
      };
      setShapes([...shapes, newShape]);
    };

  const addCircle = (type: string) => {
      const newShape: Shape = {
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

  const addTriangle = (type:string) => {
    const newShape : Shape = {
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

  const addLine = (type:string) => {
    const newLine : Line  = {
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

  

  const addDashedLine = (type:string) => {
    const newLine : Line = {
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

  const addDottedLine = (type:string) => {
    const newLine : Line = {
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

  const addArrowLine = (type:string) => {
    const newLine : Line  = {
      id: `${type}${lines.length + 1}`,
      points: [linePosition.startX, linePosition.startY, linePosition.endX, linePosition.endY],
      pointerLength: 20,
      // pointerLength: 20,
      stroke: currentColor,
      rotation : 0,
      strokeWidth: 10,
      fill: currentColor,
      ty: "Line",
      type : "Arrow",
      lineJoin: "round",
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

  const addImage = (src: string) => {
    const img = new Image(); // `new window.Image()` 대신 `new Image()` 사용 가능
    img.src = src;
    img.onload = () => {
      const newImage: Image = { // `newImage`가 `Image` 인터페이스를 따름을 명시
        id: `img${images.length + 1}`,
        img,
        x: 20,
        y: 20,
      };
      setImages([...images, newImage]); // 이미지 목록에 새 이미지 추가
      setImageIdCounter(imageIdCounter + 1); // ID 카운터 증가
    };
  };

  const addTextBox = () => {
    const newText : Text = {
      id: `Text-${texts.length+1}`,
      text: "텍스트입니다",
      x: rectPosition.x,
      y: rectPosition.y,
      ty: "Text"
    };
    console.log(newText)
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
