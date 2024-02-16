import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
  Text,
  Arrow,
  Image,
} from "react-konva";

const TextComponent = ({
    textProps,
    isSelected,
    onSelect,
    onChange,
    onTextEdit,
  }) => {
    const textRef = useRef();
    const transformerRef = useRef();
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(textProps.text);
    const [showInput, setShowInput] = useState(true);
  
    useEffect(() => {
      if (isSelected) {
        transformerRef.current.nodes([textRef.current]);
        transformerRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    useEffect(() => {
    }, [editing]);
  
    const handleDoubleClick = () => {
      setEditing((prevEditing) => !prevEditing);
    };
  
    const handleChange = (e) => {
      setText(e.target.value);
    };
  
    const handleBlur = () => {
      setEditing(false);
      if (onTextEdit) {
        onTextEdit({ ...textProps, text });
      }
      onChange({ ...textProps, text }); // 변경된 텍스트를 상위 컴포넌트에 전달
    };
  
    return (
      <>
        {showInput && (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              position: "absolute",
              top: `${textProps.y}px`, // 확인: 정확한 위치 설정
              left: `${textProps.x}px`, // 확인: 정확한 위치 설정
              zIndex: "1000",
              // 추가 스타일링이 필요한 경우 여기에 추가
              width: "100px",
              height: "50px",
              backgroundColor: "black",
            }}
            autoFocus
          />
        )}
        <Text
          ref={textRef}
          {...textProps}
          text={text}
          draggable
          onClick={onSelect}
          onDblClick={handleDoubleClick}
        />
        {isSelected && <Transformer ref={transformerRef} />}
      </>
    );
  };

  export default TextComponent;