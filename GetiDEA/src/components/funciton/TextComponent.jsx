import React, { useState, useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

const TextComponent = ({ text, x, y, onTextChange, onDragEnd, isSelected, textProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textBox, setTextBox] = useState(text);
  const [position, setPosition] = useState({ x, y });
  // const [text, setText] = useState(textProps.text);
  const [showInput, setShowInput] = useState(true);
  const transformerRef = useRef();
  const textRef = useRef();

  const lineRef = useRef();
  // const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // 현재 도형에 Transformer 연결
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    setTextBox(textRef.current); // textRef.current를 textBox에 할당
    // 기타 로직...
  }, []);

  const handleDblClick = () => {

    if (!textBox) {
      console.error('TextBox가 아직 설정되지 않았습니다.');
      return;
    }

    setIsEditing(true);

    // 텍스트 입력을 위한 HTML 텍스트 입력 필드 생성
    const input = document.createElement("input");
    input.value = text;
    input.style.position = "absolute";
    input.style.top = textBox.absolutePosition().y + 90 + "px";
    input.style.left = textBox.absolutePosition().x + 140 + "px";
    input.style.width = textBox.width() + 20 + "px";

    document.body.appendChild(input);

    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onTextChange(e.target.value);
        setIsEditing(false);
        document.body.removeChild(input);
      }
    });
  };

  return (
    <Text
      ref={textRef} {...textProps}
      text={text}
      fontSize={20}
      draggable
      x={position.x}
      y={position.y}
      ty="Text"
      // onDragEnd={handleDragEnd}
      onDblClick={isEditing ? null : handleDblClick}
      // ref={(node) => setTextBox(node)}
    />
  );
};

export default TextComponent;
