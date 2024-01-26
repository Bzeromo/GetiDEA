import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Transformer, Line, Image } from "react-konva";

import ImgComponent from "./Add/ImgComponent";
import ShapeComponent from "./Add/ShapeComponent";
import LineComponent from "./Add/LineComponent";
import ArrowComponent from "./Add/ArrowComponent";
import TextComponent from "./Add/TextComponent";
import addFunction from "./funciton/addFunction";
import useEventHandlers from "./funciton/useEventHandlers";
import redoUndoFunction from "./funciton/redoUndoFunciton";
import deleteFunction from "./funciton/deleteFunction";
import changeFunction from "./funciton/changeFunction";

const MyDrawing = () => {
  const [imageIdCounter, setImageIdCounter] = useState(0);

  //스테이지 초기화
  const initialScaleValue = { x: 1, y: 1 };
  const initialPositionValue = { x: 0, y: 0 };
  const stageRef = useRef(null);

  //위치 조정
  const [stageScale, setStageScale] = useState(initialScaleValue);
  const [stagePosition, setStagePosition] = useState(initialPositionValue);

  //인자값 변경
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [lines, setLines] = useState([]);
  const [drawingList, setDrawingList] = useState([]);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);

  //초기값
  const [fillColor, setFillColor] = useState("black");
  const [selectedId, setSelectedId] = useState(null);
  const [currentColor, setCurrentColor] = useState(fillColor);
  const [selectStroke, setSelectStroke] = useState("");
  const [newTextValue, setNewTextValue] = useState("");

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


  const {
    changeSelectedShapeColor,
    changeSelectedStrokeColor,
    changedraggable,
    changeWrite,
    changeStrokeColor,
    renderColor,
    handleImageClick,
  } = 
  changeFunction(
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
  )

  const {
    addText,
    addRectangle,
    addCircle,
    addTriangle,
    addLine,
    addDashedLine,
    addDottedLine,
    addArrowLine,
    addImage
  } = addFunction(
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
    images, setImages, setImageIdCounter, imageIdCounter
  );

  const {
    deleteSelectedShape,
    deleteSelectedLine,
    deleteSelectedDrawing,
    deleteSelectedText,
    deleteSelectedImage,
  } = deleteFunction(
    shapes,
    selectedId,
    setShapes,
    setSelectedId,
    lines,
    setLines,
    setDrawingList,
    texts,
    setTexts,
    images,
    setImages,
  );

  const { zoomOnWheel, handleMouseDown, handleMouseMove, handleMouseUp } =
    useEventHandlers(
      startWrite,
      setDrawing,
      setCurrentLine,
      drawing,
      currentLine,
      setDrawingList,
      drawingList,
      fillColor,

      useCallback,
      stageRef,
      setStageScale,
      setStagePosition
    );

  const { redo, undo } = redoUndoFunction(
    setRedoHistory,
    setHistory,
    setShapes,
    redoHistory,
    history
  );

  useEffect(() => {
    setHistory([...history, shapes]);
  }, [shapes]);


  //토글 온오프 기능
  const writeSetToggle = () => {
    setWriteToggle(!writeToggle);
    setLineMenuToggle(false);
    setShapeMenuToggle(false);
    
    changeWrite();
  }
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
      <div className='absolute top-6 left-6 pl-5 bg-white rounded-md w-96 h-[50px] flex items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]'>
      
        {/* 뒤로가기 버튼 */}
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        <div className='ml-6 border-l-2 border-line_gray'>&ensp;</div>
        
        {/* 서비스 로고 */}
        <img src="/logo.svg" alt="" className='ml-4 w-8 h-8 '/>
        <div className=' ml-3 font-Inter font-bold text-xl rotate-[-0.03deg]'>Get iDEA</div>

        <div className='ml-8 border-l-2 border-line_gray'>&ensp;</div>

      {/* 프로젝트 이름 */}
      <div className=' ml-3 font-Nanum font-medium text-base rotate-[-0.03deg]'>새 프로젝트</div>
      </div>
     
        {/* 그리기 툴 */}
        <div className='absolute top-48 left-6  bg-white rounded-md w-[50px] h-[325px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]'>
        
          <img src="/cursor.svg" alt="" className='w-6 h-6 mt-6 cursor-pointer ' onClick={() => changedraggable()} />
          
          {/* 펜 툴 */}
          <svg className='w-6 h-6 mt-7 cursor-pointer'  fill ={!writeToggle ? 'black' : '#0064FF'} onClick={() => writeSetToggle()} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 128 128"><path d="m36.108 110.473 70.436-70.436-18.581-18.58-70.437 70.436a2.305 2.305 0 0 0-.803 1.22l-5.476 20.803c-.01.04-.01.082-.019.121a2.492 2.492 0 0 0-.039.247 2.354 2.354 0 0 0-.009.222 1.89 1.89 0 0 0 .048.471c.008.04.008.082.019.121.007.029.021.055.031.083.023.078.053.154.086.23.029.067.057.134.09.196.037.066.077.127.121.189.041.063.083.126.13.184.047.059.1.109.152.162a1.717 1.717 0 0 0 .345.283c.063.043.124.084.192.12.062.033.128.062.195.09.076.033.151.063.23.087.028.009.054.023.083.031.04.01.081.01.121.02a2.47 2.47 0 0 0 .693.039 3.26 3.26 0 0 0 .247-.039c.04-.01.082-.01.121-.02l20.804-5.475c.505-.132.92-.425 1.22-.805zm-16.457-2.124a2.313 2.313 0 0 0-1.964-.649l3.183-12.094 11.526 11.525-12.096 3.182a2.304 2.304 0 0 0-.649-1.964zM109.702 36.879l-18.58-18.581 7.117-7.117s12.656 4.514 18.58 18.582l-7.117 7.116z"  ></path></svg>
          {/* <img src="/pen.svg" alt="" className='w-6 h-6 mt-7 cursor-pointer' onClick={() => changeWrite()}/> */}
          
          {/* 도형 툴 */}
          <div>
          <svg className='w-7 h-7 mt-7 cursor-pointer ' fill="none" height="24" onClick={shapeToggle}  stroke ={!shapeMenuToggle ? 'black' : '#0064FF'}  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><path d="M12 3l-4 7h8z"/><circle cx="17" cy="17" r="3"/><rect height="6" rx="1" width="6" x="4" y="14"/></svg>
            {/* <img src="/shape.svg" alt="" className={`'w-7 h-7 mt-7 cursor-pointer ' stroke-current ${shapeMenuToggle ? 'text-black' : 'text-blue'}`}  onClick={shapeToggle}/> */}
            {shapeMenuToggle && (
              <div className="absolute top-[120px] left-[55px]  bg-white rounded-md w-[50px] h-[140px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
                <svg className="hover:stroke-blue w-6 h-6 mt-3 cursor-pointer" onClick={() => addRectangle("Rect")} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="3"/></svg>
                <svg className="hover:stroke-blue w-6 h-6 mt-5 cursor-pointer" fill="none" onClick={() => addCircle("Circle")} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>
                <svg fill="none" className="hover:stroke-blue w-6 h-6 mt-4 cursor-pointer stroke-black" onClick={() => addTriangle("RegularPolygon")} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1.5L0.5 13.5H14.5L7.5 1.5Z"  stroke-width="1.3" stroke-linejoin="round"/></svg>
              </div>
            )}
          </div>

          {/* 선 그리기 툴 */}
          <div>
              <svg className='w-7 h-7 mt-7 cursor-pointer' stroke ={!lineMenuToggle ? 'black' : '#0064FF'} fill ={!lineMenuToggle ? 'black' : '#0064FF'} viewBox="0 0 32 32" onClick={lineToggle} xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M15.31,6.85a1,1,0,0,0,1,1h6.51L6.17,24.5a1,1,0,0,0,1.41,1.41L24.21,9.28v6.46a1,1,0,1,0,2,0v-9a.9.9,0,0,0-.9-.9h-9A1,1,0,0,0,15.31,6.85Z"/></g></svg>
              {/* <img src="/line.svg" alt="" className='w-7 h-7 mt-7 cursor-pointer'  onClick={lineToggle}/> */}
              {lineMenuToggle && (
                <div className="absolute top-[180px] left-[55px]  bg-white rounded-md w-[50px] h-[120px] flex items-center flex-col shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={() => addLine("Line")} viewBox="0 0 24 24" strokeWidth={2}   stroke="currentColor" className="hover:stroke-blue w-[50px] h-[80px] mt-2  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                  <svg  className="hover:stroke-blue  cursor-pointer" onClick={() => addDottedLine("Dotted")} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 7.5C0 7.22386 0.223858 7 0.5 7H3C3.27614 7 3.5 7.22386 3.5 7.5C3.5 7.77614 3.27614 8 3 8H0.5C0.223858 8 0 7.77614 0 7.5ZM5.75 7.5C5.75 7.22386 5.97386 7 6.25 7H8.75C9.02614 7 9.25 7.22386 9.25 7.5C9.25 7.77614 9.02614 8 8.75 8H6.25C5.97386 8 5.75 7.77614 5.75 7.5ZM12 7C11.7239 7 11.5 7.22386 11.5 7.5C11.5 7.77614 11.7239 8 12 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12Z"
                      fill="#000000"
                    />
                  </svg>
                  <svg  onClick={() => addArrowLine("Arrow")} viewBox="0 0 24 24" id="right-arrow" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="hover:stroke-blue mt-1 mb-2 w-15  hover:fill-blue stroke-black cursor-pointer"><path id="primary" d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z" ></path></svg>
                  
		  
                </div>
              )}
          </div>

          {/* 텍스트 상자 툴 */}
          <img src="/text.svg" alt="" className='w-6 h-6 mt-7'/>

          {/* 기타 툴 */}
          <img src="/dots.svg" alt="" className='w-4 h-4 mt-7'/>
        </div>

      {/* 삭제 버튼 */}
        <div className='cursor-pointer absolute top-[540px] left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]' onClick={() => deleteSelectedShape()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>

        {/* 실행취소 버튼 */}
        <div className='cursor-pointer absolute top-[610px]  hover:stroke-blue left-6  bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]' onClick={() => undo()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </div>

        {/* 복구 버튼 */}
        <div className='cursor-pointer absolute top-[670px] left-6  hover:stroke-blue bg-white rounded-md w-[50px] h-[50px] flex justify-center items-center shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]' onClick={() => undo()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
          </svg>
        </div>

        {/* 오른쪽 윗 블록 */}
        <div className='absolute top-6 right-32 justify-center bg-white rounded-md w-16 h-[50px] flex  items-center flex-row shadow-[rgba(0,_0,_0,_0.25)_0px_4px_4px_0px]'>
          <svg className="hover:stroke-blue w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          </div>

      {/* 그리는 구역 */}
      <div className="ml-36 mt-24 h-full w-full">
        <Stage
          ref={stageRef}
          width={window.innerWidth * 1}
          height={window.innerHeight * 1}
          draggable={!draggable}
          onWheel={zoomOnWheel}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onDragEnd={(e) => {
            setStagePosition({ x: e.target.x(), y: e.target.y() });
          }}
        >
          <Layer>
            {drawing && (
              <Line points={currentLine} stroke={fillColor} strokeWidth={5} />
            )}
            {drawingList.map((drawing, i) => (
              <Line key={i} {...drawing} />
            ))}
            {shapes.map((shape) => (
              <ShapeComponent
                key={shape.id}
                shapeProps={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => {
                  setSelectedId(shape.id);
                }}
                onChange={(newAttrs) => {
                  const newShapes = shapes.map((s) =>
                    s.id === shape.id ? newAttrs : s
                  );
                  setShapes(newShapes); // 상태 업데이트
                }}
              />
            ))}
            {lines.map((line, i) => {
              if (line.type === "Arrow") {
                return (
                  <ArrowComponent
                    key={i}
                    lineProps={line}
                    isSelected={line.id === selectedId}
                    onSelect={() => {
                      setSelectedId(line.id);
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
                    key={i}
                    lineProps={line}
                    isSelected={line.id === selectedId}
                    onSelect={() => {
                      setSelectedId(line.id);
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
            {texts.map((text, i) => (
              <TextComponent
                key={i}
                textProps={text}
                isSelected={text.id === selectedId}
                onSelect={() => {
                  setSelectedId(text.id);
                }}
                onChange={(newAttrs) => {
                  const newTexts = texts.map((t) =>
                    t.id === text.id ? { ...t, ...newAttrs } : t
                  );
                  setTexts(newTexts);
                }}
              />
            ))}

            {images.map((imageObj, index) => (
              <Image
                key={index}
                id={`image-${imageObj.id}`} // 고유 ID 설정
                image={imageObj.img}
                x={20}
                y={20}
                width={100}
                height={100}
                draggable
                onClick={() => setSelectedId(`image-${imageObj.id}`)} // onClick에서 ID 설정
                // onClick={() => handleImageClick}
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
