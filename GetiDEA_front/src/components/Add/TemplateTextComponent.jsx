import React, { useState, useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

const Template1TextComponent = ({
  text,
  x,
  y,
  fontSize,
  textProps,
  onSelect,
  fontFamily,
  visible,
  fontWeight,
}) => {
  const [textBox, setTextBox] = useState(text);
  const [position, setPosition] = useState({ x, y });
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);
  const transformerRef = useRef(null);

  const handleClick = () => {
    // 클릭 이벤트를 무시하도록 빈 함수로 설정
  };

  useEffect(() => {
    setTextBox(textRef.current);
  }, []);

  return (
    <Text
      ref={textRef}
      {...textProps}
      x={textProps.x}
      y={textProps.y}
      text={textProps.text}
      fontSize={textProps.fontSize}
      draggable={false}
      ty="Text"
      style={{ zIndex: 100 }} // z-index 설정
      onClick={handleClick} // 클릭 이벤트 무시
    />
  );
};


export default Template1TextComponent;
